import { useState } from "react";
import TodoForm from "./todo-form";
import TodoTable from "./todo-table";
import { useToast } from "@/components/ui/use-toast";

export type Task = {
  id: number;
  name: string;
  description: string;
  isComplete: boolean;
  isDelete: boolean;
};

function Todo() {
  const [taskAction, setTaskAction] = useState<string>("add");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task>({
    id: 0,
    name: "",
    description: "",
    isComplete: false,
    isDelete: false,
  });
  const { toast } = useToast();

  function addTaskToList(taskName: string, taskDescription: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      name: taskName,
      description: taskDescription,
      isComplete: false,
      isDelete: false,
    };
    setTaskList([...taskList, newTask]);
    setTaskAction("add");
  }

  function editTaskToList(taskName: string, taskDescription: string) {
    const index = taskList.findIndex((data) => data.id === editTask.id);

    if (index === -1) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Task not found.",
      });
      return;
    }

    const updatedTaskList = [...taskList];

    updatedTaskList[index] = {
      ...updatedTaskList[index],
      name: taskName,
      description: taskDescription,
    };

    setTaskList(updatedTaskList);
    setTaskAction("add");
  }

  function manageTodoListItem(id: number, action: string) {
    const index = taskList.findIndex((data) => data.id === id);

    if (index === -1) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Task not found.",
      });
      return;
    }

    const updatedTaskList = [...taskList];

    switch (action) {
      case "complete": {
        updatedTaskList[index] = {
          ...updatedTaskList[index],
          isComplete: true,
        };

        setTaskList(updatedTaskList);
        break;
      }
      case "edit": {
        setEditTask(taskList[index]);
        setTaskAction("edit");
        break;
      }
      case "delete": {
        updatedTaskList[index] = {
          ...updatedTaskList[index],
          isDelete: true,
        };

        setTaskList(updatedTaskList);
        break;
      }
    }
  }

  return (
    <>
      <TodoForm
        taskAction={taskAction}
        addTaskToList={addTaskToList}
        editTask={editTask}
        editTaskToList={editTaskToList}
      />
      <TodoTable taskList={taskList} manageTodoListItem={manageTodoListItem} />
    </>
  );
}

export default Todo;
