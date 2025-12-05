import applyTheme from '#/resource/applyTheme';
import { setAuthorization } from '#/utils/authority';
import { DEFAULT_NAME } from '@/constants';
import {
  PoweroffOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import {
  Outlet,
  history,
  setLocale,
  useIntl,
  useLocation,
  useModel,
} from '@umijs/max';
import {
  Button,
  ColorPicker,
  Flex,
  Switch,
  Layout,
  Menu,
  theme,
  ConfigProvider,
} from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import logo from '../../public/logo.png';
import styles from './index.less';

const { Sider, Content } = Layout;

// 定义菜单项类型
interface MenuItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

export default () => {
  const intl = useIntl();
  const location = useLocation();
  const { setGlobal, global } = useModel('global');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    onInitialization();
    fetchMenuData();
  }, []);

  useEffect(() => {
    const htmlElement = window.document.querySelector('html');
    htmlElement?.setAttribute('data-type-color', global.theme);
  }, [global.theme]);

  const onInitialization = () => {
    let url = (location.pathname ?? '').replace(/^\/web/, '');
    if (url.indexOf('?') > 0) {
      url = url.replace(/\?.*$/, '');
    }
    setSelectedKeys([url]);
    setGlobal({ pathname: url });
  };

  const fetchMenuData = async () => {
    const mockMenuData: MenuItem[] = [
      {
        name: 'home',
        path: '/home',
      },
      {
        name: 'popupDemo',
        path: '/popupDemo',
      },
      {
        name: 'relationship',
        path: '/relationship',
      },
      {
        name: 'queryHistoryData',
        path: '/queryHistoryData',
      },
      {
        name: 'childWeb',
        path: '/childWeb',
      },
      {
        name: 'transition',
        path: '/transition',
      },
    ];
    setMenuItems(mockMenuData);
  };

  const handleMenuClick = (item: MenuItem) => {
    history.push(item.path);
    setSelectedKeys([item.path]);
    setGlobal({ pathname: item.path });
  };

  const toggleCollapsed = () => {
    setGlobal({ collapsed: !global.collapsed });
  };

  // 处理主题配置
  const themeConfig = useMemo(() => {
    const algorithm =
      global.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

    // 合并自定义主题配置
    const customTheme = applyTheme({
      colorPrimary: global.themeOptions?.colorPrimary,
    });

    return {
      ...customTheme,
      algorithm: [algorithm],
    };
  }, [global.theme, global.themeOptions?.colorPrimary]);

  // 菜单项渲染
  const renderMenuItems = useMemo(() => {
    return menuItems.map((item) => {
      return {
        key: item.path,
        icon: item.icon,
        label: intl.formatMessage({ id: `menu.${item.name}` }) || item.name,
        onClick: () => handleMenuClick(item),
      };
    });
  }, [menuItems, intl]);

  return (
    <ConfigProvider theme={themeConfig}>
      <div className={styles.layout}>
        <Layout className={styles.antLayout}>
          <Sider
            className={styles.antLayoutSider}
            collapsed={global.collapsed}
            onCollapse={toggleCollapsed}
            collapsible
            trigger={null}
            width={220}
            collapsedWidth={60}
            theme={global.theme}
          >
            <div className={styles.collapseTriggerContainer}>
              <Button
                type="text"
                icon={
                  global.collapsed ? (
                    <RightCircleOutlined />
                  ) : (
                    <LeftCircleOutlined />
                  )
                }
                onClick={toggleCollapsed}
                className={styles.collapseButton}
              />
            </div>
            <div className={styles.logoContainer}>
              <img src={logo} alt="logo" className={styles.logo} />
              {!global.collapsed && (
                <h1 className={styles.title}>{DEFAULT_NAME}</h1>
              )}
            </div>
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              onOpenChange={setOpenKeys}
              items={renderMenuItems}
              theme={global.theme}
              className={styles.antMenu}
              inlineCollapsed={global.collapsed}
            />
            <div className={styles.footerContainer}>
              <Flex
                {...(global.collapsed
                  ? { vertical: true }
                  : { vertical: false, justify: 'space-around' })}
                gap="small"
                style={{ width: '100%' }}
                align="center"
              >
                <Switch
                  checkedChildren="黑"
                  unCheckedChildren="白"
                  value={global.theme === 'dark'}
                  onChange={(checked) =>
                    setGlobal({ theme: checked ? 'dark' : 'light' })
                  }
                />
                <Switch
                  checkedChildren="中"
                  unCheckedChildren="US"
                  value={global.locale === 'zh-CN'}
                  onChange={(checked) => {
                    const val = checked ? 'zh-CN' : 'en-US';
                    setLocale(val, false);
                    setGlobal({ locale: val });
                  }}
                />
                <ColorPicker
                  value={global.themeOptions.colorPrimary}
                  onChangeComplete={(color) => {
                    setGlobal({
                      themeOptions: {
                        ...global.themeOptions,
                        colorPrimary: color.toHexString(),
                      },
                    });
                  }}
                />
                <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={() => {
                    setAuthorization();
                    history.push('/user');
                  }}
                />
              </Flex>
            </div>
          </Sider>
          <Layout>
            <Content
              style={{
                marginLeft: global.collapsed ? '60px' : '220px',
                transition: 'margin-left 0.2s ease',
                minHeight: '100vh',
                background: 'var(--bg)',
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};
