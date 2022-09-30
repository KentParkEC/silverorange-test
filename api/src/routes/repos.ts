import { Router, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { IRepo } from '../types/repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);
  const gitHubPromise = axios
    .get<any, AxiosResponse<IRepo[]>>(process.env.GITHUB_REPO || '')
    .then((data) => data.data);
  const filePath = path.join(__dirname, '..', '..', 'data', 'repos.json');
  const filePromise = fs
    .readFile(filePath, 'utf8')
    .then((data) => JSON.parse(data) as IRepo[]);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  try {
    const data = await Promise.all([gitHubPromise, filePromise]);
    const result = data.flat().filter((item) => !item.fork);
    res.json(result);
  } catch (err) {
    res.status(500).json([]);
  }
});
