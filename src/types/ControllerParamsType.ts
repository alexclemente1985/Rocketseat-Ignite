import { Request, Response } from 'express';
import { User } from '../models/User';

export type ControllerParamsType = {
  request: Request;
  response: Response;
  userStore: User[];
};
