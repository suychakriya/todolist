import { NextApiRequest, NextApiResponse } from "next";
import { Todo } from "../../types";
import db from "../../../utils/db";

// Example in-memory storage
let todos: Todo[] = [];

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const collectionRef = db.collection("todo");
    const snapshot = await collectionRef.get();

    const allDocuments = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    console.log(allDocuments);

    return Response.json(allDocuments);
  } catch (e) {
    console.log("Error", e);
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.body;
    let passedValue = await new Response(body).text();
    let valueToJson = JSON.parse(passedValue);
    console.log("this is the body", valueToJson);
    const { id } = await db.collection("todo").add({
      ...valueToJson,
      created: new Date().toISOString(),
    });

    return Response.json({ id });
  } catch (e) {
    console.log("Error", e);
  }
}

// export function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'POST':
//       // Add the new Todo
//       const newTodo: Todo = req.body;
//       todos.push(newTodo);
//       res.status(200).json({ message: 'Todo added successfully' });
//       break;
//     case 'GET':
//       // Return all Todos
//       console.log('hiiii');
//       res.status(200).json(todos);
//       break;
//     // Other methods can be implemented similarly
//   }
// }
