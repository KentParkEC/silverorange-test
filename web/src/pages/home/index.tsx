import React, { useCallback } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { RepositoryViewer } from './components/repositoryViewer';

import { useGetRepos } from 'src/queries/repo';
import { IRepo } from 'src/types/repo';

export function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useGetRepos();

  const handleRefetch = useCallback(() => {
    queryClient.invalidateQueries(['getRepos']);
  }, [queryClient]);

  return (
    <Box>
      <Typography
        color="primary"
        sx={{
          fontSize: '48px',
          lineHeight: '48px',
          p: '16px',
          textAlign: 'center',
          fontWeight: 700,
          mb: '16px',
        }}
      >
        Repositories
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error || !data ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                color="primary"
                sx={{
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '24px',
                  mb: '20px',
                }}
              >
                Something went wrong! Please try again later.
              </Typography>
              <Button onClick={handleRefetch} variant="outlined">
                Try Again
              </Button>
            </Box>
          ) : (
            <RepositoryViewer data={data.data as IRepo[]} />
          )}
        </>
      )}
    </Box>
  );
}
