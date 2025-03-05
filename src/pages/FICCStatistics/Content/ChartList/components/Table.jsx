import { VirtualTable } from './index';

const Table = ({ type }) => {
  return (
    <div style={{ width: '100%', background: '#292d37', padding: '16px' }}>
      <div>{type}</div>
      <VirtualTable type={type} enterType={'click'} />
    </div>
  );
};
export default Table;
