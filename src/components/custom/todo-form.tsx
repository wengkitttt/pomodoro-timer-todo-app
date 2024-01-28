import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "./todo";

type TodoFormProps = {
  taskAction: string;
  editTask: Task;
  addTaskToList: (taskName: string, taskDescription: string) => void;
  editTaskToList: (taskName: string, taskDescription: string) => void;
};

function TodoForm({
  taskAction,
  editTask,
  addTaskToList,
  editTaskToList,
}: TodoFormProps) {
  const { toast } = useToast();
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");

  function taskFormAction() {
    if (taskName === "" || taskDescription === "") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Missing task name or task description",
      });
      return;
    }
    if (taskAction === "add") {
      addTaskToList(taskName, taskDescription);
    } else {
      editTaskToList(taskName, taskDescription);
    }

    setTaskName("");
    setTaskDescription("");
  }

  useEffect(() => {
    if (taskAction === "edit") {
      setTaskName(editTask.name);
      setTaskDescription(editTask.description);
    }
  }, [editTask, taskAction]);

  return (
    <>
      <Card className="w-[35em] p-4">
        <CardContent className="p-4">
          <form className="flex flex-row gap-6">
            <div className="w-full items-center gap-2 flex flex-row">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="taskName">Task Name:</Label>
                <Input
                  onChange={(event) => setTaskName(event.target.value)}
                  value={taskName}
                  id="taskName"
                  placeholder="Task Name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description:</Label>
                <Input
                  onChange={(event) => setTaskDescription(event.target.value)}
                  value={taskDescription}
                  id="description"
                  placeholder="Description"
                />
              </div>
            </div>

            <div className="self-end">
              {taskAction === "add" ? (
                <Button
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault();
                    taskFormAction();
                  }}
                >
                  Add Task
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={(event) => {
                    event.preventDefault();
                    taskFormAction();
                  }}
                >
                  Edit Task
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
export default TodoForm;
