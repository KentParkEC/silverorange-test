import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  List,
  Drawer,
} from '@mui/material';

import { RepositoryItem } from './repositoryItem';
import { RepositoryDetail } from './repositoryDetail';

import { IRepo } from 'src/types/repo';

export function RepositoryViewer({ data }: { data: IRepo[] }) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<IRepo | null>(null);

  const repos = useMemo(
    () =>
      (selectedLanguages.length
        ? data.filter((repo) => selectedLanguages.includes(repo.language))
        : [...data]
      ).sort((prev, next) => (prev.created_at > next.created_at ? -1 : 1)),
    [data, selectedLanguages]
  );

  const languages = useMemo(() => {
    const set = new Set<string>();
    data.forEach((repo) => set.add(repo.language));

    const result: string[] = [];
    set.forEach((value) => result.push(value));

    return result.sort((prev, next) => (prev > next ? 1 : -1));
  }, [data]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: selectedRepo ? 'flex-start' : 'center',
          px: '32px',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '360px' }}>
          <Box
            sx={{
              position: 'sticky',
              py: '8px',
              bgcolor: 'white',
              top: 0,
              zIndex: 10,
            }}
          >
            <Typography color="primary" sx={{ mb: '8px' }}>
              Language:
            </Typography>
            <ToggleButtonGroup
              value={selectedLanguages}
              color="primary"
              onChange={(
                evt: React.MouseEvent<HTMLElement>,
                newLanguages: string[]
              ) => setSelectedLanguages(newLanguages)}
            >
              {languages.map((language) => (
                <ToggleButton key={language} value={language}>
                  {language}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <Typography color="primary">Repositories:</Typography>
          <List>
            {repos.map((repo, index) => (
              <RepositoryItem
                key={repo.id}
                repo={repo}
                hasDivider={index !== repos.length - 1}
                selectedRepo={selectedRepo}
                setSelectedRepo={setSelectedRepo}
              />
            ))}
          </List>
        </Box>
      </Box>
      <Drawer
        open={!!selectedRepo}
        onClose={() => setSelectedRepo(null)}
        anchor="right"
      >
        {!!selectedRepo && <RepositoryDetail repo={selectedRepo} />}
      </Drawer>
    </Box>
  );
}
