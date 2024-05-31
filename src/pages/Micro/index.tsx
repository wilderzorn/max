import { MicroApp, useLocation } from '@umijs/max';
import { MICRO_CONFIG } from './helper';
const Micro = () => {
  const location = useLocation();
  const searchStr =
    location.search?.[0] === '?' ? location.search.substring(1) : location.search || '';

  const url = (location.pathname ?? '').replace('/web', '');

  const config = MICRO_CONFIG[url];

  return (
    <MicroApp
      {...config}
      url={`${config.url}${searchStr.length > 0 ? '?' : ''}${searchStr}`}
      settings={{
        singular: true,
        sandbox: {
          strictStyleIsolation: false,
          experimentalStyleIsolation: false,
          loose: true,
        },
      }}
    />
  );
};
export default Micro;
