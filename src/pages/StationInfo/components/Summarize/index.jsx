import styles from './index.less';

const Summarize = () => {
  return (
    <div className={styles.summarize}>
      <div className={styles.title}>
        本报告利用scada7s数据、测风塔数据、微观选址报告等资料对莱芜一、二期风电场进行体检，检查时间范围为2021年6月至2022年5月，共计10个检查项，涉及中控数据采集系统、偏航系统、变桨系统、发电机系统、主控系统，评估了机组对风情况、发电性能。该风场整体状态良好，除以下问题外，未发现明显影响发电性能的问题点，具体问题如下：
      </div>
      <div className={styles.point}>异常状态检查方面：</div>
      <div className={styles.content}>
        <div>
          1.一期风场（#53-#85，GW87-1500）#56、#58、#59、#62-#66、#68、#71-#75、#77-#79、#82-#85
          共计20台机组无加脂动作，请现场确认机组在近期是否存在实际加脂动作；
        </div>
        <div>
          2.环控除湿加热请求动作一、二期风场集中高频发生在6、7、8、9
          4个月份，其中一期集中在#61-#71号机组以及#73-#85，二期集中在#21-#30机组，存在季节性潜在影响；
        </div>
        <div>
          3.二期风场#38机组,于2022-04-24 13:46:55
          停机，偏航加脂46小时，造成直接损失电量8716.78
          kWh，主要原因为环控传感器失效。
        </div>
      </div>
      <div className={styles.point}>对风分布异常检查方面：</div>
      <div className={styles.content}>
        <div>
          #45、#50
          两台机组在21年10月份开始对风分布规律与前期不同，查询备件更换记录仅发现#45(B25#)机组于2021-11-7更换了风向标，但#50(B30#)机组仅在2020-11-21更换了风向标，未查询到21年11月份更换记录，请现场确认是否漏失记录。
        </div>
        <div>
          #45、#50
          两台机组在21年10月份开始对风分布规律与前期不同，查询备件更换记录仅发现#45(B25#)机组于2021-11-7更换了风向标，但#50(B30#)机组仅在2020-11-21更换了风向标，未查询到21年11月份更换记录，请现场确认是否漏失记录。
        </div>
      </div>
    </div>
  );
};
export default Summarize;
