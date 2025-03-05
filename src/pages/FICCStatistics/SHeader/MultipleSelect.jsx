import styles from './index.less';
import { useTRState } from '#/hooks/trHooks';
import cls from 'classnames';
import { useUpdateEffect, useDebounceFn } from 'ahooks';
import PageEmpty from '#/components/PageEmpty';
import empty from '#/assets/empty.svg';
import _ from 'lodash';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import VList from 'react-virtualized/dist/commonjs/List';
import { Checkbox, Select, Input, message } from 'antd';
import { Fragment, useMemo, useEffect } from 'react';

const MultipleSelect = ({
  allData,
  value,
  callback,
  placeholder,
  style,
  isEmpty = false,
  loading = false,
  ...args
}) => {
  const [state, setState] = useTRState({
    searchStr: null,
    checkList: value ?? [],
    readyCheckList: value ?? [],
    open: false,
    allData: [],
  });

  useEffect(() => setState({ allData }), [allData]);

  useUpdateEffect(() => {
    setState({
      checkList: [...(value ?? [])],
      readyCheckList: [...(value ?? [])],
    });
  }, [value]);

  const selectOnChange = (value = [], option, other) => {
    if (state.open) return;
    if (_.isEmpty(value) && isEmpty) return message.info('场站不能为空！');
    const checkList =
      value
        ?.map((code) => {
          return (options ?? []).find((v) => v?.label === code)?.value;
        })
        .filter((j) => j) ?? [];
    setState({
      readyCheckList: [...(checkList ?? [])],
      checkList: [...(checkList ?? [])],
    });
    callback?.(checkList);
  };
  const checkOnChange = (checked, code) => {
    let readyCheckList = [...state.readyCheckList];
    if (checked) {
      readyCheckList = [...readyCheckList, code];
      setState({
        readyCheckList,
      });
    } else {
      readyCheckList = readyCheckList.filter((v) => v !== code);
      setState({
        readyCheckList,
      });
    }
  };

  // select回显示操作
  const onSelectValue = () => {
    return state.checkList?.map((code) => {
      return state.allData.find((v) => v.value === code)?.label ?? '';
    });
  };
  const onDropdownVisibleChange = (open) => {
    setState({
      searchStr: null,
      open,
      readyCheckList: open ? [...state.checkList] : [...state.readyCheckList],
    });
  };
  // 重置
  const resetAsset = () => {
    setState({
      readyCheckList: [],
    });
  };
  // 确定
  const handleAssetSelect = () => {
    setState({
      checkList: [...(state.readyCheckList ?? [])],
      open: false,
    });
    callback?.(state.readyCheckList);
  };

  const options = useMemo(() => {
    return state.allData.filter((j) => {
      return j.label
        .toLowerCase()
        .includes((state.searchStr ?? '').toLowerCase());
    });
  }, [state.searchStr, state.allData]);

  const indeterminate = useMemo(() => {
    return (
      state.readyCheckList?.length &&
      state.readyCheckList?.length < options?.length
    );
  }, [state.readyCheckList, options]);

  const allChecked = useMemo(() => {
    return (
      state.readyCheckList?.length &&
      state.readyCheckList?.length === options?.length
    );
  }, [state.readyCheckList, options]);

  const rowRenderer = (_props) => {
    const { index, style, key } = _props;
    const item = options?.[index] || '';
    const isChecked = state?.readyCheckList?.some((m) => m === item.value);
    return (
      <div
        style={style}
        key={key}
        className={styles.rowItem}
        onClick={() => checkOnChange(!isChecked, item.value)}
        title={item?.label ?? ''}
      >
        <Checkbox checked={isChecked} value={item.value ?? ''} />
        <span className={styles.rowItem_label}>{item?.label ?? ''}</span>
      </div>
    );
  };
  // 全选
  const onCheckAllChange = (e) => {
    const { checked } = e.target;
    setState({
      readyCheckList: checked ? [...options.map((v) => v.value)] : [],
    });
  };
  const searchInput = useDebounceFn(
    ({}) => {
      const readyCheckList = (options ?? []).map((j) => j.value);
      setState({ readyCheckList });
    },
    {
      wait: 300,
    },
  );
  return (
    <Select
      open={state.open}
      onDropdownVisibleChange={onDropdownVisibleChange}
      placeholder={placeholder}
      mode="multiple"
      maxTagCount={1}
      showArrow={true}
      className={styles.trSelect}
      dropdownClassName={styles.dropSelect}
      value={onSelectValue()}
      onChange={selectOnChange}
      showSearch={false}
      style={{ ...style }}
      loading={loading}
      onInputKeyDown={(e) => {
        if (
          ['Backspace', 'Delete'].includes(e.code) &&
          e.target.value.length === 0
        ) {
          e.stopPropagation();
        }
      }}
      {...args}
      dropdownRender={() => {
        return (
          <div className={styles.dropdown}>
            <div className={styles.dropdown_content}>
              <Input
                value={state.searchStr}
                onChange={(e) => {
                  setState({ searchStr: e?.target?.value ?? '' });
                  searchInput.run({ val: e?.target?.value ?? '' });
                }}
                allowClear
              />
              {options.length > 0 ? (
                <Fragment>
                  <div>
                    <Checkbox
                      indeterminate={indeterminate}
                      checked={allChecked}
                      onChange={onCheckAllChange}
                    >
                      全选
                    </Checkbox>
                  </div>
                  <div style={{ flex: 1, height: '100%' }}>
                    <AutoSizer>
                      {({ width, height }) => (
                        <VList
                          width={width}
                          height={height}
                          overscanRowCount={5}
                          rowCount={options.length}
                          rowHeight={30}
                          rowRenderer={rowRenderer}
                          scrollToAlignment={'start'}
                        />
                      )}
                    </AutoSizer>
                  </div>
                </Fragment>
              ) : (
                <div style={{ flex: 1, height: '100%' }}>
                  <PageEmpty
                    image={empty}
                    style={{ marginTop: 60 }}
                    imageStyle={{ height: 70 }}
                    description={'暂无数据'}
                  />
                </div>
              )}
            </div>
            <div className={styles.dropdown_footer}>
              <span
                className={styles.dropdown_footer_reset}
                onClick={resetAsset}
              >
                重置
              </span>
              <span
                className={cls({
                  [styles.dropdown_footer_confirm]: true,
                  [styles.dropdown_footer_confirm_disabled]:
                    _.isEmpty(state.readyCheckList) && isEmpty,
                })}
                onClick={() => handleAssetSelect()}
              >
                确认
              </span>
            </div>
          </div>
        );
      }}
    />
  );
};
export default MultipleSelect;
