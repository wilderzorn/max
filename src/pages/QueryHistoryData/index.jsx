import React from 'react';
import { useStaticState } from '#/index';
import useResize from '#/hooks/useResize';
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';
import { useSize } from 'ahooks';
import styles from './index.less';
import * as echarts from 'echarts';
import ScalableContainer from '#/components/ScalableContainer';
import { option } from './helper';

const QueryHistoryData = () => {
  const radarRef = React.useRef();
  const ref = React.useRef();
  const pageRef = React.useRef();
  const { toggleFullscreen = () => {}, isFullscreen } = pageRef?.current ?? {};
  const size = useSize(ref);

  const staticState = useStaticState({
    radarRef: null,
  });

  React.useEffect(() => {
    if (!radarRef?.current) return;
    if (!size || size.width <= 0 || size.height <= 0) return;
    const echartsInstance = echarts.init(radarRef.current);
    staticState.radarRef = echartsInstance;
    echartsInstance.setOption(option);
    return () => {
      echartsInstance.dispose(); // 添加清理逻辑，防止内存泄漏
    };
  }, [size?.width, size?.height]);

  useResize(() => {
    onResize();
  });

  const onResize = React.useCallback(() => {
    if (!staticState?.radarRef) return;
    staticState.radarRef.resize();
  }, [staticState.radarRef]);

  return (
    <ScalableContainer ref={pageRef}>
      <div ref={ref} className={styles.container}>
        <div ref={radarRef} style={{ width: '100%', height: '100%' }} />
        <div
          className={styles.full}
          onClick={() => {
            toggleFullscreen();
          }}
        >
          {isFullscreen ? <ShrinkOutlined /> : <ArrowsAltOutlined />}
        </div>
      </div>
    </ScalableContainer>
  );
};

export default QueryHistoryData;
