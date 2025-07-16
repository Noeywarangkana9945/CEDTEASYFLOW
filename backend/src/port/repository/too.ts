export interface TodoRepository {
    GetTodo(id: string): Promise<string> 
    Create(id:string, name:string) : Promise<Error>
}