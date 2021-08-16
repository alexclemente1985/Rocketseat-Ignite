import { NextFunction, Request, Response } from 'express';
import { UserInterface } from '../interfaces/userInterface';
import { User } from '../models/User';

class UserMiddlewares {
  constructor() {}
  static checksExistsUserAccount(
    request: Request,
    response: Response,
    next: NextFunction,
    userStore: User[]
  ) {
    const { username } = request.headers;

    const userExists = userStore.some(
      (user: User) => username === user.username
    );

    if (userExists) {
      response.locals.request = request;
      response.locals.userStore = userStore;
      next();
    } else {
      response.status(400).send('Usuário não encontrado!');
    }
  }

  static updateUserStore(
    request: Request,
    response: Response,
    fn: CallableFunction,
    next: NextFunction
  ) {
    fn();
    next();
  }
}

export default UserMiddlewares;
