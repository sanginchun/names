import { useRouter } from 'next/router';

interface Props<T> {
  key: string;
  defaultValue: T;
  shallow?: boolean;
}

const useUrlQuery = <T extends string>({
  key,
  defaultValue,
  shallow = false,
}: Props<T>) => {
  const router = useRouter();
  const value = decodeURI((router.query[key] as string) || defaultValue) as T;

  const updateQuery = (nextValue: T) => {
    router.push(
      { query: { ...router.query, [key]: encodeURI(nextValue) } },
      undefined,
      { shallow }
    );
  };

  return {
    value,
    updateQuery,
  };
};

export default useUrlQuery;
