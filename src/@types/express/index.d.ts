import { Todo } from '../../models/Todo';
import { User } from '../../models/User';

declare global {
  namespace Express {
    export interface Request {
      name: string;
      username: string;
      title: string;
      deadline: string;
      done: boolean;
      userStore: User[];
    }
  }
}
