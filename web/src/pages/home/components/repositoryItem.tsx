import React from 'react';
import { ListItemButton, Divider, Box, Typography, Chip } from '@mui/material';

import { IRepo } from 'src/types/repo';

export function RepositoryItem({
  repo,
  hasDivider,
  selectedRepo,
  setSelectedRepo,
}: {
  repo: IRepo;
  hasDivider: boolean;
  selectedRepo: IRepo | null;
  setSelectedRepo: (value: IRepo) => void;
}) {
  return (
    <>
      <ListItemButton
        onClick={() => {
          setSelectedRepo(repo);
        }}
        sx={{
          bgcolor:
            !!selectedRepo && selectedRepo.id === repo.id
              ? 'lightgray'
              : 'auto',
        }}
      >
        <Box>
          <Typography
            color="primary"
            sx={{
              fontSize: '18px',
              lineHeight: '18px',
              fontWeight: 500,
              mb: '10px',
            }}
          >
            {repo.name}
          </Typography>
          {!!repo.description && (
            <Typography
              sx={{ fontSize: '14px', lineHeight: '14px', mb: '6px' }}
            >
              {repo.description}
            </Typography>
          )}
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Chip
              size="small"
              color="primary"
              label={repo.language}
              sx={{ mr: '8px' }}
            />
            <Chip
              size="small"
              color="success"
              label={`Forks: ${repo.forks_count}`}
            />
          </Box>
        </Box>
      </ListItemButton>
      {hasDivider && <Divider />}
    </>
  );
}
