import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';
import TREmpty from '#/components/TREmpty';

const AccessPage: React.FC = () => {
  const access = useAccess();
  React.useEffect(() => {
    onFeach();
  }, []);

  const onFeach = () => {
    const roleData = [
      {
        label: '1',
        value: [1],
      },
      {
        label: '2',
        value: [2],
      },
      {
        label: '3',
        value: [3],
      },
      {
        label: '4',
        value: [4],
      },
    ];
    const roleCheckList = [[2], [3]];

    roleData.forEach((role) => {
      const isIncluded = roleCheckList.some(
        (checkValue) => JSON.stringify(checkValue) === JSON.stringify(role.value),
      );
      // console.log(`标签为 ${role.label} 的角色${isIncluded ? '' : '不'}包含在 roleCheckList 中`);
    });
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <TREmpty />
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
