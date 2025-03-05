import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import styles from './index.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import cls from 'classnames';

interface CalendarProps {
  disabledDate?: (date: Moment) => boolean;
  handleOpenChange: (
    open: boolean,
    _start: Moment | null,
    _end: Moment | null,
  ) => void;
  tempStartDate: Moment | null;
  setTempStartDate: (date: Moment | null) => void;
  tempEndDate: Moment | null;
  setTempEndDate: (date: Moment | null) => void;
}

const WEEK_DAYS = ['一', '二', '三', '四', '五', '六', '日'];

const Calendar: React.FC<CalendarProps> = ({
  disabledDate,
  handleOpenChange,
  tempStartDate,
  setTempStartDate,
  tempEndDate,
  setTempEndDate,
}) => {
  const [hoveredDate, setHoveredDate] = useState<Moment | null>(null);
  const [leftMonth, setLeftMonth] = useState(moment());
  const [rightMonth, setRightMonth] = useState(moment().add(1, 'month'));

  useEffect(() => {
    if (tempStartDate && tempEndDate) {
      setLeftMonth(tempStartDate);
      if (tempEndDate.isSame(tempStartDate, 'month')) {
        setRightMonth(tempEndDate.clone().add(1, 'month'));
      } else {
        setRightMonth(tempEndDate.clone());
      }
      setHoveredDate(tempEndDate);
    }
  }, []);

  const generateDays = (month: Moment, targetRows?: number) => {
    const start = month.clone().startOf('month').startOf('week');
    let end = month.clone().endOf('month').endOf('week');

    // 如果需要调整行数
    if (targetRows !== undefined) {
      const currentRows = Math.ceil(end.diff(start, 'days') / 7);
      const additionalDays = (targetRows - currentRows) * 7;
      end.add(additionalDays, 'days');
    }

    const days: Moment[] = [];
    let current = start.clone();
    while (current.isBefore(end) || current.isSame(end)) {
      days.push(current.clone());
      current.add(1, 'day');
    }
    return days;
  };

  const getRowCount = (month: Moment) => {
    const start = month.clone().startOf('month').startOf('week');
    const end = month.clone().endOf('month').endOf('week');
    return Math.ceil(end.diff(start, 'days') / 7); // 计算行数
  };

  const isInRange = (date: Moment) => {
    if (tempStartDate && hoveredDate) {
      return (
        (date.isAfter(tempStartDate) && date.isBefore(hoveredDate)) ||
        (tempStartDate.isAfter(date) && hoveredDate.isBefore(date))
      );
    }
    return false;
  };

  const handleDateClick = (date: Moment) => {
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(date); // 临时设置开始日期
      setTempEndDate(null);
    } else {
      if (date.isBefore(tempStartDate)) {
        setTempEndDate(tempStartDate);
        setTempStartDate(date);
      } else {
        setTempEndDate(date);
      }
      handleOpenChange(
        false,
        tempStartDate.isBefore(date) ? tempStartDate : date,
        tempStartDate.isBefore(date) ? date : tempStartDate,
      );
    }
  };

  const handleHover = (date: Moment, event: React.MouseEvent) => {
    setHoveredDate(date);
  };

  const handleLeftMonthChange = (delta: number) => {
    const newLeftMonth = leftMonth.clone().add(delta, 'month');
    // 确保左侧月份不超过右侧月份的前一个月
    if (newLeftMonth.isBefore(rightMonth, 'month')) {
      setLeftMonth(newLeftMonth);
    }
  };

  const handleRightMonthChange = (delta: number) => {
    const newRightMonth = rightMonth.clone().add(delta, 'month');
    // 确保右侧月份不早于左侧月份的下一个月
    if (newRightMonth.isAfter(leftMonth, 'month')) {
      setRightMonth(newRightMonth);
    }
  };

  return (
    <div className={styles.calendarPopup}>
      <div className={styles.calendarContainer}>
        {(() => {
          const leftRows = getRowCount(leftMonth); // 左侧日历行数
          const rightRows = getRowCount(rightMonth); // 右侧日历行数
          const maxRows = Math.max(leftRows, rightRows); // 最大行数

          return (
            <>
              {/* 左侧日历 */}
              <div className={styles.calendar}>
                <div className={styles.header}>
                  <LeftOutlined onClick={() => handleLeftMonthChange(-1)} />
                  <span className={styles.yearMonth}>
                    {leftMonth.format('YYYY年MM月')}
                  </span>
                  <RightOutlined onClick={() => handleLeftMonthChange(1)} />
                </div>
                <div className={styles.weekdays}>
                  {WEEK_DAYS.map((day) => (
                    <div key={day} className={styles.weekday}>
                      {day}
                    </div>
                  ))}
                </div>
                <div className={styles.days}>
                  {generateDays(leftMonth, maxRows).map((day) => (
                    <td
                      key={day.toISOString()}
                      className={cls(styles.dayCell, {
                        [styles.inRange]: isInRange(day),
                        [styles.start]: day.isSame(tempStartDate, 'day'),
                        [styles.end]: day.isSame(tempEndDate, 'day'),
                        [styles.otherMonth]: day.month() !== leftMonth.month(),
                        [styles.today]: day.isSame(moment(), 'day'),
                        [styles.hovered]: day.isSame(hoveredDate, 'day'),
                        [styles.disabled]: disabledDate?.(day),
                        [styles.selected]:
                          day.isSame(tempStartDate, 'day') ||
                          day.isSame(tempEndDate, 'day'),
                      })}
                    >
                      <div
                        className={styles.day}
                        onClick={() =>
                          !disabledDate?.(day) && handleDateClick(day)
                        }
                        onMouseOver={(e) => handleHover(day, e)}
                      >
                        {day.date()}
                      </div>
                    </td>
                  ))}
                </div>
              </div>
              {/* 右侧日历 */}
              <div className={styles.calendar}>
                <div className={styles.header}>
                  <LeftOutlined onClick={() => handleRightMonthChange(-1)} />
                  <span className={styles.yearMonth}>
                    {rightMonth.format('YYYY年MM月')}
                  </span>
                  <RightOutlined onClick={() => handleRightMonthChange(1)} />
                </div>
                <div className={styles.weekdays}>
                  {WEEK_DAYS.map((day) => (
                    <div key={day} className={styles.weekday}>
                      {day}
                    </div>
                  ))}
                </div>
                <div className={styles.days}>
                  {generateDays(rightMonth, maxRows).map((day) => (
                    <td
                      key={day.toISOString()}
                      className={cls(styles.dayCell, {
                        [styles.inRange]: isInRange(day),
                        [styles.start]: day.isSame(tempStartDate, 'day'),
                        [styles.end]: day.isSame(tempEndDate, 'day'),
                        [styles.otherMonth]: day.month() !== rightMonth.month(),
                        [styles.today]: day.isSame(moment(), 'day'),
                        [styles.hovered]: day.isSame(hoveredDate, 'day'),
                        [styles.disabled]: disabledDate?.(day),
                        [styles.selected]:
                          day.isSame(tempStartDate, 'day') ||
                          day.isSame(tempEndDate, 'day'),
                      })}
                    >
                      <div
                        className={styles.day}
                        onClick={() =>
                          !disabledDate?.(day) && handleDateClick(day)
                        }
                        onMouseOver={(e) => handleHover(day, e)}
                      >
                        {day.date()}
                      </div>
                    </td>
                  ))}
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
};

export default Calendar;
