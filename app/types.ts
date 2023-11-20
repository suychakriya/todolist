export interface Todo {
  id: string;
  data: {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: string;
  };
}
