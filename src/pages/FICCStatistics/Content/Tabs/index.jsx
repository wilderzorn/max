import styles from './index.less';
import { TABS } from './helper';
import cls from 'classnames';
import { useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

const Tabs = ({ state, setState }) => {
  useEffect(() => {
    setState({ strategy: TABS[0].key });
  }, []);

  const onchangeCollapse = () => {
    setState({ collapsed: !state.collapsed });
  };

  return (
    <div className={styles.tabs} style={{ width: state.collapsed ? 60 : 200 }}>
      <div className={styles.collapsed} onClick={onchangeCollapse}>
        {state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      {TABS.map((t) => {
        return (
          <section
            key={t.key}
            className={cls(styles.tab, {
              [styles.tab_checked]: state.strategy === t.key,
            })}
            onClick={() => {
              setState({ strategy: t.key });
            }}
          >
            <Tooltip title={state.collapsed ? t.name : null}>{t.name}</Tooltip>
          </section>
        );
      })}
    </div>
  );
};
export default Tabs;
