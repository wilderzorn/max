export const columnsRatio = (list: any = []) => {
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

export const columns = [
  {
    dataIndex: 'check',
    title: '123',
    width: 60,
    ellipsis: true,
  },
  {
    dataIndex: 'id',
    title: 'id',
    filter: true,
    flex: 1,
    ellipsis: true,
  },
  {
    dataIndex: 'username',
    title: '名称',
    filter: true,
    flex: 1,
    ellipsis: true,
  },
  {
    dataIndex: 'description',
    title: '描述',
    filter: true,
    flex: 1,
    ellipsis: true,
  },
  {
    dataIndex: 'type',
    title: '描述',
    filter: true,
    flex: 1,
    ellipsis: true,
  },
  {
    dataIndex: 'btns',
    title: '操作',
    width: 200,
    ellipsis: true,
    btns: [
      {
        label: '编辑',
        key: 'put',
      },
      {
        label: '删除',
        key: 'delete',
      },
    ],
  },
];
