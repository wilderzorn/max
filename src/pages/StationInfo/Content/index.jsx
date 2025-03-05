import styles from './index.less';
import Score from './Score';
import Info from './Info';
import { useState, useEffect } from 'react';
import PageLoading from '#/components/PageLoading';
import { waitTime } from '#/utils/utils';

const Content = ({ state, setState }) => {
  const [layout, setLayout] = useState('normal');

  const toggleScore = () => {
    setLayout(layout === 'scoreFull' ? 'normal' : 'scoreFull');
  };
  const toggleInfo = () => {
    setLayout(layout === 'infoFull' ? 'normal' : 'infoFull');
  };

  useEffect(() => {
    onFeachData();
  }, [state.params]);

  const onFeachData = async () => {
    const { deptNum, time } = state.params;
    if (!deptNum || !time) return;
    setState({ contentLoading: true });
    await waitTime(2000);
    setState({ contentLoading: false });
  };

  if (state.contentLoading) return <PageLoading />;
  return (
    <div
      className={styles.content}
      style={{ gap: layout === 'normal' ? '8px' : '0px' }}
    >
      <Score toggleScore={toggleScore} layout={layout} />
      <Info toggleInfo={toggleInfo} layout={layout} />
    </div>
  );
};

export default Content;
