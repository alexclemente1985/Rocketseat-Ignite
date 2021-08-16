import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { User } from '../models/User';
import { UserService } from '../services/userService';

class TodoController {
  constructor() {}

  static createTodo(request: Request, response: Response, userStore: User[]) {
    UserService.createTodo(request, response, userStore);
  }

  static getUserTodos(request: Request, response: Response, userStore: User[]) {
    UserService.getUserTodos(request, response, userStore);
  }

  static updateTodo(request: Request, response: Response, userStore: User[]) {
    UserService.updateUserTodo(request, response, userStore);
  }

  static setTodoDone(request: Request, response: Response, userStore: User[]) {
    UserService.setTodoDone(request, response, userStore);
  }

  static deleteTodo(request: Request, response: Response, userStore: User[]) {
    UserService.deleteTodo(request, response, userStore);
  }
}

export default TodoController;
