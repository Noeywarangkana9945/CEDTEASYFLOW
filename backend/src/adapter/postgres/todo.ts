// adapters/outbound/persistence/InMemoryTodoRepository.ts
import { Todo } from "../../../domain/entities/Todo";
import { TodoRepository } from "../../../application/ports/TodoRepository";

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async findById(id: string): Promise<Todo | null> {
    return this.todos.find(t => t.id === id) || null;
  }

  async save(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }
}
