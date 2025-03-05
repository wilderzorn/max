import orderMap from '@/pages/Middleware/Implementation/layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import { memo, useMemo } from 'react';
import FMRender from '../FMRender';
import styles from './index.less';

const REMARK_MAP = {
  add: '新增',
};

const StrategyDetails = memo(
  ({ id, onOperatingData, dataObj, deptNum, strategyInfoName }) => {
    const data = useMemo(() => {
      return dataObj?.[id] ?? {};
    }, [dataObj]);
    const orderLayout = useMemo(
      () => orderMap.get(strategyInfoName)?.[data.strategyDetailName] ?? {},
      [strategyInfoName, data.strategyDetailName],
    );
    return (
      <div className={styles.item}>
        <div className={styles.item_switch}>
          {data.strategyDetailSwitch ? (
            <Switch
              size="small"
              checked={data.strategyDetailSwitch === '1'}
              onChange={(checked) => {
                onOperatingData(id, {
                  strategyDetailSwitch: checked ? '1' : '0',
                  status: checked ? 'ON' : 'OFF',
                });
              }}
            />
          ) : null}
          <span>{data.strategyDetailName}</span>
          {orderLayout?.config?.suffix && (
            <Tooltip title={orderLayout.config.suffix}>
              <QuestionCircleOutlined
                style={{ color: '#FF5959', cursor: 'help' }}
              />
            </Tooltip>
          )}
          <span style={{ color: 'red' }}>{REMARK_MAP?.[data.remark]}</span>
        </div>
        <FMRender
          id={id}
          data={data}
          onOperatingData={onOperatingData}
          disabled={data.strategyDetailSwitch !== '1'}
          deptNum={deptNum}
          strategyInfoName={strategyInfoName}
          columnsLayout={orderLayout?.columns ?? []}
        />
      </div>
    );
  },
);
export default StrategyDetails;
