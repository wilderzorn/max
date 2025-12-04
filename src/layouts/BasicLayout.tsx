import { useStaticState, useTRState } from '#/hooks/trHooks';
import applyTheme from '#/resource/applyTheme';
import abortableDelay from '#/utils/abortableDelay';
import { setAuthorization } from '#/utils/authority';
import emitter from '#/utils/emitter';
import { DEFAULT_NAME } from '@/constants';
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
import { Button, ColorPicker, Divider, Flex, Switch } from 'antd';
import { ThemeProvider } from 'antd-style';
import { Fragment, useEffect, useRef } from 'react';
import logo from '../../public/logo.png';
import styles from './index.less';

export default () => {
  const intl = useIntl();
  const location = useLocation();
  const actionRef = useRef();
  const { setGlobal, global } = useModel('global');
  const staticState = useStaticState({
    collapsedTimer: null,
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

  useEffect(() => {
    const htmlElement = window.document.querySelector('html');
    htmlElement?.setAttribute('data-type-color', global.theme);
  }, [global.theme]);

  return (
    <ThemeProvider
      appearance={global.theme}
      theme={() => applyTheme(global.themeOptions)}
    >
      <ProLayout
        siderWidth={200} // 菜单收起宽度是无法自定义
        locale={global.locale as 'zh-CN' | 'en-US'}
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
