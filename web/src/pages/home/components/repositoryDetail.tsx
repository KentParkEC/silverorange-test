import React, { useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';

import { IRepo, ICommit } from 'src/types/repo';
import { useGetCommits, useGetReadMe } from 'src/queries/repo';

export function RepositoryDetail({ repo }: { repo: IRepo }) {
  const { data: commits, isLoading: isLoadingCommits } = useGetCommits(
    repo.commits_url.substr(0, repo.commits_url.length - 6)
  );

  const lastCommit = useMemo(() => {
    const data = (commits ? (commits.data as ICommit[]) : []).sort(
      (prev, next) =>
        prev.commit.author.date > next.commit.author.date ? -1 : 1
    );
    return data.length ? data[0] : undefined;
  }, [commits]);

  const { data: readme, isLoading: isLoadingReadMe } = useGetReadMe(
    `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`
  );

  return (
    <Box sx={{ p: '32px 24px', width: 'calc(100vw - 500px)' }}>
      <Typography
        color="primary"
        sx={{
          fontSize: '24px',
          lineHeight: '24px',
          fontWeight: 700,
          textAlign: 'center',
          mb: '24px',
        }}
      >
        {repo.name}
      </Typography>
      {isLoadingCommits || isLoadingReadMe ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {lastCommit ? (
            <Box
              sx={{
                mb: '16px',
                p: '12px',
                bgcolor: 'lightgray',
                borderRadius: '4px',
              }}
            >
              <Typography>{`Author: ${lastCommit.commit.author.name}`}</Typography>
              <Typography sx={{ mb: '8px' }}>
                {new Date(lastCommit.commit.author.date).toUTCString()}
              </Typography>
              <Typography>{lastCommit.commit.message}</Typography>
            </Box>
          ) : (
            <Typography
              color="error"
              sx={{ fontSize: '16px', lineHight: '20px', mb: '16px' }}
            >
              Cannot read the commits
            </Typography>
          )}
          <ReactMarkdown>{readme ? readme.data : ''}</ReactMarkdown>
        </>
      )}
    </Box>
  );
}
