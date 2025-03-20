import abortableDelay from '#/utils/abortableDelay';
import applyTheme from '#/constants/applyTheme';
import { setAuthorization } from '#/utils/authority';
import emitter from '#/utils/emitter';
import { useStaticState, useTRState } from '#/hooks/trHooks';
import { PoweroffOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import {
  Outlet,
  history,
  setLocale,
  useIntl,
  useLocation,
  useModel,
} from '@umijs/max';
import { useExternal } from 'ahooks';
import { Button, ColorPicker, Divider, Flex, Switch } from 'antd';
import { ThemeProvider } from 'antd-style';
import { Fragment, useEffect, useRef } from 'react';
import logo from '../../public/logo.png';
import styles from './index.less';
import { DEFAULT_NAME } from '@/constants';

const publicPath = `${(window as any)?.publicPath ?? '/'}`;
const THEME_PATH = {
  light: publicPath + 'theme/light.css', // 亮色
  dark: publicPath + 'theme/dark.css', // 暗色
};
const THEME_PATH_MAP = {
  light: THEME_PATH.light, // 亮色
  dark: THEME_PATH.dark, // 暗色
  red: THEME_PATH.light, // 亮色
  green: THEME_PATH.dark, // 暗色
};

export default () => {
  const intl = useIntl();
  const location = useLocation();
  const actionRef = useRef();
  const { setGlobal, global } = useModel('global');
  const staticState = useStaticState({
    collapsedTimer: null,
  });
  const [state, setState] = useTRState({
    themePath: '',
  });

  useEffect(() => {
    onInitialization();
  }, []);

  const onInitialization = () => {
    let url = (location.pathname ?? '').replace(/^\/web/, '');
    if (url.indexOf('?') > 0) {
      url = url.replace(/\?.*$/, '');
    }
    setGlobal({ pathname: url });
  };

  const onCollapse = (collapsed: boolean) => setGlobal({ collapsed });

  useEffect(() => {
    if (staticState.collapsedTimer) return;
    staticState.collapsedTimer = setTimeout(() => {
      emitter.emit('__onChangeMnue__', global.collapsed);
      clearTimeout(staticState.collapsedTimer);
      staticState.collapsedTimer = null;
    }, 200);
  }, [global.collapsed]);

  useExternal(state.themePath);

  useEffect(() => {
    const _themePath = THEME_PATH_MAP?.[global.theme] ?? THEME_PATH_MAP.light;
    const htmlElement = window.document.querySelector('html');
    htmlElement?.setAttribute('data-type-color', global.theme);
    setState({ themePath: _themePath });
  }, [global.theme]);
  return (
    <ThemeProvider
      appearance={global.theme}
      theme={() => applyTheme(global.themeOptions)}
    >
      <ProLayout
        siderWidth={200} // 菜单收起宽度是无法自定义
        locale={global.locale}
        pure={false}
        breakpoint={false}
        collapsed={global.collapsed}
        onCollapse={onCollapse}
        actionRef={actionRef}
        suppressSiderWhenMenuEmpty={false} //在菜单为空时隐藏 Sider
        className={styles.layout}
        formatMessage={(data) =>
          intl.formatMessage({
            id: `${data.id}`,
          })
        }
        menu={{
          locale: true,
          request: async () => {
            await abortableDelay(1000);
            return [
              {
                name: 'home',
                path: '/home',
              },
              {
                name: 'middleware',
                path: '/middleware',
              },
              {
                name: 'strategy',
                path: '/strategy',
              },
              {
                name: 'access',
                path: '/access',
              },
              {
                name: 'table',
                path: '/table',
              },
              {
                name: 'historyDataQuery',
                path: '/historyDataQuery',
              },
              {
                name: 'stationInfo',
                path: '/stationInfo',
              },
              {
                name: 'FICCStatistics',
                path: '/FICCStatistics',
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
          },
        }}
        location={{ pathname: global.pathname }}
        contentStyle={{ padding: '0' }}
        menuItemRender={(item: MenuDataItem, dom) => {
          return (
            <a
              onClick={() => {
                history.push(item.path as string);
                setGlobal({ pathname: item.path });
              }}
            >
              {dom}
            </a>
          );
        }}
        logo={logo}
        title={DEFAULT_NAME}
        menuFooterRender={({ collapsed }: any) => {
          return (
            <Fragment>
              <Divider />
              <Flex
                {...(collapsed
                  ? { vertical: true }
                  : { vertical: false, justify: 'space-around' })}
                gap="small"
                style={{ width: '100%' }}
                align="center"
              >
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
                <Switch
                  checkedChildren="黑"
                  unCheckedChildren="白"
                  value={global.theme === 'dark'}
                  onChange={(checked) =>
                    setGlobal({ theme: checked ? 'dark' : 'light' })
                  }
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
            </Fragment>
          );
        }}
      >
        <Outlet />
      </ProLayout>
    </ThemeProvider>
  );
};
