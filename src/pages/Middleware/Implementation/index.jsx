import empty from '#/assets/empty.svg';
import PageEmpty from '#/components/PageEmpty';
import { Button } from 'antd';
import { memo, useMemo } from 'react';
import styles from './index.less';
import RenderTemplate from './renderTemplate';

const Implementation = memo(
  ({
    onFMChangeValue,
    disabled = false,
    deptNum,
    strategyInfoName,
    strategyDetailName,
    conentIndex,
    record,
    layoutItem,
    fullData,
  }) => {
    const impData = useMemo(() => {
      return (layoutItem ?? []).map((item) => {
        return {
          ...item,
          val: record?.[item.key] ?? null,
        };
      });
    }, [record, strategyInfoName, strategyDetailName, layoutItem]);
    return (
      <div className={styles.implementation}>
        {impData?.map((v, vi) => (
          <RenderTemplate
            key={`${v.key}-${vi}-imp`}
            item={v}
            disabled={disabled}
            deptNum={deptNum}
            onChangeValue={onFMChangeValue}
            conentIndex={conentIndex}
            record={record}
            fullData={fullData}
          />
        ))}
      </div>
    );
  },
);
export default Implementation;

export const EmptyContent = ({ style, imageStyle }) => (
  <PageEmpty
    image={empty}
    style={{ marginTop: 30, marginBottom: 10, ...(style ?? {}) }}
    imageStyle={{ height: 90, ...(imageStyle ?? {}) }}
    description={'暂无数据'}
  />
);

export const OperationButton = ({ icon, name, callback, disabled }) => (
  <Button disabled={disabled} onClick={callback} type="link" icon={icon}>
    {name}
  </Button>
);
