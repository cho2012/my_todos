import todoIcons from "@/components/todoIcons";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export interface ITask {
  id: number;
  title: string;
  color: string;
  icon: keyof typeof todoIcons | undefined;
}

export const todosFatch = async ({
  setTodos,
  setTask,
}: {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  setTask: Dispatch<SetStateAction<ITask[]>>;
}) => {
  const token = localStorage.getItem("qid");
  if (token) {
    //todos
    const responseTodos = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}getTodos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTodos(responseTodos.data.todos);

    //tasks
    const responseTasks = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}getTasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTask(responseTasks.data.tasks);
  }
};
