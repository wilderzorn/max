import empty from '#/assets/empty.svg';
import PageEmpty from '#/components/PageEmpty';
import PageLoading from '#/components/PageLoading';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import auxiliary from '@/pages/Middleware/auxiliary';
import {
  centerAlertAssetAlert,
  configLabelList,
  fanExceptionConfiFaultgAsset,
  fanExceptionConfigAssetDesc,
  getYCPointList,
} from '@/services/centerAlert';
import { useDebounceFn } from 'ahooks';
import { Checkbox, Input, Select } from 'antd';
import cls from 'classnames';
import _ from 'lodash';
import { Fragment, memo, useCallback, useEffect, useMemo } from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/es/List';
import {
  AREA_TYPE,
  checkFieldsAsset,
  hasValue,
  onSlideDisabled,
} from '../helper';
import { FAN_SHUTDOWN_STATUS } from './heplper';
import styles from './index.less';

const SELECT_PROPS = {
  showSearch: false,
  mode: 'multiple',
  optionLabelProp: 'label',
};

const TRMulSelect = memo(
  ({
    onChangeValue,
    item,
    disabled,
    conentIndex,
    isTable,
    record,
    tableData = [],
    fullData,
  }) => {
    const {
      val = [],
      desc,
      key,
      options = [],
      style,
      allowClearKeys = [],
      dicStaticKey,
      dicLabel = { label: 'label', value: 'value' },
      disabledObj,
      disabledUniteObj,
      otherFields,
      dynamicKey,
      disableOtherOptions = false,
      styleKey,
      containerStyles = {},
    } = item;
    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, fullData),
      [disabled, disabledObj, fullData, disabledUniteObj],
    );

    const [state, setState] = useTRState({
      options: [...(options ?? [])],
      search: null,
      open: false,
      selectValue: [],
      allData: [...(options ?? [])],
      loading: false,
    });
    const staticState = useStaticState({
      step: 0,
    });
    const inputRun = useDebounceFn(
      (value) => {
        setState({ options: filterOptions(value) });
      },
      {
        wait: 500,
      },
    );
    useEffect(() => {
      onFetch().then();
    }, []);

    const onFetch = async () => {
      if (!dicStaticKey) return;
      const options = auxiliary.staticResources?.[dicStaticKey] ?? [];

      let result = { options };

      setState({ loading: true });
      switch (dynamicKey) {
        case 'fanAbnormalDesc':
          result = await handleFanAbnormalDesc(record, dynamicKey);
          break;
        case 'message':
          result = await handleMessage(record, dynamicKey);
          break;
        case 'fanAsset':
          result = handleFanAsset(record, key, tableData, conentIndex, options);
          break;
        case 'yclPoint':
          result = await handleYclPoint(record, dynamicKey);
          break;
        case 'fanMessage':
          result = await handleFanMessage(record, dynamicKey);
          break;
        case 'filterDeviceFan':
          result = { options: handleFilterDevice(options, ['G0001']) };
          break;
        case 'filterDeviceNBQ':
          result = { options: handleFilterDevice(options, ['E02I2', 'E02I1']) };
          break;
        case 'filterDeviceSYZ':
          result = { options: handleFilterDevice(options, ['SYZ01']) };
          break;
        case 'dingdingTalk':
          result = await handleDingdingTalk();
          break;
        default:
          break;
      }

      if (disableOtherOptions) {
        let disableValues = [];
        (tableData ?? []).forEach((j, i) => {
          if (i !== conentIndex) {
            disableValues = [...disableValues, ...(j?.[key] ?? [])];
          }
        });
        result.options = result.options.filter(
          (j) => !disableValues.includes(j.value),
        );
      }

      setState({
        options: result.options,
        allData: result.options,
        loading: false,
      });
    };

    useEffect(() => {
      if (dynamicKey === 'fanAbnormalDesc') {
        if (staticState.step !== 0) return;
        if (_.isEmpty(state.allData)) return;
        if (_.isEmpty(val) && !_.isEmpty(record?.asset)) {
          onSelectChange(FAN_SHUTDOWN_STATUS, 'label');
          staticState.step += 1;
        }
      }
    }, [state]);

    const onChange = (checkedList) => {
      const clearKeys = {};
      allowClearKeys?.forEach((k) => {
        clearKeys[k] = null;
      });
      const obj = {};
      if (_.isEmpty(checkedList)) {
        Object.keys(otherFields ?? {}).forEach((k) => {
          obj[k] = [];
        });
      } else {
        checkedList.forEach((j) => {
          Object.keys(otherFields ?? {}).forEach((k) => {
            obj[k] = [
              ...(obj?.[k] ?? []),
              {
                ...Object.keys(otherFields[k] ?? {}).reduce((pre, cur) => {
                  pre[cur] = j[otherFields[k][cur]];
                  return pre;
                }, {}),
              },
            ];
          });
        });
      }
      if (dynamicKey === 'fanAbnormalDesc') {
        obj.label = _.head(checkedList ?? [])?._label;
      }
      onChangeValue(
        {
          [key]: (checkedList ?? []).map((j) => j?.[dicLabel.value]),
          ...clearKeys,
          ...obj,
        },
        conentIndex,
      );
    };

    const onSelectChange = useCallback(
      (value, itemKey = 'value') => {
        const selectedOptions = state.allData.filter((item) =>
          value.includes(item[dicLabel[itemKey]]),
        );
        onChange(selectedOptions);
      },
      [dicLabel, onChange, state.allData],
    );

    const onCheckAllChange = useCallback(
      (e) => {
        const checked = e.target.checked;
        const allValues = state.options.map((item) => item[dicLabel.value]);
        const checkedValues = checked ? allValues : [];
        onSelectChange(checkedValues, 'value');
      },
      [dicLabel, onSelectChange, state.options],
    );

    const checkOnChange = useCallback(
      (e, value) => {
        const checked = e.target.checked;
        const newValue = checked
          ? [...(val ?? []), value]
          : val.filter((v) => v !== value);
        onSelectChange(newValue, 'value');
      },
      [onSelectChange, val],
    );

    const filterOptions = (inputValue) => {
      return state.allData.filter((option) =>
        option[dicLabel.label].toLowerCase().includes(inputValue.toLowerCase()),
      );
    };

    const onDropdownVisibleChange = (open) => {
      (dynamicKey || disableOtherOptions) && open && onFetch();
      setState({ open });
      if (!open && state?.search) {
        setState({ search: null });
        inputRun.run('');
      }
    };

    const rowRenderer = ({ index, style, key }) => {
      const item = state.options?.[index] || {};
      return (
        <div
          style={style}
          key={key}
          className={styles.checkItem}
          title={item?.[dicLabel.label] ?? ''}
        >
          <Checkbox
            onChange={(e) => checkOnChange(e, item[dicLabel.value])}
            checked={(val ?? [])?.includes(item[dicLabel.value]) ?? false}
            value={item[dicLabel.value] ?? ''}
          >
            {item?.[dicLabel.label] ?? ''}
          </Checkbox>
        </div>
      );
    };

    const renderDropdownRender = () => {
      if (state.loading) {
        return (
          <PageLoading
            style={{ height: '100px', alignItems: 'center', paddingTop: 0 }}
          />
        );
      }
      return (
        <div className={styles.dropdown}>
          {state.allData?.length ? (
            <Fragment>
              <div className={styles.multipleInput}>
                <Input
                  placeholder="请输入"
                  allowClear
                  value={state.search}
                  onKeyDown={(e) => {
                    //  阻止多选的冒泡
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setState({
                      search: e?.target?.value ?? '',
                    });
                    inputRun.run(e?.target?.value ?? '');
                  }}
                />
              </div>
              {state?.options?.length ? (
                <Fragment>
                  <div className={styles.checkItem}>
                    <Checkbox
                      indeterminate={
                        !_.isEmpty(val) &&
                        val?.length !== 0 &&
                        val?.length !== state.options.length
                      }
                      onChange={onCheckAllChange}
                      checked={
                        val?.length !== 0 &&
                        val?.length === state.options.length
                      }
                    >
                      全选
                    </Checkbox>
                  </div>
                  <div className={styles.check_content}>
                    <AutoSizer>
                      {({ width, height }) => (
                        <List
                          width={width}
                          height={height}
                          overscanRowCount={5}
                          rowCount={state.options.length}
                          rowHeight={30}
                          rowRenderer={rowRenderer}
                          scrollToAlignment={'start'}
                        />
                      )}
                    </AutoSizer>
                  </div>
                </Fragment>
              ) : (
                <PageEmpty
                  image={empty}
                  style={{ marginTop: 10 }}
                  imageStyle={{ height: 50 }}
                  description={'暂无数据'}
                />
              )}
            </Fragment>
          ) : (
            <PageEmpty
              image={empty}
              style={{ marginTop: 25 }}
              imageStyle={{ height: 80 }}
              description={'暂无数据'}
            />
          )}
        </div>
      );
    };

    return (
      <section
        className={styles.trMultiple}
        style={{ marginTop: isTable ? 0 : '15px', ...containerStyles }}
      >
        {isTable ? null : <span className={styles.title}>{desc}</span>}
        <Select
          {...SELECT_PROPS}
          disabled={slideDisabled}
          value={val ?? []}
          style={{ ...(style ?? {}) }}
          placeholder={`请选择`}
          onChange={(value) => onSelectChange(value)}
          // className={styles.generally_multiple}
          className={cls({
            [styles.multiple]: !styleKey && isTable,
            [styles.generally_multiple]: !styleKey && !isTable,
            [styles[styleKey]]: !!styleKey,
          })}
          open={state.open}
          onDropdownVisibleChange={onDropdownVisibleChange}
          getPopupContainer={(triggerNode) =>
            isTable ? document.body : triggerNode.parentNode
          }
          loading={state.loading}
          options={state.allData}
          dropdownRender={renderDropdownRender}
        />
      </section>
    );
  },
);
export default TRMulSelect;

const handleFanAbnormalDesc = async (record, dynamicKey) => {
  if (_.isEmpty(record?.model) || _.isEmpty(record?.asset)) {
    return { allData: [], options: [] };
  }
  const paramModel = `${auxiliary.staticDeptNum}${record.model}${dynamicKey}`;
  if (auxiliary.temporaryData?.[paramModel]) {
    return { options: [...auxiliary.temporaryData[paramModel]] };
  }

  const data = await auxiliary.fetchDataWithCache(paramModel, async () => {
    const res = await fanExceptionConfigAssetDesc({
      deptNum: auxiliary.staticDeptNum,
      model: record.model,
    });
    return res?.data ?? [];
  });

  auxiliary.temporaryData[paramModel] = [...data];
  return { options: [...data] };
};

const handleMessage = async (record, dynamicKey) => {
  if (_.isEmpty(record?.model) || _.isEmpty(record?.asset)) {
    return { allData: [], options: [] };
  }
  const paramModel = `${auxiliary.staticDeptNum}${record.model}${dynamicKey}`;
  if (auxiliary.temporaryData?.[paramModel]) {
    return { options: [...auxiliary.temporaryData[paramModel]] };
  }

  const data = await auxiliary.fetchDataWithCache(paramModel, async () => {
    const res = await fanExceptionConfiFaultgAsset({
      deptNum: auxiliary.staticDeptNum,
      model: record.model,
    });
    return (res?.data ?? []).map((j) => ({
      label: j,
      value: j,
    }));
  });

  auxiliary.temporaryData[paramModel] = [...data];
  return { options: [...data] };
};

const handleFanAsset = (record, key, tableData, conentIndex, _options) => {
  if (!record?.model) return { allData: [], options: [] };
  let options = _options.filter((j) => j.model === record.model);
  let tableKeys = ['asset', 'temperatureCalc'];
  const filterArr = _.compact(
    _.difference(tableKeys, [key]).map((k) => record?.[k]),
  );
  options = options.filter((j) => !filterArr.includes(j.value));
  let tableFilterArr = [];
  for (let i = 0; i < (tableData || []).length; i++) {
    if (i === conentIndex) {
      continue;
    }
    const item = tableData[i];
    const isHasValue = hasValue(item, ...tableKeys);
    if (isHasValue) {
      const result = checkFieldsAsset(record, item, tableKeys);
      if (result) {
        tableFilterArr = (item?.[key] ?? []).filter(
          (j) => !(record?.[key] ?? []).includes(j),
        );
      }
    }
  }
  return { options: options.filter((j) => !tableFilterArr.includes(j.value)) };
};

const handleYclPoint = async (record, dynamicKey) => {
  const model = record?.assetObj?.model;
  if (!model) return { allData: [], options: [] };
  const paramModel = `${auxiliary.staticDeptNum}${model}${dynamicKey}`;
  if (auxiliary.temporaryData?.[paramModel]) {
    return { options: [...auxiliary.temporaryData[paramModel]] };
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
  return { options: [...data] };
};

const handleFanMessage = async (record, dynamicKey) => {
  const asset = (record?.asset ?? []).join();
  if (_.isEmpty(asset)) return { allData: [], options: [] };
  const paramAsset = `${auxiliary.staticDeptNum}${asset}${dynamicKey}`;
  if (auxiliary.temporaryData?.[paramAsset]) {
    return { options: [...auxiliary.temporaryData[paramAsset]] };
  }

  const data = await auxiliary.fetchDataWithCache(paramAsset, async () => {
    const res = await centerAlertAssetAlert({
      deptNum: auxiliary.staticDeptNum,
      assetNums: record.asset,
    });
    return (res?.data?.assetAlertList ?? []).map((j) => ({
      ...j,
      label: j.description,
      value: j.eventName,
    }));
  });

  auxiliary.temporaryData[paramAsset] = [...data];
  return { options: [...data] };
};

const handleFilterDevice = (options, filterClasses) => {
  return options
    .filter((j) => filterClasses.includes(j.thirdClass))
    .map((j) => ({ ...j, label: j.assetname, value: j.assetnum }));
};

const handleDingdingTalk = async () => {
  const paramAsset = `__dingdingTalk__`;
  if (auxiliary.temporaryData?.[paramAsset]) {
    return { options: [...auxiliary.temporaryData[paramAsset]] };
  }

  const data = await auxiliary.fetchDataWithCache(paramAsset, async () => {
    const res = await groupConfigList({ currentPage: 1, size: 999999 });
    return (res?.data?.groupStrategyList ?? []).map((j) => ({
      ...j,
      label: j.groupName,
      value: j.id,
    }));
  });

  auxiliary.temporaryData[paramAsset] = [...data];
  return { options: [...data] };
};
