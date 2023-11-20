import { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from '../types';

// Example in-memory storage
let todos: Todo[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      // Add the new Todo
      const newTodo: Todo = req.body;
      todos.push(newTodo);
      res.status(200).json({ message: 'Todo added successfully' });
      break;
    case 'GET':
      // Return all Todos
      res.status(200).json(todos);
      break;
    // Other methods can be implemented similarly
  }
}
