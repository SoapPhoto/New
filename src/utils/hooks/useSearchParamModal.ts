import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function useSearchParamModal(
  value: string,
  label: string = 'modal',
): [boolean, () => void, () => void] {
  const routerLocation = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const visible = useMemo(() => searchParams.get(label) === value, [
    label,
    searchParams,
    value,
  ]);
  const open = useCallback(() => {
    setSearchParams(
      { [label]: value },
      {
        state: {
          [label]: value,
        },
      },
    );
  }, [label, setSearchParams, value]);
  const close = useCallback(() => {
    if (
      routerLocation.state &&
      (routerLocation.state as any)[label] === value
    ) {
      navigate(-1);
    } else {
      navigate('.');
    }
  }, [label, navigate, routerLocation.state, value]);
  return [visible, close, open];
}
