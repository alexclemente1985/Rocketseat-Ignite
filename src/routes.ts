import express, { Request, response, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';
import UserMiddlewares from './middlewares/userMiddlewares';
import { User } from './models/User';

const router = express.Router();

const userStore: User[] = [];

router.get('/teste', (req, res) => {
  res.send('Rota de teste!!');
});

router.post('/users', (request: Request, response: Response) => {
  UserController.createUser(request, response, userStore);
});

router.get('/users', (request: Request, response: Response) => {
  UserController.getUsers(response, userStore);
});

router.post(
  '/todos',
  (req: Request, res: Response, next: NextFunction) => {
    UserMiddlewares.checksExistsUserAccount(req, res, next, userStore);
  },
  (req, res) => {
    TodoController.createTodo(req, res, userStore);
  }
);

router.get(
  '/todos',
  (req: Request, res: Response, next: NextFunction) => {
    UserMiddlewares.checksExistsUserAccount(req, res, next, userStore);
  },
  (req, res) => {
    TodoController.getUserTodos(req, res, userStore);
  }
);

router.put(
  '/todos/:id',
  (req: Request, res: Response, next: NextFunction) => {
    UserMiddlewares.checksExistsUserAccount(req, res, next, userStore);
  },
  (req, res) => {
    TodoController.updateTodo(req, res, userStore);
  }
);

router.patch(
  '/todos/:id/done',
  (req: Request, res: Response, next: NextFunction) => {
    UserMiddlewares.checksExistsUserAccount(req, res, next, userStore);
  },
  (req, res) => {
    TodoController.setTodoDone(req, res, userStore);
  }
);

router.delete(
  '/todos/:id',
  (req: Request, res: Response, next: NextFunction) => {
    UserMiddlewares.checksExistsUserAccount(req, res, next, userStore);
  },
  (req, res) => {
    TodoController.deleteTodo(req, res, userStore);
  }
);

export default router;
