import { Todo } from '@/app/types';
import { NextApiRequest, NextApiResponse } from 'next';

let todos: Todo[] = []; // This should ideally be a database or shared storage

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      // Update the Todo
      const updatedTodoIndex = todos.findIndex((todo) => todo.id === id);
      if (updatedTodoIndex === -1) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }
      todos[updatedTodoIndex] = req.body;
      res.status(200).json({ message: 'Todo updated successfully' });
      break;
    case 'DELETE':
      // Delete the Todo
      todos = todos.filter((todo) => todo.id !== id);
      res.status(200).json({ message: 'Todo deleted successfully' });
      break;
    // Other methods can be implemented similarly
  }
}
