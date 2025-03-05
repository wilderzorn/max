import styles from './index.less';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import cls from 'classnames';
import { tabs } from './helper';
import { useTRState } from '#/hooks/trHooks';
import { useRef, useEffect, useMemo } from 'react';
import { useSize, useThrottleFn } from 'ahooks';
import Gauge from './Gauge';
import Scatter from './Scatter';

const RenderTemplate = ({ type, extraProps = {} }) => {
  if (!type) return null;
  const componentMap = useMemo(
    () => ({
      gauge: Gauge,
      scatter: Scatter,
    }),
    [type],
  );

  const Component = componentMap[type];
  return <Component {...extraProps} />;
};

const Info = ({ toggleInfo, layout }) => {
  const tabRef = useRef(null);
  const tabSize = useSize(tabRef);
  const [state, setState] = useTRState({
    tabKey: null,
    tabType: null,
    showLeftBtn: false,
    showRightBtn: false,
  });

  useEffect(() => {
    const head = tabs[0];
    setState({ tabKey: head.key, tabType: head.type });
  }, []);

  useEffect(() => {
    tabRef?.current?.addEventListener?.('scroll', checkScrollPosition); // 监听滚动事件
    return () => {
      tabRef?.current?.removeEventListener?.('scroll', checkScrollPosition); // 清除监听器
    };
  }, []);

  const sizeRun = useThrottleFn(
    () => {
      checkScrollPosition();
    },
    { wait: 500 },
  );

  useEffect(() => {
    if (tabRef.current) {
      sizeRun.run();
    }
  }, [tabSize]);

  const handleScroll = (direction) => {
    if (tabRef.current) {
      const scrollAmount = 100; // 每次滚动的像素量
      const newScrollPosition =
        direction === 'left'
          ? tabRef.current.scrollLeft - scrollAmount // 左滚动
          : tabRef.current.scrollLeft + scrollAmount; // 右滚动

      tabRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth', // 使用平滑滚动
      });
    }
  };

  const checkScrollPosition = () => {
    if (tabRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabRef.current;
      setState({
        showLeftBtn: scrollLeft > 0,
        showRightBtn: scrollLeft < scrollWidth - clientWidth,
      });
    }
  };

  return (
    <section
      className={cls(styles.info, {
        [styles.info_unseen]: layout === 'scoreFull',
      })}
    >
      <div className={styles.info_slide} onClick={toggleInfo}>
        {layout === 'normal' ? <CaretLeftOutlined /> : <CaretRightOutlined />}
      </div>
      <div
        className={cls(styles.scroll_btn, styles.scroll_left, {
          [styles.hidden]: !state.showLeftBtn,
        })}
        onClick={() => handleScroll('left')}
      >
        <CaretLeftOutlined />
      </div>
      <div
        className={cls(styles.scroll_btn, styles.scroll_right, {
          [styles.hidden]: !state.showRightBtn,
        })}
        onClick={() => handleScroll('right')}
      >
        <CaretRightOutlined />
      </div>
      <div className={styles.tab} ref={tabRef}>
        {tabs.map((t) => (
          <span
            key={t.key}
            className={t.key === state.tabKey ? styles.tab_active : ''}
            onClick={() => setState({ tabKey: t.key, tabType: t.type })}
          >
            {t.name}
          </span>
        ))}
      </div>
      <div className={styles.content}>
        <RenderTemplate
          type={state.tabType}
          extraProps={{ key: state.tabKey }}
        />
      </div>
    </section>
  );
};
export default Info;
