import React, { useState } from "react";
import { v1 } from "uuid";
import "./App.css";
import { Todolist } from "./Todolist";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const App = () => {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "NodeJS", isDone: false }
  ]);

  const addTask = (inputText: string) => {
    setTasks([{ id: v1(), title: inputText, isDone: false }, ...tasks]);
  };

  const removeTask = (elID: string) => {
    let newTasks = tasks.filter((el) => el.id !== elID);
    setTasks(newTasks);
    // console.log(tasks);
  };

  const changeStatusInCheckboxes = (taskId: string, taskIsDone: boolean) => {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = !taskIsDone;
    }
    setTasks([...tasks]);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
        changeStatusInCheckboxes={changeStatusInCheckboxes}
      />
    </div>
  );
};
