import { useTRState } from '#/hooks/trHooks';
import { Drawer } from 'antd';

const Config = ({ onPress }) => {
  const [state, setState] = useTRState({
    open: true,
  });
  const onClose = () => {
    setState({ open: false });
    onPress();
  };
  return (
    <Drawer title="Basic Drawer" onClose={onClose} open={state.open}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default Config;
