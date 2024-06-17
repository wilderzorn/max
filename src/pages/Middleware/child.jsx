import { styled } from '@umijs/max';

const Child = () => {
  const DarkSupportBaseTable = styled(TRSpan)`
    background-color: var(--fail);
  `;

  return <DarkSupportBaseTable>Hello World!</DarkSupportBaseTable>;
};
export default Child;

const TRSpan = ({ className, children }) => {
  return <span className={className}>{children}</span>;
};
