import TREmpty from '#/components/TREmpty';
import useAlert from '#/hooks/useAlert';
import useMessage from '#/hooks/useMessage';
import useNotice from '#/hooks/useNotice';
import abortableDelay from '#/utils/abortableDelay';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import Business from './business';
import utils from '#/utils/utils';
import runIdleTask from '#/utils/runIdleTask';
import MotionNumer from './motionNumer';
import { useMap } from 'ahooks';
import Ce from './ce';
import { centerBodyList } from './helper';
import { omit } from 'es-toolkit';

const AccessPage: React.FC = () => {
  const [alert, AlertContext] = useAlert();
  const [message, MessageContext] = useMessage();
  const [notice, NoticeContext] = useNotice();
  const [deptMap] = useMap();

  const staticState = useStaticState({
    controller: null,
    dataObj: new Map(),
  });
  const [state, setState] = useTRState({
    update: 0,
  });

  const onUpdate = () => {
    setState({ update: state.update > 100 ? 0 : state.update + 1 });
  };
  useEffect(() => {
    // [null, undefined, 0, '', [], {}, () => {}, NaN, false, true, 1].forEach(
    //   (k) => {
    //     // console.log(utils.isEmpty(k), k);
    //   },
    // );
    // let obj = { 1: { 1: 1 }, 2: { 2: 2 } };
    // staticState.dataObj = new Map(Object.entries(obj));
    // setInterval(() => {
    //   setState({
    //     value: getRandomNumber(1, 10000),
    //   });
    // }, 3000);
    const tree = onTreeData(centerBodyList);
  }, []);

  const onTreeData = (arr, parent = {}, isDept = false) => {
    const tree: any = [];
    arr.forEach((j) => {
      tree.push({
        ...omit(j, ['areaBodyList', 'deptBodyList']),
        isDept,
        title: j.name,
        key: j.deptNum,
        parent,
        children: onTreeData(
          j?.areaBodyList ?? j?.deptBodyList ?? [],
          omit(j, ['areaBodyList', 'deptBodyList']),
          j?.deptBodyList?.length > 0,
        ),
      });
    });
    return tree;
  };

  const onStartAsyn = async () => {
    // console.log(Array.from(deptMap.values()));
    // if (staticState.controller) {
    //   staticState.controller?.abort();
    // }
    // staticState.controller = new AbortController();
    // try {
    //   await abortableDelay(2000, { signal: staticState.controller.signal });
    //   staticState.controller = null;
    // } catch (error) {
    //   staticState.controller = null;
    //   // console.log(error, 'onStartAsyn error');
    // }
  };

  const onStopAsyn = () => {
    staticState.controller?.abort();
  };

  const onIsStart = async () => {
    const index = await alert.confirm({ title: '这个是阿萨发给的方法' });
    if (index !== 1) return;
  };

  const onShowModal = async () => {
    const res = await notice.open(Business);
    if (res.index !== 1) return;
  };
  const onCheck = (j) => {
    // console.log(j);
    // console.log(deptMap);
  };

  return (
    <PageContainer ghost header={{ title: '权限示例' }}>
      <Ce deptMap={deptMap} onCheck={onCheck} onUpdate={onUpdate} />
      {[1, 2, 3, 4, 5, 6].map((k) => {
        return (
          <span
            key={k}
            style={{ display: 'inline-block', width: 100 }}
            onClick={() => {
              if (staticState.dataObj.has(k)) {
                staticState.dataObj = staticState.dataObj.delete(k);
              } else {
                staticState.dataObj = staticState.dataObj.set(k, {});
              }
            }}
          >
            {k}
          </span>
        );
      })}
      {/* <MotionNumer value={state.value} /> */}
      <Button onClick={onStartAsyn}>开始异步</Button>
      <Button onClick={onStopAsyn}>停止异步</Button>
      <Button onClick={onIsStart}>alert</Button>
      <Button
        onClick={() => {
          message.info('messsage');
        }}
      >
        messsage
      </Button>
      <Button onClick={onShowModal} type="primary">
        弹窗
      </Button>
      <TREmpty />
      {AlertContext}
      {MessageContext}
      {NoticeContext}
    </PageContainer>
  );
};

export default AccessPage;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
