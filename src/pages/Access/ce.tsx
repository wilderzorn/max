import { Checkbox } from 'antd';
import { useTRState } from '#/hooks/trHooks';
import { useEffect } from 'react';

const Ce = ({ deptMap, onCheck, onUpdate }) => {
  const [state, setState] = useTRState({
    indeterminate: false,
    checked: false,
  });

  useEffect(() => {
    setState({
      checkAll: deptMap.size === 9,
      indeterminate: deptMap.size > 0 && deptMap.size < 9,
    });
  }, [deptMap.size]);

  const onCheckAllChange = (e) => {
    if (e.target.checked) {
      [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((j) => {
        deptMap.set(j, `1-${j}`);
      });
    } else {
      deptMap.clear();
    }
    onUpdate();
  };

  return (
    <div>
      <Checkbox
        checked={state.checkAll}
        indeterminate={state.indeterminate}
        onChange={onCheckAllChange}
      >
        全选
      </Checkbox>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((j) => {
        return (
          <Checkbox
            key={j}
            checked={deptMap.has(j)}
            onClick={() => {
              if (deptMap.has(j)) {
                deptMap.delete(j);
              } else {
                deptMap.set(j, `1-${j}`);
              }
              onUpdate();
              // onCheck(j);
            }}
          >
            {j}
          </Checkbox>
        );
      })}
    </div>
  );
};
export default Ce;
