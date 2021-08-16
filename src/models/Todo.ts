import { TodoInterface } from '../interfaces/TodoInterface';
import { v4 as uuid } from 'uuid';

export class Todo implements TodoInterface {
  id: string;
  title: string;
  done: boolean;
  deadline: Date;
  created_at: Date;

  constructor(title: string, deadline: string) {
    this.id = uuid();
    this.title = title;
    this.done = false;
    this.deadline = new Date(deadline);
    this.created_at = new Date();
  }
}
