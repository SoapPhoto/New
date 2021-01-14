import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'qs';

export default function useSearchParamModal(
  value: string,
  label: string = 'modal',
): [boolean, () => void, () => void] {
  const { state, search, pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const visible = useMemo(() => searchParams.get(label) === value, [
    label,
    searchParams,
    value,
  ]);
  const open = useCallback(() => {
    const query: qs.ParsedQs = qs.parse(search, { ignoreQueryPrefix: true });
    query[label] = value;
    navigate(`${pathname}?${qs.stringify(query)}`, {
      state: {
        [label]: value,
      },
    });
  }, [label, navigate, pathname, search, value]);
  const close = useCallback(() => {
    if (state && (state as any)[label] === value) {
      navigate(-1);
    } else {
      const query: qs.ParsedQs = qs.parse(search, { ignoreQueryPrefix: true });
      delete query[label];
      if (Object.keys(query).length === 0) {
        navigate(pathname);
      } else {
        navigate(`${pathname}?${qs.stringify(query)}`);
      }
    }
  }, [label, navigate, pathname, search, state, value]);
  return [visible, close, open];
}
