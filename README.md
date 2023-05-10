## 이름 통계

2008년부터 현재까지 상위 이름 목록, 연도별 통계 등을 제공합니다. 대법원 전자가족관계등록시스템의 통계 데이터를 사용합니다.

### 데이터 업데이트
- `crawler/index.js`에서 데이터를 크롤링하여 파일로 저장 (github action에 schedule로 등록되어 주 1회 반복)
- `vercel`로 배포 (`nextjs`에서 빌드시 해당 파일을 읽어서 사용)

### Nextjs 기능 활용
- 홈, 연도별 인기 이름: `getStaticProps`
- 개별 이름 페이지: `getStaticPaths`, `getStaticProps`
- 검색: `api route`
