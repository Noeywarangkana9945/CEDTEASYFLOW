import express from "express";
import { TodoService } from "../../core/service/todo";
import { InMemoryTodoRepository } from "../postgres/todo";

const repo = new InMemoryTodoRepository();
const service = new TodoService(repo);

const router = express.Router();

router.get("/todo/:id", async (req, res) => {
  const todo = await service.GetTodo(req.params.id);
  if (todo) res.json(todo);
  else res.status(404).send("Not found");
});