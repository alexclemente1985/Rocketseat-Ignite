import { Request, Response } from 'express';
import { User } from '../models/User';
import { UserService } from '../services/userService';

class UserController {
  constructor() {}

  static createUser(request: Request, response: Response, userStore: User[]) {
    UserService.createUser(request, response, userStore);
  }

  static getUsers(response: Response, userStore: User[]) {
    response.status(200).json(userStore);
  }
}

export default UserController;
