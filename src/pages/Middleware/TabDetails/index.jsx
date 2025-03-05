import empty from '#/assets/empty.svg';
import PageEmpty from '#/components/PageEmpty';
import PageLoading from '#/components/PageLoading';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import orderMap from '@/pages/Middleware/Implementation/layout';
import SmartMonitoringSealing from '@/pages/Table';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import {
  Fragment,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import StrategyDetails from '../StrategyDetails';
import { STATUS_STYLE } from '../helper';
import styles from './index.less';

const LABEL_TABS = ['风机故障', '遥测量异常', '通讯中断', '电气故障']; // 标签的tab
const SWITCH_TABS = ['AGC异常', '测风塔', '环境监测仪']; // 可以添加、切换的tab

const TabDetails = memo(
  forwardRef(
    (
      {
        dataInfo,
        onOperatingData,
        deptNum,
        _onUpdataDetail,
        _onChangePageLoading,
        isDefault,
        onDataTable,
        onPartialRequest,
        tabLoading,
        contentStaticState,
        onClearStaticState,
      },
      ref,
    ) => {
      const isTabs = [...LABEL_TABS, ...SWITCH_TABS].includes(
        dataInfo.strategyInfoName,
      );
      const [state, setState] = useTRState({
        relInfoObj: {},
        dataObj: {},
        tabs: dataInfo?.relInfoBodies ?? [],
        tabsId: dataInfo?.relInfoBodies?.[0]?.id ?? undefined,
        isDataTable: false,
        strategyList: [],
      });
      const staticState = useStaticState({
        strategyOrder: Object.keys(
          orderMap.get(dataInfo.strategyInfoName) ?? {},
        ),
      });
      useImperativeHandle(ref, () => {
        return { getState: () => state };
      });
      useEffect(() => {
        let tabs = LABEL_TABS.includes(dataInfo.strategyInfoName)
          ? [
              ...(dataInfo?.relInfoBodies ?? []).map((j) => {
                return {
                  ...j,
                  strategyRelName: '标签一',
                };
              }),
              {
                id: _.uniqueId('strategy_'),
                strategyRelName: '标签二',
                type: 'table',
              },
            ]
          : dataInfo?.relInfoBodies ?? [];
        const relInfoObj = tabs.reduce((acc, cur) => {
          acc[cur.id] = cur;
          return acc;
        }, {});
        const findLastTab = _.find(
          tabs,
          (j) => j.id === contentStaticState.lastTabData?.tabsId,
        );
        let tabsId = findLastTab?.id ?? state.tabsId ?? _.first(tabs)?.id;
        if (contentStaticState.tabAction === 'add') {
          tabsId = _.last(tabs)?.id ?? state.tabsId;
        } else if (contentStaticState.tabAction === 'remove') {
          if (tabsId && !_.find(tabs, (j) => j.id === tabsId)) {
            tabsId = _.first(tabs)?.id;
          }
        }
        setState({ relInfoObj, tabs, tabsId });
        onClearStaticState?.('lastTabData', {});
      }, [dataInfo]);

      useEffect(() => {
        onPartialRequest();
      }, [state.tabsId]);

      useEffect(() => onRelInfoObj(), [state.relInfoObj]);

      const onRelInfoObj = useCallback(
        (id = state.tabsId) => {
          const { relInfoObj } = state;
          if (_.isEmpty(relInfoObj)) return;
          let isDataTable = false;
          if (relInfoObj?.[id]?.type === 'table') {
            isDataTable = true;
            setState({ isDataTable });
          } else {
            const strategyDetails = relInfoObj[id]?.strategyDetails ?? [];
            const dataObj = _.keyBy(strategyDetails, 'id');
            setState({ dataObj, isDataTable });
          }
          onDataTable(isDataTable);
        },
        [state.relInfoObj, state.tabsId],
      );

      const onTabsOperatingData = useCallback(
        (id, obj) => {
          const dataObj = { ...state.dataObj };
          dataObj[id] = { ...dataObj[id], ...obj };
          // if (dataInfo.strategyInfoName === '电气故障') {
          //   const findDis = Object.values(dataObj).some(
          //     (j) =>
          //       (['跳闸', '一类报文'].includes(j?.strategyDetailName) &&
          //         j?.strategyDetailSwitch === '0') ||
          //       (j?.strategyDetailName === '跳闸' &&
          //         JSON.parse(j?.value ?? '[]')?.some((f) => f?.createBillLading === 0)),
          //   );
          //   Object.keys(dataObj).forEach((k) => {
          //     if (['一类报文', '二类报文'].includes(dataObj[k].strategyDetailName) && findDis) {
          //       dataObj[k] = {
          //         ...dataObj[k],
          //         strategyDetailSwitch: '0',
          //         status: 'OFF',
          //       };
          //     }
          //   });
          // }

          const relInfoObj = { ...state.relInfoObj };
          relInfoObj[state.tabsId] = {
            ...relInfoObj[state.tabsId],
            strategyDetails: Object.values(dataObj),
          };
          onOperatingData(state.tabsId, relInfoObj);
        },
        [state.dataObj, state.relInfoObj, onOperatingData],
      );

      const onHandlePopup = async () => {
        // const res = await OperateModal.show({
        //   menuKey: `Strategy${dataInfo.strategyInfoName}`,
        //   deptNum,
        //   disableds: [...(state.tabs.map((j) => j.strategyRelName) ?? [])],
        //   type: 'add',
        // });
        // if (res.index !== 1 || !res?.values?.assetNum) return;
        // _onChangePageLoading(true);
        // const request = await addStrategy({
        //   agcId: res.values.assetNum,
        //   agcName: res.values.assetName,
        //   parentId: dataInfo.id,
        //   type: dataInfo.strategyInfoName,
        // });
        // _onChangePageLoading(false);
        // if (request?.statusCode === HttpCode.SUCCESS) {
        //   const strategyDetails = (request?.data ?? []).map((j) => ({
        //     ...j,
        //     id: _.uniqueId(`strategy_${res.values.assetNum}_`),
        //   }));
        //   const _id = _.uniqueId(`bodi_${res.values.assetNum}_`);
        //   const relInfoBodie = {
        //     id: _id,
        //     parentId: dataInfo.id,
        //     strategyDetails: [...(strategyDetails ?? [])],
        //     strategyRelName: res.values.assetName,
        //     agcId: res.values.assetNum,
        //     strategyRelSwitch: null,
        //     type: 'add',
        //   };
        //   await onOperatingData(dataInfo.id, relInfoBodie, 'add');
        // } else {
        //   message.error(res?.message ?? '添加失败');
        // }
        message.error('失败');
      };

      // 删除agc
      const onDelStrategy = async () => {
        message.error('删除失败');
        // const { relInfoObj, tabsId } = state;
        // if (relInfoObj?.[tabsId]?.type === 'add') {
        //   return onOperatingData(tabsId, {}, 'remove');
        // }
        // const reason = await ModifyReason.show();
        // if (reason.index !== 1) return;
        // _onChangePageLoading(true);
        // const res = await delStrategy({ id: tabsId, remark: reason?.data?.remark });
        // if (res?.statusCode === HttpCode.SUCCESS) {
        //   _onUpdataDetail();
        // } else {
        //   _onChangePageLoading(false);
        //   message.error(res?.message ?? '删除失败');
        // }
      };

      const templateHeader = () => {
        return (
          <div className={styles.container_notTabs}>
            <span className={styles.container_notTabs_title}>
              {dataInfo.strategyInfoName}
            </span>
            {isDefault ? null : (
              <div
                style={{
                  ...(STATUS_STYLE?.[dataInfo.strategyInfoSwitch] ??
                    STATUS_STYLE?.['0'] ??
                    {}),
                }}
                className={styles.header_status}
              >
                {dataInfo.strategyInfoSwitch === '0' ? '已停用' : '已启用'}
              </div>
            )}
          </div>
        );
      };

      const tabsHeader = () => {
        return (
          <div className={styles.container_header}>
            <div className={styles.container_header_content}>
              <div className={styles.container_header_content_tabs}>
                {state.tabs?.map((n, ni) => {
                  return (
                    <div
                      key={`${n.id}-${ni}-tab`}
                      className={classnames({
                        [styles.tabs]: true,
                        [styles.tabs_action]: n.id === state.tabsId,
                      })}
                      onClick={() => {
                        if (n.id === state.tabsId) return;
                        setState({ tabsId: n.id });
                        onRelInfoObj(n.id);
                      }}
                    >
                      {n.strategyRelName}
                      {n.id === state.tabsId &&
                      !LABEL_TABS.includes(dataInfo.strategyInfoName) ? (
                        <Popconfirm
                          title="是否确认删除"
                          onConfirm={onDelStrategy}
                          okText="确定"
                          cancelText="取消"
                        >
                          <span className={styles.tabs_icon}>
                            <DeleteOutlined
                              style={{ fontSize: '15px', color: '#EB5757' }}
                            />
                          </span>
                        </Popconfirm>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {!LABEL_TABS.includes(dataInfo.strategyInfoName) ? (
                <div className={styles.button} onClick={onHandlePopup}>
                  <PlusOutlined style={{ fontSize: '15px' }} />
                  新建
                </div>
              ) : null}
            </div>
            <div
              style={{
                ...(STATUS_STYLE?.[dataInfo.strategyInfoSwitch] ??
                  STATUS_STYLE?.['0'] ??
                  {}),
                marginBottom: '15px',
              }}
              className={styles.header_status}
            >
              {dataInfo.strategyInfoSwitch === '0' ? '已停用' : '已启用'}
            </div>
          </div>
        );
      };
      const customSort = (a, b) => {
        const indexA = staticState.strategyOrder.indexOf(a.strategyDetailName);
        const indexB = staticState.strategyOrder.indexOf(b.strategyDetailName);
        return indexA - indexB;
      };

      const strategyList = useMemo(() => {
        return (state.relInfoObj?.[state.tabsId]?.strategyDetails ?? [])
          .filter((j) =>
            staticState.strategyOrder.includes(j.strategyDetailName),
          )
          .sort(customSort);
      }, [state.relInfoObj, state.tabsId]);

      const componentCode =
        dataInfo.strategyInfoName === '通讯中断'
          ? 'Strategy风机故障'
          : `Strategy${dataInfo.strategyInfoName}`;

      return (
        <div className={styles.container}>
          {isTabs && !isDefault ? (
            <Fragment>{tabsHeader()}</Fragment>
          ) : (
            <Fragment>{templateHeader()}</Fragment>
          )}
          {tabLoading ? (
            <div className={styles.container_content}>
              <PageLoading />
            </div>
          ) : (
            <div className={styles.container_content}>
              {state.isDataTable ? (
                <SmartMonitoringSealing
                  componentCode={componentCode}
                  componentStyle={{
                    height: '100%',
                    margin: 0,
                    padding: '20px 0 0 0',
                  }}
                  otherParams={{ deptNum }}
                />
              ) : (
                <Fragment>
                  {_.isEmpty(strategyList) ? (
                    <div className={styles.container_content}>
                      <PageEmpty
                        image={empty}
                        style={{ marginTop: 50 }}
                        imageStyle={{ height: 100 }}
                        description={'暂无数据'}
                      />
                    </div>
                  ) : (
                    <Fragment>
                      {strategyList.map((j, _i) => {
                        return (
                          <StrategyDetails
                            key={`${j.id}-${_i}-dataTable`}
                            id={j.id}
                            dataObj={state.dataObj}
                            deptNum={deptNum}
                            strategyInfoName={dataInfo.strategyInfoName}
                            onOperatingData={onTabsOperatingData}
                            isDefault={isDefault}
                          />
                        );
                      })}
                    </Fragment>
                  )}
                </Fragment>
              )}
            </div>
          )}
        </div>
      );
    },
  ),
);
export default TabDetails;
