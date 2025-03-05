import React, { useRef, useState } from 'react';
import { Moment } from 'moment';
import styles from './index.less';
import Calendar from './calendar';
import { Input, Popover } from 'antd';
import {
  SwapRightOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

interface RangePickerProps {
  disabledDate?: (date: Moment) => boolean;
  onChange?: (dates: [Moment, Moment] | []) => void;
  value?: [Moment, Moment] | undefined;
  allowClear?: boolean;
}

const RangePicker: React.FC<RangePickerProps> = ({
  disabledDate,
  onChange,
  value,
  allowClear = true,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<Moment | null>(value?.[0] ?? null);
  const [endDate, setEndDate] = useState<Moment | null>(value?.[1] ?? null);
  const [tempStartDate, setTempStartDate] = useState<Moment | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Moment | null>(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const displayValue = (type: 'start' | 'end') => {
    let date: Moment | null = null;
    if (open) {
      date = type === 'start' ? tempStartDate : tempEndDate;
    } else {
      date = type === 'start' ? startDate : endDate;
    }
    return date ? date.format('YYYY-MM-DD') : undefined;
  };

  const handleOpenChange = (
    newOpen: boolean,
    _start: Moment | null = null,
    _end: Moment | null = null,
  ) => {
    if (newOpen) {
      setTempStartDate(startDate);
      setTempEndDate(endDate);
    } else {
      if (_start && _end) {
        // 当弹窗关闭时，将临时值设为最终值
        setStartDate(_start);
        setEndDate(_end);
        onChange?.([_start, _end]);
      }
    }
    setOpen(newOpen);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(null);
    setEndDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    setOpen(false);
    if (onChange) {
      onChange([null, null]);
    }
  };

  return (
    <Popover
      placement="bottomLeft"
      overlayInnerStyle={{ padding: 0 }}
      arrow={false}
      open={open}
      onOpenChange={(newOpen) => handleOpenChange(newOpen)}
      destroyTooltipOnHide={true}
      content={
        <Calendar
          disabledDate={disabledDate}
          handleOpenChange={handleOpenChange}
          tempStartDate={tempStartDate}
          setTempStartDate={setTempStartDate}
          tempEndDate={tempEndDate}
          setTempEndDate={setTempEndDate}
        />
      }
      trigger="click"
    >
      <div className={styles.picker} ref={pickerRef}>
        <Input
          value={displayValue('start')}
          placeholder="开始时间"
          readOnly
          variant={'borderless'}
        />
        <SwapRightOutlined />
        <Input
          value={displayValue('end')}
          placeholder="结束时间"
          readOnly
          variant={'borderless'}
        />
        {allowClear ? (
          <CalendarOutlined
            style={{ cursor: 'pointer', color: 'var(--border-color)' }}
          />
        ) : (
          <>
            {hovered ? (
              <CloseCircleOutlined
                onClick={handleClear}
                onMouseLeave={() => setHovered(false)}
                style={{ cursor: 'pointer', color: 'var(--border-color)' }}
              />
            ) : (
              <CalendarOutlined
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ cursor: 'pointer', color: 'var(--border-color)' }}
              />
            )}
          </>
        )}
      </div>
    </Popover>
  );
};

export default RangePicker;
