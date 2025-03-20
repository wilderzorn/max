import empty from '#/assets/empty.svg';
import darkError from '#/assets/img_dark_error.png';
import PageEmpty from '#/components/PageEmpty';
import PageLoading from '#/components/PageLoading';
import { HttpCode } from '#/resource/contacts';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import orderMap from '@/pages/Middleware/Implementation/layout';
import auxiliary from '@/pages/Middleware/auxiliary';
import {
  deviceStatusInfo,
  fanExceptionConfigAsset,
  getDeviceInfoByStationDeptNums,
  getStrategyPhotovoltaic,
  onQueryTagInfo,
  resetDefault,
  statusList,
  taskCaseList,
  updateStrategy,
  windPowerPredictionNameList,
  workflowProcessStatus,
} from '@/services/centerAlert';
import { Button, message } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import TabDetails from './TabDetails';
import { onFillVlaue } from './helper';
import styles from './index.less';
import runIdleTask from '#/utils/runIdleTask';

const Content = (preops) => {
  const {
    staticData,
    _onChangePageLoading = () => {},
    _onUpdataDetail = () => {},
    isDefault = true,
    deptInfo = { deptNum: '01001055' },
  } = preops;
  const [messageApi, contextHolder] = message.useMessage();
  const [state, setState] = useTRState({
    isLoading: false,
    errorMessage: '',
    dataInfo: { deptNum: '01001055' },
    id: '',
    isDataTable: false,
    tabLoading: false,
  });
  // #region
  const staticState = useStaticState({
    timer: null,
    tabAction: '',
    lastTabData: {},
    strategyOrder: [],
  });
  // #endregion
  const tabDetailsRef = useRef(null);

  useEffect(() => {
    featData(staticData);
  }, [staticData]);

  const onClearStaticState = (key, value = null) => {
    if (key) staticState[key] = value;
  };

  const featData = (details) => {
    if (!details) {
      setState({
        dataInfo: { ...(details ?? {}) },
      });
      return;
    }
    staticState.lastTabData = tabDetailsRef?.current?.getState() ?? {};
    setState({
      dataInfo: { ...(details ?? {}) },
      isLoading: true,
    });
    staticState.strategyOrder = Object.keys(
      orderMap.get(details.strategyInfoName) ?? {},
    );
    if (auxiliary.staticDeptNum !== deptInfo.deptNum || isDefault) {
      onResource(details);
    } else {
      if (staticState.timer) return;
      staticState.timer = setTimeout(() => {
        setState({ isLoading: false });
        clearTimeout(staticState.timer);
        staticState.timer = null;
      }, 200);
    }
  };

  const onDataTable = (isDataTable = false) => {
    setState({ isDataTable });
  };

  const onPartialRequest = async () => {
    if (['测风塔', '环境监测仪'].includes(state.dataInfo.strategyInfoName)) {
      if (isDefault) return;
      const tabState = tabDetailsRef?.current?.getState() ?? {};
      if (!tabState?.tabsId) return;
      if (staticState?.tabState?.tabsId === tabState.tabsId) return;
      setState({ tabLoading: true });
      const res = await onQueryTagInfo({
        assetNum: (tabState.tabs ?? []).find((j) => j.id === tabState.tabsId)
          ?.agcId,
        model: '',
        stationDeptNum: deptInfo.deptNum,
        thirdClass:
          state.dataInfo.strategyInfoName === '测风塔' ? 'E0651' : 'E0691',
        type: 'YC',
      });
      auxiliary.hanldeStaticResources([
        {
          name: 'cftPointList',
          list: (res?.data ?? []).map((j) => ({
            label: j.labelName,
            value: j.label,
          })),
        },
      ]);
      setState({ tabLoading: false });
    }
  };
  // #region 资源
  const onResource = async (details) => {
    // if (!isDefault) {
    const strategyInfoName = details.strategyInfoName;
    const [res1, res2, res3, res4, res5] = await Promise.all([
      taskCaseList({ deptNum: deptInfo.deptNum }),
      statusList(),
      getDeviceInfoByStationDeptNums({
        stationDeptNums: [deptInfo.deptNum],
        thirdClass: [],
      }),
      windPowerPredictionNameList(deptInfo.deptNum),
      fanExceptionConfigAsset({ deptNum: deptInfo.deptNum }),
    ]);
    if (strategyInfoName === details.strategyInfoName) {
      auxiliary.hanldeStaticResources([
        {
          name: 'strategyList',
          list: (res1?.data?.taskCase ?? []).map((j) => {
            return {
              label: j.taskName,
              value: j.taskId,
            };
          }),
        },
        {
          name: 'warningList',
          list: (res2?.data ?? []).map((j) => {
            return {
              label: j,
              value: j,
            };
          }),
        },
        {
          name: 'assetList',
          list: (res3?.data?.[deptInfo.deptNum] ?? [])
            .filter((j) => j.thirdClass === 'G0001')
            .map((j) => {
              return {
                ...j,
                label: j.assetname,
                value: j.assetnum,
              };
            }),
        },
        {
          name: 'windPowerPredictionNameList',
          list: (res4?.data ?? []).map((j) => ({ label: j, value: j })),
        },
        {
          name: 'fanAbnormalUnit',
          list: (res5?.data ?? []).map((j) => {
            return {
              ...j,
              eq10: JSON.parse(j?.data ?? '{}')?.eq10,
              label: j.assetName,
              value: j.assetNum,
            };
          }),
        },
        {
          name: 'yclAssetList',
          list: (res3?.data?.[deptInfo.deptNum] ?? [])
            .filter((j) =>
              ['SYZ01', 'E0852', 'E0851', 'E0651'].includes(j.thirdClass),
            )
            .map((j) => {
              return {
                ...j,
                label: j.assetname,
                value: j.assetnum,
              };
            }),
        },
        {
          name: 'allDeviceList',
          list: res3?.data?.[deptInfo.deptNum] ?? [],
        },
      ]);
    }
    // }
    if (_.isEmpty(auxiliary?.staticResources?.unitStateList)) {
      const res1 = await deviceStatusInfo();
      const unitStateList = [];
      (res1?.dictionaryValueBodies ?? []).forEach((j) => {
        unitStateList.push({
          label: j.description,
          value: j.value,
        });
      });
      auxiliary.hanldeStaticResources([
        {
          name: 'unitStateList',
          list: [...unitStateList],
        },
      ]);
    }
    if (_.isEmpty(auxiliary?.staticResources?.statisticalStateList)) {
      const res2 = await getStrategyPhotovoltaic();
      const statisticalStateList = [];
      (res2?.data ?? []).forEach((j) => {
        statisticalStateList.push({
          label: j,
          value: j,
        });
      });
      auxiliary.hanldeStaticResources([
        {
          name: 'statisticalStateList',
          list: [...statisticalStateList],
        },
      ]);
    }
    if (_.isEmpty(auxiliary?.staticResources?.workflowStatus)) {
      const res3 = await workflowProcessStatus({
        formId: '33',
        types: ['FAN_WORK_TICKET', 'FAN_WORK_TICKET_LOT'],
      });
      auxiliary.hanldeStaticResources([
        {
          name: 'workflowStatus',
          list: (res3?.data ?? []).map((j) => ({ label: j, value: j })),
        },
      ]);
    }
    if (staticState.timer) return;
    staticState.timer = setTimeout(() => {
      auxiliary.unpeteStaticDeptNum(deptInfo.deptNum, deptInfo);
      setState({ isLoading: false });
      clearTimeout(staticState.timer);
      staticState.timer = null;
    }, 200);
  };
  // #endregion

  // TODO 有问题
  const onOperatingData = useCallback(
    (id, obj, type = 'edit') => {
      let dataInfo = { ...state.dataInfo };
      staticState.tabAction = type;
      if (type === 'add') {
        dataInfo.relInfoBodies = [...(dataInfo?.relInfoBodies ?? []), obj];
      } else if (type === 'remove') {
        dataInfo.relInfoBodies = dataInfo.relInfoBodies.filter(
          (j) => j.id !== id,
        );
      } else {
        dataInfo.relInfoBodies.forEach((j) => {
          if (j.id === id) {
            j.strategyDetails = [...(obj?.[id]?.strategyDetails ?? [])];
          }
        });
      }
      setState({ dataInfo });
    },
    [state.dataInfo, setState, tabDetailsRef, runIdleTask],
  );
  // BUG 用来标记已知的错误或问题
  const onSave = async () => {
    const { dataInfo } = state;
    const updateInfo = [];
    const addInfo = [];
    (dataInfo?.relInfoBodies ?? [])?.forEach((j) => {
      if (j.type === 'add') {
        addInfo.push({
          agcInfoParam: {
            agcId: j.agcId,
            agcName: j.strategyRelName,
            parentId: j.parentId,
          },
          strategyDetails: (j?.strategyDetails ?? []).map((n) => {
            const columns =
              orderMap.get(state.dataInfo.strategyInfoName)?.[
                n.strategyDetailName
              ]?.columns ?? [];
            let fillValue = null;
            const value = JSON.parse(n?.value || '[]');
            try {
              fillValue = (columns || []).map((c, ci) => {
                return onFillVlaue({
                  value: value?.[ci],
                  layout: c,
                  isVerify:
                    !isDefault &&
                    (n.strategyDetailSwitch === '1' ||
                      !n?.strategyDetailSwitch),
                  fullVal: (value ?? []).reduce((p, c) => {
                    return { ...p, ...c };
                  }, {}),
                });
              });
            } catch (error) {
              messageApi.error(`请修复数据：${n.strategyDetailName}`);
              throw error;
            }
            return {
              value: JSON.stringify(fillValue ?? []),
              ...n,
            };
          }),
        });
      } else {
        (j?.strategyDetails ?? []).forEach((n) => {
          if (staticState.strategyOrder.includes(n.strategyDetailName)) {
            const columns =
              orderMap.get(state.dataInfo.strategyInfoName)?.[
                n.strategyDetailName
              ]?.columns ?? [];
            let fillValue = null;
            const value = JSON.parse(n?.value || '[]');
            try {
              fillValue = (columns || []).map((c, ci) => {
                return onFillVlaue({
                  value: value?.[ci],
                  layout: c,
                  isVerify: true,
                  fullVal: (value ?? []).reduce((p, c) => {
                    return { ...p, ...c };
                  }, {}),
                });
              });
            } catch (error) {
              messageApi.error(`请修复数据：${n.strategyDetailName}`);
              throw error;
            }
            updateInfo.push({
              id: n.id,
              status: n?.strategyDetailSwitch
                ? n.strategyDetailSwitch === '1'
                  ? 'ON'
                  : 'OFF'
                : null,
              value: JSON.stringify(fillValue ?? []),
              strategyDetailSwitch: n.strategyDetailSwitch,
              strategyDetailName: n.strategyDetailName,
            });
          }
        });
      }
    });

    // const reason = await ModifyReason.show();
    // if (reason.index !== 1) return;
    _onChangePageLoading(true);
    const res = await updateStrategy({
      parentMenu: state.dataInfo.strategyInfoName,
      // remark: reason?.data?.remark,
      updateInfo,
      strategyDetails: addInfo.map((j) => {
        const obj = { ...j };
        obj.strategyDetails = (obj?.strategyDetails ?? []).map((l) => {
          delete l.id;
          return l;
        });
        return obj;
      }),
      isDefault,
    });
    if (res?.statusCode === HttpCode.SUCCESS) {
      _onUpdataDetail?.();
    } else {
      _onChangePageLoading(false);
      messageApi.error(res?.message ?? '更新失败');
    }
  };

  // 恢复默认
  const _onReset = async () => {
    const newDataInfo = { ...state.dataInfo };
    _onChangePageLoading(true);
    setState({ isLoading: true });
    const res = await resetDefault({
      deptNum: deptInfo.deptNum,
      strategyName: newDataInfo.strategyInfoName,
    });
    _onChangePageLoading(false);
    setState({ isLoading: false });
    if (res?.statusCode === HttpCode.SUCCESS) {
      const dataObj = {};
      (res?.data ?? []).forEach((j) => {
        dataObj[j.strategyDetailName] = j;
      });
      (newDataInfo?.relInfoBodies ?? []).forEach((j) => {
        (j?.strategyDetails ?? []).forEach((v) => {
          const itemData = dataObj?.[v.strategyDetailName] ?? {};
          if (_.isEmpty) {
            v.strategyDetailSwitch = itemData.strategyDetailSwitch;
            v.value = itemData.value;
          }
        });
      });
      setState({
        dataInfo: { ...newDataInfo },
      });
    } else {
      messageApi.error(res?.message ?? '获取默认配置失败');
    }
  };

  const content = () => {
    const { dataInfo, tabLoading } = state;
    return (
      <TabDetails
        ref={tabDetailsRef}
        dataInfo={dataInfo}
        onOperatingData={onOperatingData}
        deptNum={deptInfo.deptNum}
        _onUpdataDetail={_onUpdataDetail}
        _onChangePageLoading={_onChangePageLoading}
        isDefault={isDefault}
        onDataTable={onDataTable}
        onPartialRequest={onPartialRequest}
        tabLoading={tabLoading}
        contentStaticState={staticState}
        onClearStaticState={onClearStaticState}
      />
    );
  };

  if (state.isLoading) return <PageLoading />;
  if (_.isEmpty(state.dataInfo)) {
    return (
      <PageEmpty
        image={empty}
        style={{ marginTop: 150 }}
        imageStyle={{ height: 150 }}
        description={'暂无数据'}
      />
    );
  }
  if (state.errorMessage?.length > 0) {
    return (
      <PageEmpty
        image={darkError}
        style={{ marginTop: 150 }}
        imageStyle={{ height: 150 }}
        description={errorMessage}
      />
    );
  }

  return (
    <div
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      {content()}
      <div className={styles.container_footer}>
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
      </div>
      {contextHolder}
    </div>
  );
};

export default Content;
