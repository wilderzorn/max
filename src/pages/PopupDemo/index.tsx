import useAlert from '#/hooks/useAlert';
import useMessage from '#/hooks/useMessage';
import useNotice from '#/hooks/useNotice';
import usePLoading from '#/hooks/usePLoading';
import abortableDelay from '#/utils/abortableDelay';
import timeout from '#/utils/timeout';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import Business from './business';
import MotionNumer from '#/components/MotionNumer';
import IndexedDBWrapper from '#/utils/indexedDBWrapper';
import Table from './table';
import styles from './index.less';
import { s16 } from '#/utils/utils';
import { randomInt } from 'es-toolkit';

const STORE_NAME = 'users';

const AccessPage: React.FC = () => {
  const [alert, AlertContext] = useAlert();
  const [message, MessageContext] = useMessage();
  const [notice, NoticeContext] = useNotice();
  const [{ showLoading, hideLoading }, LoadingProvider] = usePLoading();

  const staticState = useStaticState({
    controller: null,
    db: new IndexedDBWrapper('myAppDB', 1, [
      {
        name: STORE_NAME,
        keyPath: 'id',
        indexes: [{ name: 'username', keyPath: 'username', unique: true }],
      },
    ]),
  });
  const [state, setState] = useTRState({
    value: 0,
    floatLength: 0,
    dataList: [],
  });

  useEffect(() => {
    const onInit = async () => {
      await staticState.db.connect();
      onFeachData();
    };
    onInit();
    return () => {
      staticState.db.close();
    };
  }, []);

  const onFeachData = async () => {
    showLoading('请求中');
    await timeout(1000);
    const res = await staticState.db.getAll(STORE_NAME);
    setState({ dataList: res ?? [] });
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
        value: randomInt(1, 10000),
        floatLength: randomInt(1, 4),
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

  const operationalData = async (
    type: 'add' | 'put' | 'delete' = 'add',
    dataSlide: { id?: IDBValidKey } = {},
  ) => {
    if (type === 'delete') {
      const index = await alert.confirm({ title: '是否确定删除' });
      if (index !== 1) return;
      staticState.db.deleteByKey(STORE_NAME, dataSlide.id as IDBValidKey);
    } else {
      const res = await notice.open(Business, { dataSlide });
      if (res.index !== 1) return;
      await staticState.db[type](STORE_NAME, {
        id: s16(),
        ...(res?.values ?? {}),
      });
    }
    onFeachData();
    message.success('操作成功');
  };

  return (
    <div className={styles.container}>
      <div>
        <MotionNumer value={state.value} floatLength={state.floatLength} />
        <Button type="primary" onClick={() => showLoading()}>
          开启全局加载
        </Button>
        <Button type="dashed" onClick={hideLoading}>
          关闭全局加载
        </Button>
        <Button onClick={onStartAsyn}>开始异步</Button>
        <Button onClick={onStopAsyn}>停止异步</Button>
      </div>
      <div>
        <Button type="dashed" onClick={() => operationalData()}>
          新增
        </Button>
      </div>
      <Table dataList={state.dataList} operationalData={operationalData} />
      {AlertContext}
      {MessageContext}
      {NoticeContext}
      {LoadingProvider}
    </div>
  );
};

export default AccessPage;
