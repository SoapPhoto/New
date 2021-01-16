import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { isBoolean } from 'lodash';

type Callback = (replace?: boolean) => void;

export default function useSearchParamModal(
  value: string,
  label: string = 'modal',
): [boolean, Callback, Callback] {
  const { state, search, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const visible = useMemo(() => searchParams.get(label) === value, [
    label,
    searchParams,
    value,
  ]);
  const open = useCallback(
    (replace?: boolean) => {
      const query: qs.ParsedQs = qs.parse(search, { ignoreQueryPrefix: true });
      query[label] = value;
      navigate(`${pathname}?${qs.stringify(query)}`, {
        state: {
          [label]: value,
        },
        replace: isBoolean(replace) ? replace : false,
      });
    },
    [label, navigate, pathname, search, value],
  );
  const close = useCallback(
    (replace?: boolean) => {
      const isReplace = isBoolean(replace) && replace;
      if (state && (state as any)[label] === value && !isReplace) {
        navigate(-1);
      } else {
        const query: qs.ParsedQs = qs.parse(search, {
          ignoreQueryPrefix: true,
        });
        delete query[label];
        if (Object.keys(query).length === 0) {
          navigate(pathname, {
            replace: isReplace,
          });
        } else {
          navigate(`${pathname}?${qs.stringify(query)}`, {
            replace: isReplace,
          });
        }
      }
    },
    [label, navigate, pathname, search, state, value],
  );
  return [visible, close, open];
}
