import abortableDelay from '#/utils/abortableDelay';

export const onSlideDisabled = (
  disabled,
  disabledObj,
  disabledUniteObj,
  record,
  isHas,
) => {
  if (disabled) return disabled;
  if (disabledObj && record) {
    return !(disabledObj?.values ?? []).includes(record?.[disabledObj?.key]);
  }
  if (disabledUniteObj && record) {
    return Object.keys(disabledUniteObj).some((key) => {
      return !(disabledUniteObj[key].values ?? []).includes(record[key]);
    });
  }
  return disabled;
};

export const checkFieldsEquality = (obj1, obj2, keys = []) => {
  const leng = keys.length - 1;
  const values1 = Object.values(_.pick(obj1, keys));
  const values2 = Object.values(_.pick(obj2, keys));

  const commonValues = new Set(
    values1.filter((value1, index) => deepEqual(value1, values2[index])),
  );
  return commonValues.size >= leng;
};

export const deepEqual = (value1, value2) => {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return _.intersection(value1, value2).length > 0;
  } else {
    return value1 === value2;
  }
};

// 判断对象的指定字段是否存在且不为 null 或者 undefined
export const hasValue = (obj, ...fields) => {
  return fields.every(
    (field) => obj.hasOwnProperty(field) && !_.isEmpty(obj[field]),
  );
};

// 环境因素过滤 筛选特殊判断
export const checkFieldsAsset = (obj1, obj2, keys = []) => {
  if (obj1?.temperatureCalc !== obj2?.temperatureCalc) return false;
  return checkFieldsEquality(obj1, obj2, keys);
};
export const AREA = {
  SOUTH: '南方集控中心',
  NORTH: '北方集控中心',
  NORTH_WEST: '西北集控中心',
  CENTRAL: '云集控',
};

export const AREA_TYPE = {
  [AREA.SOUTH]: 'south',
  [AREA.NORTH]: 'north',
  [AREA.NORTH_WEST]: 'northwest',
  [AREA.CENTRAL]: 'centralizedControl',
};

const scrollTo = (element, start, end, duration) => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const easeProgress = easeInOutQuad(progress);
      const currentScroll = start + (end - start) * easeProgress;
      element.scrollTop = currentScroll;
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(animateScroll);
  });
};

let controller = null;
/**
 * 滚动元素。
 * @param {Element} element 需要滚动的元素。
 * @param {number} containerHeight 容器的高度。
 * @param {number} listHeight 列表或内容的高度。
 */
export const scrollToEnd = async (element, containerHeight, listHeight) => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  try {
    if (!containerHeight || listHeight <= containerHeight) return;
    if (!element) return;
    await abortableDelay(50, { signal: controller.signal });
    const currentOffset = element.scrollTop;
    await scrollTo(element, currentOffset, listHeight, 300); // 500ms duration
    controller = null;
  } catch (error) {
    controller = null;
  }
};
