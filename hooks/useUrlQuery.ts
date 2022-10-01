import { useRouter } from 'next/router';

type QueryKeyValue = Record<string, string>;

interface Props {
  defaultValues: QueryKeyValue;
  shallow?: boolean;
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

  const updateQuery = ({ key, value }: { key: string; value: string }) => {
    router.push(
      {
        query: { ...router.query, [key]: encodeURI(value) },
      },
      undefined,
      { shallow }
    );
  };

  return {
    parsedValues,
    updateQuery,
  };
};

export default useUrlQuery;
