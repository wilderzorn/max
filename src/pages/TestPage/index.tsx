import { useStaticState, useTRState } from '#/hooks/trHooks';
import useNotice from '#/hooks/useNotice';
import { useEffect, useState, useMemo, useRef } from 'react';
// import { useUpdate, useSize } from 'ahooks';
import styles from './index.less';
import _ from 'lodash';
import { Input, Button, Form, Modal, Select, Tree } from 'antd';
import { asset } from './helper';
import usePLoading from '#/hooks/usePLoading';

const TestPage = () => {
  const [{ showLoading, hideLoading }, LoadingProvider] = usePLoading();
  // const update = useUpdate();
  // const staticState = useStaticState({});
  const [state, setState] = useTRState({
    treeData: [],
    selectedKeys: [],
  });
  useEffect(() => {
    onFeacData();
  }, []);

  const onFeacData = () => {};

  return (
    <div className={styles.conent}>
      {LoadingProvider}
      <Button
        onClick={() => {
          showLoading();
          setTimeout(() => {
            hideLoading();
          }, 3000);
        }}
      >
        显示加载
      </Button>
    </div>
  );
};
export default TestPage;
