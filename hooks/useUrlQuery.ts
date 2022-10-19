import { useRouter } from 'next/router';

type QueryKeyValue = Record<string, string>;

interface Props {
  defaultValues: QueryKeyValue;
  shallow?: boolean;
}

interface KeyValue {
  key: string;
  value: string;
}

const useUrlQuery = ({ defaultValues, shallow = false }: Props) => {
  const router = useRouter();

  const parsedValues: QueryKeyValue = {};

  Object.keys(defaultValues).forEach((key) => {
    const value = decodeURI(
      (router.query[key] as string) || defaultValues[key]
    );

    parsedValues[key] = value;
  });

  const updateQuery = (query: KeyValue | Array<KeyValue>) => {
    const nextQuery = { ...router.query };

    if (Array.isArray(query)) {
      query.forEach(({ key, value }) => {
        nextQuery[key] = encodeURI(value);
      });
    } else {
      const { key, value } = query;
      nextQuery[key] = encodeURI(value);
    }

    router.push({ query: nextQuery }, undefined, { shallow });
  };

  return {
    parsedValues,
    updateQuery,
  };
};

export default useUrlQuery;
