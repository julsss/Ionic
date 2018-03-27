import {TodoItem} from "./todoItem";

export class TodoList {
  uuid: string;
  name: string;
  image? : string;
  lat? : number;
  lng? : number;
  owner : string;
  items: TodoItem[];
}
