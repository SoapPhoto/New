import qs from 'qs';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useUrlQuery() {
  const location = useLocation();
  const query = useMemo(() => qs.parse(location.search, { ignoreQueryPrefix: true }), [location.search]);
  return query;
}
