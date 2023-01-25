import { useMemo, useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
// fuse.js
import Fuse from 'fuse.js';
// search
import { createIndex } from '../search';
import { useRouter } from 'next/router';

type SearchFilter<T> = {
  [Filter in keyof T]?: string | number | boolean | ((v: T) => boolean);
};

type UseSearchControllerProps<T> = {
  collection: string;
  input?: string | Fuse.Expression;
  filter?: SearchFilter<T>;
  data?: T[];
  options?: Fuse.IFuseOptions<T>;
};

export function useSearchController<T>({
  collection,
  input = '',
  data = [],
  options,
  filter,
}: UseSearchControllerProps<T>) {
  const [searchIndex, setSearchIndex] = useState<Fuse<T> | null>(null);

  const searchResult = useMemo(() => {
    let dataset = data;

    // aplly full text search
    if (searchIndex && !isEmpty(input)) {
      dataset = searchIndex.search(input).map(({ item }) => item);
    }

    // apply filters
    if (filter) {
      dataset = _applyFilter(dataset, filter);
    }

    return dataset;
  }, [data, input, searchIndex, filter]);

  useEffect(() => {
    createIndex(collection, data, options).then((index) => {
      setSearchIndex(index);
    });
  }, [options, data, collection]);

  return {
    results: searchResult,
    total: searchResult.length,
    loading: !searchIndex,
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
