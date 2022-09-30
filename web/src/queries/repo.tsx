import { useQuery } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';

import { getApiClient } from 'src/modules/axios';
import { IRepo, ICommit } from 'src/types/repo';

const getRepos = () => {
  return getApiClient().get('/repos');
};

export const useGetRepos = () => {
  return useQuery<AxiosResponse<IRepo[]>, AxiosError>(['getRepos'], () =>
    getRepos()
  );
};

const getCommits = (url: string) => {
  return getApiClient(url).get('');
};

export const useGetCommits = (url: string) => {
  return useQuery<AxiosResponse<ICommit[]>, AxiosError>(
    ['getCommits', url],
    () => getCommits(url)
  );
};

const getReadMe = (url: string) => {
  return getApiClient(url).get('');
};

export const useGetReadMe = (url: string) => {
  return useQuery<AxiosResponse<string>, AxiosError>(['getReadMe', url], () =>
    getReadMe(url)
  );
};
