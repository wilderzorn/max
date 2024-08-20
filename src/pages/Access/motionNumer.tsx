import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

export default ({
  className = '',
  value = 0,
  onClick = () => {},
  duration = 1000,
}) => {
  return (
    <TweenOne
      style={{ color: 'red' }}
      className={className}
      onClick={onClick}
      animation={{
        Children: {
          value: Number(value) || 0,
          floatLength: 0,
        },
        duration,
      }}
    >
      0
    </TweenOne>
  );
};
