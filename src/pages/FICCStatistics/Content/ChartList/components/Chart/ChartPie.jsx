import AChart from '@/components/AChart';
import PageLoading from '#/components/PageLoading';
import React, { useEffect, useState, useMemo } from 'react';
import useNotice from '#/hooks/useNotice';
import { PublicWindow, VirtualTable } from '../index';

const ChartPie = ({ title }) => {
  const [loading, setLoading] = useState(true);
  const [dataObj, setDataObj] = useState({});
  const [notice, NoticeContext] = useNotice();

  useEffect(() => {
    onFeachData();
  }, []);

  // TODO: fetch data from server
  const onFeachData = async () => {
    const obj = {};
    setTimeout(() => {
      [
        Math.floor(Math.random() * 100) + 1,
        Math.floor(Math.random() * 100) + 1,
        Math.floor(Math.random() * 100) + 1,
      ].forEach((n) => {
        obj[`类别${n}`] = {
          value: n,
          name: `类别${n}`,
        };
      });
      setDataObj(obj);
      setLoading(false);
    }, 1000);
  };

  const totalValue = useMemo(() => {
    return Object.values(dataObj).reduce((sum, item) => sum + item.value, 0);
  }, [dataObj]);

  const onChartClick = async (params) => {
    await notice.open(PublicWindow, {
      Component: VirtualTable,
      title,
    });
  };

  if (loading) return <PageLoading />;
  return (
    <div>
      {NoticeContext}
      <AChart
        onChartClick={onChartClick}
        option={{
          title: {
            text: title,
            left: 'center',
            top: 10,
            textStyle: {
              fontSize: 18,
              color: '#fff',
            },
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: 10,
            left: 'center',
            itemGap: 16,
            itemWidth: 8,
            itemHeight: 6,
            textStyle: {
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 10, // 文字行高
            },
            icon: 'rect',
            data: Object.keys(dataObj),
          },
          series: [
            {
              type: 'pie',
              radius: '70%',
              data: Object.values(dataObj),
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
              label: {
                formatter: function (params) {
                  const percentage = (
                    (params.value / totalValue) *
                    100
                  ).toFixed(2);
                  return `${percentage}%`;
                },
                position: 'inside', // 尝试在内部显示
                overflow: 'break', // 允许文本换行
                show: true,
              },
              labelLine: {
                show: true, // 显示连接线
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
            },
          ],
        }}
      />
    </div>
  );
};
export default ChartPie;
