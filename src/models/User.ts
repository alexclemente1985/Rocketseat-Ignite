import { UserInterface } from '../interfaces/userInterface';
import { Todo } from './Todo';
import { v4 as uuid } from 'uuid';

export class User implements UserInterface {
  id: string;
  name: string;
  username: string;
  todos: Todo[];

  constructor(name: string, username: string) {
    this.id = uuid();
    this.name = name;
    this.username = username;
    this.todos = [];
  }

  createTodo(todo: Todo) {
    this.todos.push(todo);
  }
}
