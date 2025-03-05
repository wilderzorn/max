import styles from './index.less';
import Tabs from './Tabs';
import ChartList from './ChartList';

const Content = ({ state, setState }) => {
  return (
    <div className={styles.content}>
      <Tabs state={state} setState={setState} />
      <ChartList state={state} setState={setState} />
    </div>
  );
};
export default Content;
