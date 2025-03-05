import _ from 'lodash';
import { Fragment, memo, useCallback, useMemo } from 'react';
import Implementation from '../Implementation';

const FMRender = memo(
  ({ data, strategyInfoName, id, onOperatingData, columnsLayout }) => {
    const value = useMemo(() => {
      return JSON.parse(data?.value || '[]');
    }, [data]);
    const onFMChangeValue = useCallback(
      (obj, index) => {
        const daryData = [...(value ?? [])];
        daryData[index] = { ...(daryData?.[index] ?? {}), ...obj };
        onOperatingData(id, { value: JSON.stringify(daryData) });
      },
      [onOperatingData, value],
    );
    if (_.isEmpty(columnsLayout)) return null;
    const fullData = (value ?? []).reduce((pre, cur) => {
      return { ...pre, ...cur };
    }, {});
    return (
      <Fragment>
        {columnsLayout?.map((j, i) => {
          return (
            <Implementation
              key={`imp_${i}_${data.strategyDetailName}}`}
              record={value?.[i] ?? {}}
              conentIndex={i}
              strategyInfoName={strategyInfoName}
              strategyDetailName={data.strategyDetailName}
              disabled={
                data?.strategyDetailSwitch && data.strategyDetailSwitch !== '1'
              }
              onFMChangeValue={onFMChangeValue}
              layoutItem={j}
              fullData={{ ...fullData, ...(value?.[i] ?? {}) }}
            />
          );
        })}
      </Fragment>
    );
  },
);
export default FMRender;
