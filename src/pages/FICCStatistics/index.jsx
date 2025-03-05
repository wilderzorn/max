import { useTRState } from '#/hooks/trHooks';
import styles from './index.less';
import SHeader from './SHeader';
import PageLoading from '#/components/PageLoading';
import React, { useEffect } from 'react';
import { getAllDept } from '@/services/strategy';
import Content from './Content';
import dayjs from 'dayjs';

const FICCStatistics = () => {
  const [state, setState] = useTRState({
    loading: true,
    stations: [],
    filterObj: {
      deptNums: ['01001001', '01003080'],
      time: [dayjs().subtract(7, 'day'), dayjs()],
    },
    collapsed: false,
  });

  useEffect(() => {
    onFeachData();
  }, []);

  const onFeachData = async () => {
    const res = await getAllDept();
    setState({ loading: false, stations: res.data });
  };

  if (state.loading) return <PageLoading />;
  return (
    <div className={styles.container}>
      <SHeader state={state} setState={setState} />
      <Content state={state} setState={setState} />
    </div>
  );
};
export default FICCStatistics;
