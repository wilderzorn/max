import { useStaticState, useTRState } from '#/hooks/trHooks';
import { s8 } from '#/utils/utils';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Popover, Input, Button, Tooltip } from 'antd';
import _ from 'lodash';
import { Fragment, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { EmptyContent, OperationButton } from '../../index';
import { onSlideDisabled, scrollToEnd } from '../helper';
import styles from './index.less';
import { InfoCircleOutlined, EditOutlined } from '@ant-design/icons';
import cls from 'classnames';
import RenderTemplate from '@/pages/Middleware/Implementation/renderTemplate.jsx';
import { waitTime } from '#/utils/utils';

const TRChunkTable = memo(
  ({ item, disabled, onChangeValue, conentIndex, fullData }) => {
    const {
      val = [],
      key,
      childConfig = {},
      defaultValues = {},
      operateList = [],
      disabledObj,
      disabledUniteObj,
      emptyStyle = {},
      nameConfig = {},
      defaultValuesObj = {},
      childLayout = [],
      style = {},
    } = item;

    const listRef = useRef(null);

    const staticState = useStaticState({
      isListening: false,
      isComposing: false,
      name: null,
      currentIndex: null,
    });
    const [state, setState] = useTRState({
      open: false,
    });

    const slideDisabled = useMemo(
      () => onSlideDisabled(disabled, disabledObj, disabledUniteObj, fullData),
      [disabled, disabledObj, fullData, disabledUniteObj],
    );

    const onChangeChunkValue = useCallback(
      (obj, _index) => {
        const newList = [...(val || [])];
        newList[_index] = { ...(newList?.[_index] ?? {}), ...obj };
        onChangeValue({ [key]: newList }, conentIndex);
      },
      [val, onChangeValue, conentIndex],
    );

    // 继续添加
    const addItem = async (_key) => {
      if (slideDisabled) return;
      const newList = [...(val ?? [])];
      const obj = {
        uuid: s8(),
        ...(defaultValues ?? {}),
        ...(defaultValuesObj?.[_key] ?? {}),
      };
      if (nameConfig?.key) {
        const countList = newList.reduce((acc, cur) => {
          const count = parseInt(cur[nameConfig.key].replace('组合', ''));
          if (!isNaN(count)) {
            acc.push(count);
          }
          return acc;
        }, []);
        obj[nameConfig.key] = `组合${Math.max(0, ...countList) + 1}`;
      }
      newList.push(obj);
      onChangeValue({ [key]: newList }, conentIndex);
      staticState.isListening = true;
    };

    useEffect(() => {
      if (staticState.isListening) {
        scrollToEnd(
          listRef.current,
          listRef.current?.offsetHeight ?? 200,
          listRef.current?.scrollHeight ?? 0,
        );
        staticState.isListening = false; // 添加完成后取消监听
      }
    }, [val]);

    // 删除
    const onHandleDel = (index) => {
      if (slideDisabled) return;
      const newList = [...(val ?? [])].filter((__, _i) => _i !== index);
      onChangeValue({ [key]: newList }, conentIndex);
    };

    const onHandleName = (name, i) => {
      staticState.name = name;
      return (
        <Input.Group compact style={{ display: 'flex' }}>
          <Input
            defaultValue={staticState.name}
            onChange={(e) => (staticState.name = e.target.value)}
            placeholder="请输入组合名称"
          />
          <Button
            type="primary"
            onClick={() => {
              if (!staticState.name || staticState.name.trim() === '') {
                return message.error('请输入组合名称');
              }
              const newList = [...(val || [])];
              if (
                newList.some((_f) => _f[nameConfig.key] === staticState.name)
              ) {
                return message.error('组合名称不能重复');
              }
              newList[i] = {
                ...(newList?.[i] ?? {}),
                [nameConfig.key]: staticState.name,
              };
              onChangeValue({ [key]: newList }, conentIndex);
              staticState.name = null;
              staticState.currentIndex = null;
              setState({ open: false });
            }}
          >
            确定
          </Button>
        </Input.Group>
      );
    };

    return (
      <section className={styles.container}>
        <div
          className={styles.container_content}
          style={{ maxHeight: '200px', minHeight: '200px', ...style }}
          ref={listRef}
        >
          {val?.length ? (
            <Fragment>
              {val.map((j, i) => {
                return (
                  <div className={styles.chunk} key={`${key}-${j?.uuid}-${i}`}>
                    <div
                      style={nameConfig?.style ?? {}}
                      className={cls({
                        [styles.chunk_left]: true,
                      })}
                    >
                      <Tooltip title={val[i]?.[nameConfig.key]}>
                        {val[i]?.[nameConfig.key] ?? `组合${i + 1}`}
                      </Tooltip>
                    </div>
                    {nameConfig.key ? (
                      <Popover
                        overlayClassName={styles.myPopover}
                        trigger="click"
                        destroyTooltipOnHide={true}
                        title={
                          <section>
                            <InfoCircleOutlined
                              style={{ color: '#1890ff', marginRight: '5px' }}
                            />
                            <span>编辑组合名称</span>
                          </section>
                        }
                        onOpenChange={(open) => setState({ open })}
                        open={state.open && i === staticState.currentIndex}
                        content={() =>
                          onHandleName(val[i]?.[nameConfig.key], i)
                        }
                      >
                        <EditOutlined
                          style={{ color: '#1890ff' }}
                          onClick={() => (staticState.currentIndex = i)}
                        />
                      </Popover>
                    ) : null}
                    <div className={styles.chunk_del}>
                      {process?.env?.NODE_ENV === 'development' ? (
                        <MinusCircleOutlined onClick={() => onHandleDel?.(i)} />
                      ) : (
                        <Popconfirm
                          title="是否确认删除?"
                          onConfirm={() => onHandleDel?.(i)}
                          okText="确认"
                          cancelText="取消"
                          disabled={slideDisabled}
                        >
                          <MinusCircleOutlined />
                        </Popconfirm>
                      )}
                    </div>
                    <div className={styles.chunk_right}>
                      {(childConfig[j.keyType] ?? childLayout).map((x, xi) => {
                        return (
                          <RenderTemplate
                            key={`${xi}-${x.key}imp`}
                            disabled={slideDisabled}
                            onChangeValue={onChangeChunkValue}
                            conentIndex={i}
                            record={j}
                            fullData={j}
                            item={{
                              ...x,
                              val: j?.[x.key],
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ) : (
            <EmptyContent {...emptyStyle} />
          )}
        </div>
        <div className={styles.container_footer}>
          {!_.isEmpty(operateList)
            ? operateList.map((j) => {
                return (
                  <OperationButton
                    key={j.key}
                    disabled={slideDisabled}
                    callback={() => addItem(j.key)}
                    icon={<PlusCircleOutlined />}
                    name={j.name}
                  />
                );
              })
            : null}
        </div>
      </section>
    );
  },
);
export default TRChunkTable;
