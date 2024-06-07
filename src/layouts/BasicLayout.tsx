import { ProLayout } from '@ant-design/pro-components';
import { useRef, useEffect } from 'react';
import { Outlet, useModel, history } from '@umijs/max';
import type { MenuDataItem } from '@ant-design/pro-components';
import { Button, theme, Switch, ColorPicker, Flex } from 'antd';
import { setAuthorization } from '#/utils/authority';
import { useTRState, useStaticState } from '#/utils/trHooks.jsx';
import { useExternal } from 'ahooks';
import { ThemeProvider } from 'antd-style';
import styles from './index.less';
import { PoweroffOutlined } from '@ant-design/icons';
import logo from '../../public/logo.png';
import emitter from '#/utils/events';
// 存放固定的静态资源，如存放 public/image.png ，则开发时可以通过 /image.png 访问到，构建后会被拷贝到输出文件夹。
// import lightCss from './theme/light.css';
// import darkCss from './theme/dark.css';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

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
    setState({ themePath: _themePath });
  }, [global.theme]);

  return (
    <ThemeProvider
      appearance={global.theme}
      theme={(appearance) => {
        return {
          token: {
            colorPrimary: global?.themeColor ?? '#1677ff',
          },
          algorithm: appearance === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        };
      }}
    >
      <ProLayout
        pure={false}
        breakpoint={false}
        collapsed={global.collapsed}
        onCollapse={onCollapse}
        actionRef={actionRef}
        suppressSiderWhenMenuEmpty={false} //在菜单为空时隐藏 Sider
        className={styles.layout}
        menu={{
          request: async () => {
            await waitTime(1000);
            return [
              {
                path: '/home',
                name: '首页',
              },
              {
                name: '权限演示',
                path: '/access',
              },
              {
                name: '虚拟列表',
                path: '/table',
              },
              {
                name: '历史数据查询',
                path: '/historyDataQuery',
              },
              {
                name: '子项目',
                path: '/childWeb',
              },
              {
                name: '过渡',
                path: '/transition',
              },
            ];
          },
        }}
        location={{ pathname: global.pathname }}
        contentStyle={{
          paddingBlock: '0',
          paddingInline: '0',
        }}
        menuItemRender={(item: MenuDataItem, dom) => (
          <a
            onClick={() => {
              history.push(item.path as string);
              setGlobal({ pathname: item.path });
            }}
          >
            {dom}
          </a>
        )}
        logo={logo}
        menuFooterRender={({ collapsed }: any) => {
          return (
            <Flex
              {...(collapsed ? { vertical: true } : { vertical: false, justify: 'space-around' })}
              gap="small"
              style={{ width: '100%' }}
              align="center"
            >
              <Switch
                checkedChildren="黑"
                unCheckedChildren="白"
                value={global.theme === 'dark'}
                onChange={(checked) => setGlobal({ theme: checked ? 'dark' : 'light' })}
              />
              <ColorPicker
                value={global.themeColor}
                onChangeComplete={(color) => {
                  setGlobal({ themeColor: color.toHexString() });
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
          );
        }}
      >
        <Outlet />
      </ProLayout>
    </ThemeProvider>
  );
};
