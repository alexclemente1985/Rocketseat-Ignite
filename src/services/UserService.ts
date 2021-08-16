import { User } from '../models/User';
import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export class UserService {
  constructor() {}

  static createUser(req: Request, res: Response, userStore: User[]) {
    const { name, username } = req.body;

    if (name && username) {
      const user: User = new User(name, username);
      userStore.push(user);
      res.status(200).json({
        message: `User '${user.name}' com username '${user.username}' criado com sucesso!`
      });
    } else {
      res
        .status(400)
        .json({ error: 'Dados incompletos para criação de usuário...' });
    }
  }

  static createTodo(req: Request, res: Response, userStore: User[]) {
    const { username } = req.headers;
    const { title, deadline } = req.body;

    if (title && deadline) {
      const todo = new Todo(title, deadline);

      userStore.forEach((user: User) => {
        if (user.username === username) {
          user.createTodo(todo);
        }
      });

      res.status(200).send(`Todo '${todo.title}' criado com sucesso!`);
    } else {
      res.status(400).send('Dados ausentes no Todo...');
    }
  }

  static getUserTodos(req: Request, res: Response, userStore: User[]) {
    const { username } = req.headers;

    const userIdx: number = this.getUserIdx(userStore, username as string);

    const userTodos: Todo[] = userStore[userIdx].todos;

    res.status(200).json(userTodos);
  }

  static updateUserTodo(req: Request, res: Response, userStore: User[]): void {
    const { id } = req.params;
    const { title, deadline } = req.body;
    const { username } = req.headers;

    const userIdx: number = this.getUserIdx(userStore, username as string);
    const userTodoIdx: number = this.findTodo(userStore, userIdx, id);

    if (userTodoIdx !== -1) {
      if (title) {
        userStore[userIdx].todos[userTodoIdx].title = title;
      }
      if (deadline) {
        userStore[userIdx].todos[userTodoIdx].deadline = new Date(deadline);
      }
      res.status(200).json(userStore[userIdx]);
    } else {
      res.status(400).json({
        error: `Todo '${title}' não encontrado para user '${userStore[userIdx].username}'`
      });
    }
  }

  static setTodoDone(req: Request, res: Response, userStore: User[]): void {
    const { id } = req.params;
    const { username } = req.headers;

    const userIdx: number = this.getUserIdx(userStore, username as string);
    const userTodoIdx: number = this.findTodo(userStore, userIdx, id);

    if (userTodoIdx !== -1) {
      userStore[userIdx].todos[userTodoIdx].done = true;
      res.status(200).json(userStore[userIdx]);
    } else {
      res.status(400).json({
        error: `Todo de id '${id}' não encontrado para user '${userStore[userIdx].username}'`
      });
    }
  }

  static deleteTodo(req: Request, res: Response, userStore: User[]): void {
    const { id } = req.params;
    const { username } = req.headers;

    const userIdx: number = this.getUserIdx(userStore, username as string);
    const userTodoIdx: number = this.findTodo(userStore, userIdx, id);

    if (userTodoIdx !== -1) {
      userStore[userIdx].todos.splice(userTodoIdx, 1);
      res.status(200).json(userStore[userIdx]);
    } else {
      res.status(400).json({
        error: `Todo de id '${id}' não encontrado para user '${userStore[userIdx].username}'`
      });
    }
  }

  static getUserIdx(userStore: User[], username: string): number {
    return userStore.findIndex((user: User) => user.username === username);
  }

  static findTodo(userStore: User[], userIdx: number, todoIdx: string) {
    return userStore[userIdx].todos.findIndex((t: Todo) => t.id === todoIdx);
  }
}
