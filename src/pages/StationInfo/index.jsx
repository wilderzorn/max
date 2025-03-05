import styles from './index.less';
import { useTRState } from '#/hooks/trHooks';
import SHeader from './SHeader';
import Content from './Content';
import PageLoading from '#/components/PageLoading';
import { useEffect } from 'react';
import { waitTime } from '#/utils/utils';

const StationInfo = () => {
  const [state, setState] = useTRState({
    loading: true,
    stations: [],
    params: {},
    contentLoading: false,
  });

  useEffect(() => {
    onFeach();
  }, []);

  const onFeach = async () => {
    await waitTime(2000);
    setState({
      loading: false,
      stations: [
        {
          deptName: '大山台风电场',
          deptNum: '01001001',
        },
        {
          deptName: '王庙瑞风风电场',
          deptNum: '01003080',
        },
      ],
    });
  };

  if (state.loading) return <PageLoading />;
  return (
    <div className={styles.container}>
      <SHeader state={state} setState={setState} />
      <Content state={state} setState={setState} />
    </div>
  );
};
export default StationInfo;
