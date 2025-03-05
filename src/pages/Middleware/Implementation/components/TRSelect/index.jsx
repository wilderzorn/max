import empty from '#/assets/empty.svg';
import PageEmpty from '#/components/PageEmpty';
import { useTRState } from '#/hooks/trHooks';
import auxiliary from '@/pages/Middleware/auxiliary';
import { configLabelList, getYCPointList } from '@/services/centerAlert';
import { Select } from 'antd';
import _ from 'lodash';
import { memo, useEffect, useMemo } from 'react';
import {
  AREA_TYPE,
  checkFieldsEquality,
  hasValue,
  onSlideDisabled,
} from '../helper';
import styles from './index.less';

const TRSelect = memo(
  ({
    onChangeValue,
    item,
    disabled,
    conentIndex,
    isTable,
    record,
    tableData,
  }) => {
    const {
      val,
      desc,
      key,
      options,
      style,
      dynamicKey,
      dicStaticKey,
      dicLabel = { label: 'label', value: 'value' },
      disabledObj,
      disabledUniteObj,
      disableOtherOptions = false,
      allowClearKeys = [],
      otherFields = {},
      ...args
    } = item;
    const [state, setState] = useTRState({
      options: [...(options ?? [])],
      open: false,
      loading: false,
    });

    useEffect(() => {
      onFeatch().then();
    }, []);

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, record),
      [disabled, disabledObj, record, disabledUniteObj],
    );

    const onFeatch = async () => {
      if (!dicStaticKey) return;
      let options =
        auxiliary.staticResources?.[dicStaticKey] ?? item?.options ?? [];
      setState({ loading: true });
      switch (dynamicKey) {
        case 'strategy':
          options = handleStrategy(record, dicStaticKey, dynamicKey);
          break;
        case 'yclPoint':
          options = await handleYclPoint(record, dynamicKey);
          break;
        case 'fanModel':
          options = handleFanModel(dicStaticKey);
          break;
        case 'temperatureCalc':
          options = handleTemperatureCalc(
            record,
            key,
            tableData,
            conentIndex,
            options,
          );
          break;
        case 'AVCAGCPoint':
          options = await handleAVCAGCPoint(record, dicStaticKey, dynamicKey);
          break;
        default:
          break;
      }
      setState({
        options,
        loading: false,
      });
    };

    const handleChange = (value, option) => {
      const clearKeys = {};
      allowClearKeys?.forEach((k) => {
        clearKeys[k] = null;
      });

      let obj = {};
      Object.keys(otherFields ?? {}).forEach((k) => {
        obj[k] = Object.keys(otherFields[k] ?? {}).reduce((pre, cur) => {
          pre[cur] = option[otherFields[k][cur]];
          return pre;
        }, {});
      });
      onChangeValue(
        { [key]: value ?? null, ...clearKeys, ...obj },
        conentIndex,
      );
    };

    const onDropdownVisibleChange = (open) => {
      (dynamicKey || disableOtherOptions) && open && onFeatch();
      setState({ open });
    };

    return (
      <section
        className={styles.trSelect}
        style={{ marginTop: isTable ? 0 : '15px' }}
      >
        {isTable ? null : <span className={styles.title}>{desc}</span>}
        <Select
          showSearch
          disabled={slideDisabled}
          style={{ ...(style ?? {}) }}
          placeholder={`请选择`}
          onChange={handleChange}
          options={state.options}
          value={val}
          filterOption={(input, option) =>
            option?.[dicLabel.label]
              ?.toLowerCase()
              ?.indexOf?.(input?.toLowerCase() ?? '') >= 0
          }
          notFoundContent={
            <PageEmpty
              image={empty}
              style={{ margin: 0 }}
              imageStyle={{
                height: 'auto',
                margin: 0,
                width: '100%',
              }}
              description={'暂无数据'}
              className={styles.customEmpty}
            />
          }
          getPopupContainer={(triggerNode) =>
            isTable ? document.body : triggerNode.parentNode
          }
          open={state.open}
          onDropdownVisibleChange={onDropdownVisibleChange}
          loading={state.loading}
          optionLabelProp="label"
          optionFilterProp="label"
          {...args}
        >
          {state.options?.map((j) => {
            return (
              <Select.Option
                key={j?.[dicLabel.value]}
                {...j}
                value={j?.[dicLabel.value]}
                label={j?.[dicLabel.label]}
              >
                {j?.[dicLabel.label]}
              </Select.Option>
            );
          })}
        </Select>
      </section>
    );
  },
);
export default TRSelect;

const handleStrategy = (record, dicStaticKey, dynamicKey) => {
  return _.compact(
    record[dynamicKey]?.map((k) =>
      (auxiliary.staticResources?.[dicStaticKey] ?? [])?.find?.(
        (j) => j.value === k,
      ),
    ) ?? [],
  );
};

const handleYclPoint = async (record, dynamicKey) => {
  const model = record?.assetObj?.model;
  if (!model) return [];

  const paramModel = `${auxiliary.staticDeptNum}${model}${dynamicKey}`;
  if (auxiliary.temporaryData?.[paramModel]) {
    return [...auxiliary.temporaryData[paramModel]];
  }

  const data = await auxiliary.fetchDataWithCache(paramModel, async () => {
    if (auxiliary?.staticDeptInfo?.hn) {
      const res = await configLabelList({
        deptNums: [auxiliary.staticDeptNum],
        size: 9999999,
        currentPage: 1,
        area:
          AREA_TYPE?.[auxiliary?.staticDeptInfo?.centralControlDesc] ??
          AREA_TYPE['云集控'],
        hn: true,
      });
      return _.uniqBy(
        (res?.data ?? [])
          .filter((j) => j.labelType === 'YC' && j.model === model)
          .map((j) => ({ ...j, label: j.labelName, value: j.label })),
        'value',
      );
    } else {
      const res = await getYCPointList({
        assetNum: [record.asset],
        deptNum: auxiliary.staticDeptNum,
        type: 'YC',
      });
      return (res?.data?.points ?? []).map((j) => ({
        ...j,
        label: j.labelName,
        value: j.labelValue,
      }));
    }
  });

  auxiliary.temporaryData[paramModel] = [...data];
  return [...data];
};

const handleFanModel = (dicStaticKey) => {
  return _.uniqBy(
    (auxiliary.staticResources?.[dicStaticKey] ?? []).map((j) => ({
      label: j.model,
      value: j.model,
    })),
    'value',
  );
};

const handleTemperatureCalc = (
  record,
  key,
  tableData,
  conentIndex,
  _options,
) => {
  let tableKeys = ['asset', 'temperatureCalc'];
  const filterArr = _.compact(
    _.difference(tableKeys, [key]).map((k) => record?.[k]),
  );
  let options = _options.filter((j) => !filterArr.includes(j.value));
  const tableFilterArr = [];
  for (let i = 0; i < (tableData || []).length; i++) {
    if (i === conentIndex) continue;
    const item = tableData[i];
    const isHasValue = hasValue(item, ...tableKeys);
    if (isHasValue) {
      const result = checkFieldsEquality(record, item, tableKeys);
      if (result && item[key] !== record[key]) {
        tableFilterArr.push(item[key]);
      }
    }
  }
  return options.filter((j) => !tableFilterArr.includes(j.value));
};

const handleAVCAGCPoint = async (record, dicStaticKey, dynamicKey) => {
  let model = null,
    asset = null;
  if (dicStaticKey === 'AVCAGC') {
    model = record?.assetObj?.model;
    asset = record?.asset;
  } else if (dicStaticKey === 'AVCAGC1') {
    asset = record?.asset1;
    model = record?.asset1Obj?.model;
  } else if (dicStaticKey === 'AVCAGC2') {
    asset = record.asset2;
    model = record?.asset2Obj?.model;
  }

  if (!model) return [];

  const dynamicModel = `${auxiliary.staticDeptNum}${model}${dynamicKey}`;
  if (auxiliary.temporaryData?.[dynamicModel]) {
    return [...auxiliary.temporaryData[dynamicModel]];
  }

  const data = await auxiliary.fetchDataWithCache(dynamicModel, async () => {
    if (auxiliary?.staticDeptInfo?.hn) {
      const res = await configLabelList({
        deptNums: [auxiliary.staticDeptNum],
        size: 9999999,
        currentPage: 1,
        area:
          AREA_TYPE?.[auxiliary?.staticDeptInfo?.centralControlDesc] ??
          AREA_TYPE['云集控'],
        hn: true,
      });
      return _.uniqBy(
        (res?.data ?? [])
          .filter((j) => j.labelType === 'YC' && j.model === model)
          .map((j) => ({ ...j, label: j.labelName, value: j.label })),
        'value',
      );
    } else {
      const res = await getYCPointList({
        assetNum: [asset],
        deptNum: auxiliary.staticDeptNum,
        type: 'YC',
      });
      return (res?.data?.points ?? []).map((j) => ({
        ...j,
        label: j.labelName,
        value: j.labelValue,
      }));
    }
  });

  auxiliary.temporaryData[dynamicModel] = [...data];
  return [...data];
};
