import TREmpty from '#/components/TREmpty';
import useAlert from '#/hooks/useAlert';
import useMessage from '#/hooks/useMessage';
import useNotice from '#/hooks/useNotice';
import abortableDelay from '#/utils/abortableDelay';
import { useStaticState } from '#/utils/trHooks';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react';
import Business from './business';

const AccessPage: React.FC = () => {
  const [alert, AlertContext] = useAlert();
  const [message, MessageContext] = useMessage();
  const [notice, NoticeContext] = useNotice();

  const staticState = useStaticState({
    controller: null,
  });

  const onStartAsyn = async () => {
    if (staticState.controller) {
      staticState.controller?.abort();
    }
    staticState.controller = new AbortController();
    try {
      await abortableDelay(2000, { signal: staticState.controller.signal });
      staticState.controller = null;
    } catch {
      staticState.controller = null;
    }
  };

  const onStopAsyn = () => {
    staticState.controller.abort();
  };

  const onIsStart = async () => {
    const res = await alert.confirm({ title: '这个是阿萨发给的方法' });
    if (res !== 1) return;
    // console.log(res, 'res');
  };

  const onShowModal = async () => {
    const res = await notice.open(Business);
    if (res.index !== 1) return;
    // console.log(res, 'res');
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Button onClick={onStartAsyn}>开始异步</Button>
      <Button onClick={onStopAsyn}>停止异步</Button>
      <Button onClick={onIsStart}>alert</Button>
      <Button
        onClick={() => {
          message.info('这个是阿萨发给的方法');
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
