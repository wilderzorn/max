import styles from './index.less';
import { ChartMerge, Table } from './components';
import { useMemo } from 'react';

const RenderTemplate = ({ type, extraProps = {} }) => {
  if (!type) return null;
  const componentMap = useMemo(
    () => ({
      dashboard: ChartMerge,
      default: Table,
    }),
    [type],
  );

  const Component = componentMap[type] || componentMap.default;
  return <Component type={type} {...extraProps} />;
};

const ChartList = ({ state, setState }) => {
  return (
    <div className={styles.chartList}>
      <RenderTemplate type={state.strategy} />
    </div>
  );
};

export default ChartList;
