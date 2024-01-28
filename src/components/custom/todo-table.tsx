import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "./todo";
import { Check, Pencil, Trash2 } from "lucide-react";

type TodoTableProps = {
  taskList: Task[];
  manageTodoListItem: (id: number, action: string) => void;
};

function TodoTable({ taskList, manageTodoListItem }: TodoTableProps) {
  function TaskContainer(task: Task) {
    return (
      <div
        key={task.id}
        className="flex flex-row justify-between border-b-[2px] pb-[5px]"
      >
        <div>
          <h3
            className={`text-2xl font-semibold tracking-tight ${
              task.isComplete && "line-through"
            }`}
          >
            {task.name}
          </h3>
          <p className={`${task.isComplete && "line-through"}`}>
            {task.description}
          </p>
        </div>
        <div className="self-center">
          {task.isComplete ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => manageTodoListItem(task.id, "delete")}
            >
              <Trash2 />
            </Button>
          ) : (
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => manageTodoListItem(task.id, "complete")}
              >
                <Check />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => manageTodoListItem(task.id, "edit")}
              >
                <Pencil />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => manageTodoListItem(task.id, "delete")}
              >
                <Trash2 />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Card className="w-[35em] p-4">
        <CardContent className="p-4 flex flex-col gap-2 max-h-72 overflow-auto">
          {taskList.length === 0 ||
          taskList.filter((task) => !task.isDelete).length === 0 ? (
            <p className="text-center">No tasks available</p>
          ) : (
            taskList
              .filter((task) => !task.isDelete)
              .map((task) => TaskContainer(task))
          )}
        </CardContent>
      </Card>
    </>
  );
}
export default TodoTable;
