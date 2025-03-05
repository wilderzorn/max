export const dataList = Array(100).fill({
  lineName: '惯线名称',
  assetname: '设备名称',
  modelname: '型号名称',
  countTime: '2023.05.01 00:00:00 - 2023.05.01 00:00:00',
  power: '2344',
  theoryPower: '33',
  reverseActivePower: '123',
  reverseActivePowerDiff: '2',
  forwardActivePower: '44',
  forwardActivePowerDiff: '33',
});
export const columnsRatio = (list = []) => {
  let nu = 0;
  let nw = 0;
  list.forEach((j) => {
    if (j.flex) {
      nu = nu + (j.flex ?? 1);
    }
    if (j.width) {
      nw = nw + (j.width ?? 0);
    }
  });
  return {
    nw,
    nu: Math.max(1, nu),
  };
};
