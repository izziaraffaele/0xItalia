import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
// fuse.js
import Fuse from 'fuse.js';
// next
import { useRouter } from 'next/router';
// config
import { SEARCH } from '../config';

type SearchFilter<T> = {
  [Filter in keyof T]?: string | number | boolean | ((v: T) => boolean);
};

type UseSearchControllerProps<T> = {
  input?: string | Fuse.Expression;
  filter?: SearchFilter<T>;
  data?: T[];
  options?: Fuse.IFuseOptions<T>;
  cache?: unknown;
};

export function useSearchController<T>({
  cache,
  input = '',
  data = [],
  options,
  filter,
}: UseSearchControllerProps<T>) {
  const indexCache = useMemo(() => Fuse.parseIndex(cache), [cache]);

  const fuse = useMemo(
    () => new Fuse(data, { ...SEARCH, ...options }, indexCache),
    [indexCache, data, options]
  );

  const searchResult = useMemo(() => {
    let dataset = data;

    // aplly full text search
    if (!isEmpty(input)) {
      dataset = fuse.search(input).map(({ item }) => item);
    }

    // apply filters
    if (filter) {
      dataset = _applyFilter(dataset, filter);
    }

    return dataset;
  }, [data, input, fuse, filter]);

  return {
    results: searchResult,
    total: searchResult.length,
  };
}

export type UseSearchInputProps = { defaultValue?: string };

export function useSearchInput(props: UseSearchInputProps = {}) {
  const { query } = useRouter();

  const defaultValue = useMemo(() => props?.defaultValue || '', [props]);

  return useMemo(() => {
    if (typeof window === 'undefined' || !query.search) {
      return defaultValue;
    }

    return String(query.search);
  }, [query]);
}

// ----------------------------------------------------------------------

function _applyFilter<T>(data: T[], filter: SearchFilter<T>) {
  let results = data;

  (Object.keys(filter) as (keyof T)[]).forEach((key) => {
    const filterValue = filter[key];

    if (isEmpty(filterValue)) {
      return;
    }

    if (typeof filterValue === 'function') {
      results = results.filter((item) => filterValue(item));
    } else {
      results = results.filter((item) => isEqual(item[key], filterValue));
    }
  });

  return results;
}
