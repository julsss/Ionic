import {TodoItem} from "./todoItem";

export class TodoList {
  uuid: string;
  name: string;
  image? : string;
  items: TodoItem[];
}
