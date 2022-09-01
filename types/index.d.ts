interface NameInfo {
  name: string;
  count: number;
  rank: number;
  chosung: string;
}

type Gender = 'M' | 'F';

type RootData = {
  [key in Gender]: { [key: number]: Array<NameInfo> };
};

type StatData = {
  [key in Gender]: Array<NameInfo>;
};
