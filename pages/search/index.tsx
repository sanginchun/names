import Link from 'next/link';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import {
  Segment,
  Table,
  Button,
  Input,
  Message,
  Placeholder,
} from 'semantic-ui-react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import useUrlQuery from '../../hooks/useUrlQuery';

const GENDER_TYPES: Gender[] = ['M', 'F'];
const DEFAULT_GENDER: Gender = 'M';

const SearchPage = () => {
  const { parsedValues, updateQuery } = useUrlQuery({
    defaultValues: { gender: DEFAULT_GENDER, searchTerm: '' },
  });

  const gender = parsedValues['gender'] as Gender;
  const searchTerm = parsedValues['searchTerm'] as string;

  const [genderInput, setGenderInput] = useState<Gender>(gender);
  const [searchInput, setSearchInput] = useState(searchTerm);

  const [message, setMessage] = useState('검색어를 입력하세요');
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageWarning, setIsMessageWarning] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const getHandleGenderChange = (gender: Gender) => () => {
    setGenderInput(gender);
  };

  const handleSubmitSearch = async () => {
    if (searchInput.length === 0) {
      setMessage('검색어를 입력하세요');
      setIsMessageWarning(true);
      return;
    }

    if (searchInput.length > 2) {
      setMessage('두 글자 이하로만 검색할 수 있습니다');
      setIsMessageWarning(true);
      return;
    }

    if (
      !searchInput.split('').every((v) => v.match(/[가-힣|ㄱ-ㅎ]/g) !== null)
    ) {
      setMessage('한글로만 검색할 수 있습니다');
      setIsMessageWarning(true);
      return;
    }

    updateQuery([
      { key: 'searchTerm', value: searchInput },
      { key: 'gender', value: genderInput },
    ]);
  };

  useEffect(() => {
    setSearchInput(searchTerm);
    setGenderInput(gender);

    if (searchTerm.length === 0) {
      return;
    }

    if (gender !== 'M' && gender !== 'F') {
      return;
    }

    searchNames();

    async function searchNames() {
      setIsLoading(true);
      try {
        const {
          data: { result },
        } = await axios.get<{ result: string[] }>(`/api/names`, {
          params: { gender, searchTerm },
        });

        setSearchResult(result);
        setMessage(`${result.length}개의 검색 결과가 있습니다`);
        setIsMessageWarning(false);
        setIsMessageError(false);
      } catch {
        setSearchResult([]);
        setMessage('오류가 발생했습니다');
        setIsMessageWarning(false);
        setIsMessageError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [searchTerm, gender]);

  const Genders = (
    <Button.Group basic size="small">
      {GENDER_TYPES.map((v) => (
        <Button
          key={v}
          active={v === genderInput}
          onClick={getHandleGenderChange(v)}
        >
          {v === 'M' ? '남자' : '여자'}
        </Button>
      ))}
    </Button.Group>
  );

  const LoadingPlaceholder = (
    <Segment>
      <Placeholder fluid>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder>
    </Segment>
  );

  const Stats = (
    <Table singleLine unstackable>
      <Table.Body>
        {searchResult.map((name) => {
          const href = `/names/${gender}/${name}`;

          return (
            <Table.Row key={name} className="link-row">
              <Table.Cell width={4} className="link-cell">
                <Link href={href}>
                  <a>{name}</a>
                </Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );

  return (
    <>
      <Head title="인기 이름 검색" />
      <Layout>
        <Segment.Group>
          <Segment>{Genders}</Segment>
          <Segment>
            <div
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmitSearch();
                }
              }}
            >
              <Input
                fluid
                placeholder="검색어 예시: ㅇㅇ, ㅇ준, 준ㅇ"
                size="large"
                action={{
                  icon: 'search',
                  onClick: handleSubmitSearch,
                }}
                actionPosition="left"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </Segment>
          {message && (
            <Segment>
              <Message error={isMessageError} warning={isMessageWarning}>
                {message}
              </Message>
            </Segment>
          )}
        </Segment.Group>
        {isLoading
          ? LoadingPlaceholder
          : searchResult.length > 0
          ? Stats
          : null}
      </Layout>
    </>
  );
};

export default SearchPage;
