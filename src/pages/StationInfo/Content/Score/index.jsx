import styles from './index.less';
import { ANumber } from '@/components';
import {
  RetweetOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from '@ant-design/icons';
import {
  Card,
  HistoryScore,
  ScoreInfo,
  Summarize,
} from '@/pages/StationInfo/components';
import cls from 'classnames';

const Score = ({ toggleScore, layout }) => {
  return (
    <section
      className={cls(styles.score, {
        [styles.score_full]: layout === 'scoreFull',
        [styles.score_unseen]: layout === 'infoFull',
      })}
    >
      <div className={styles.score_slide} onClick={toggleScore}>
        {layout === 'normal' ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </div>
      <div className={styles.info}>
        <div>
          <span className={styles.deptname}>大山台风电场</span>
          <div className={styles.area}>
            <span>北方大区</span>
            <span>晋北区域</span>
          </div>
        </div>
        <div className={styles.point}>
          综合评分
          <ANumber className={styles.point_value} value={88} />分
        </div>
      </div>
      <div className={styles.calc}>
        计算时间：<span>20240921 18:16:45</span>
        <div className={styles.calc_icon}>
          <RetweetOutlined />
          重新计算
        </div>
      </div>
      <Card
        config={{
          columnMap: {
            historyScore: {
              name: '历史评分',
              compontent: <HistoryScore />,
            },
            scoreInfo: { name: '评分详情', compontent: <ScoreInfo /> },
          },
          defaultKey: 'historyScore',
        }}
      />
      <Card style={{ flex: 1 }} title="体检报告总结">
        <Summarize />
      </Card>
    </section>
  );
};

export default Score;
