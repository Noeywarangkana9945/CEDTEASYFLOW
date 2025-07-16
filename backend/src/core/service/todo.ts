import { TodoRepository } from "../../port/repository/too";

export class TodoService {
  constructor(private todoRepo: TodoRepository) {
  }

  async GetTodo(id: string) {
    // check user
    // check auth
    return await this.todoRepo.GetTodo(id);
  }

  async CreateTodo(id:string, name:string) {
    return this.todoRepo.Create(id, name)
  }
}