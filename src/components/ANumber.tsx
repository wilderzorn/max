import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

export default (props) => {
  const { value = 0, floatLength = 0, className, style } = props;

  return (
    <TweenOne
      style={style}
      className={className}
      animation={{
        Children: {
          value: Number(value) || 0,
          floatLength,
        },
        duration: 1000,
      }}
    >
      0
    </TweenOne>
  );
};
