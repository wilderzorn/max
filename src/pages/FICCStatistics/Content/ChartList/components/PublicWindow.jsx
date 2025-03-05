import { Modal } from 'antd';
import { useStaticState, useTRState } from '#/hooks/trHooks';

const PublicWindow = ({ onPress, Component, ...props }) => {
  const [state, setState] = useTRState({
    open: true,
  });
  const onClose = (obj) => {
    setState({ open: false });
    onPress({ ...obj });
  };

  return (
    <Modal
      title={props?.title ?? '公告'}
      width={'100%'}
      onCancel={onClose}
      centered={true}
      destroyOnClose={true}
      open={state.open}
      footer={false}
    >
      <div style={{ height: '600px' }}>
        <Component {...props} />
      </div>
    </Modal>
  );
};
export default PublicWindow;
