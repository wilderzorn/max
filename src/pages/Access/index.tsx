import TREmpty from '#/components/TREmpty';
import useAlert from '#/hooks/useAlert';
import useMessage from '#/hooks/useMessage';
import useNotice from '#/hooks/useNotice';
import usePLoading from '#/hooks/usePLoading';
import abortableDelay from '#/utils/abortableDelay';
import timeout from '#/utils/timeout';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import Business from './business';
import MotionNumer from '#/components/MotionNumer';

const AccessPage: React.FC = () => {
  const [alert, AlertContext] = useAlert();
  const [message, MessageContext] = useMessage();
  const [notice, NoticeContext] = useNotice();
  const [{ showLoading, hideLoading }, LoadingProvider] = usePLoading();

  const staticState = useStaticState({
    controller: null,
  });
  const [state, setState] = useTRState({
    value: 0,
    floatLength: 0,
  });

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    showLoading('123123');
    await timeout(1000);
    hideLoading();
  };

  const onStartAsyn = async () => {
    if (staticState.controller) {
      staticState.controller?.abort();
    }
    // eslint-disable-next-line no-console
    console.log('开始请求');
    staticState.controller = new AbortController();
    try {
      await abortableDelay(2000, { signal: staticState.controller.signal });
      staticState.controller = null;
      setState(() => ({
        value: getRandomNumber(1, 10000),
        floatLength: getRandomNumber(1, 4),
      }));
      // eslint-disable-next-line no-console
      console.log('请求结束');
    } catch (error) {
      staticState.controller = null;
      // eslint-disable-next-line no-console
      console.log(error, 'onStartAsyn error');
    }
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

  return (
    <PageContainer ghost header={{ title: '权限示例' }}>
      <MotionNumer value={state.value} floatLength={state.floatLength} />
      <Button type="dashed" onClick={onInit}>
        全局加载
      </Button>
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
      {LoadingProvider}
    </PageContainer>
  );
};

export default AccessPage;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
