import { Todo } from '../models/Todo';

export interface UserInterface {
  id: string;
  name: string;
  username: string;
  todos?: Todo[];
}
