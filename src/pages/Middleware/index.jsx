import { useEffect } from 'react';
import styles from './index.less';
import { useTRState, useStaticState } from '#/utils/trHooks';
import _ from 'lodash';
import { styled } from '@umijs/max';
import Child from './child';

const Middleware = () => {
  const [state, setState] = useTRState({
    loading: true,
  });
  const staticState = useStaticState({
    deviceObj: {},
  });

  useEffect(() => {
    onHandleData();
    () => () => {
      staticState.deviceObj = {};
    };
  }, []);
  const onHandleData = () => {};

  const onTreeData = (list, orderList = []) => {
    const treeData = [];
    list.forEach((j) => {
      const child = [...(j?.children ?? [])];
      const childList = onTreeData(child ?? [], orderList);
      if (!child?.length) {
        orderList.push(j.title);
      }
      treeData.push({
        title: j.title,
        key: j.title,
        children: childList?.treeData ?? [],
      });
    });
    return { treeData, orderList };
  };

  const Wrapper = styled.span`
    background-color: var(--fail);
  `;

  return (
    <div className={styles.container}>
      <Wrapper>123123213</Wrapper>
      <Child />
    </div>
  );
};
export default Middleware;
