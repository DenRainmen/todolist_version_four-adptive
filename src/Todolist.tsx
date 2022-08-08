import React, { ChangeEvent, KeyboardEvent, useState } from "react";
/* import { FilterValuesType } from "./App"; */

type PROPS = {
  title: string;
  tasks: TaskType[];
  removeTask: (elID: string) => void;
  // changeFilter: (btnName: string) => void;
  addTask: (inputText: string) => void;
  changeStatusInCheckboxes: (taskId: string, taskIsDone: boolean) => void;
};

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export function Todolist(props: PROPS) {
  const [inputText, SetInputText] = useState("");

  const [btnName, setFilterValue] = useState("All");

  const [error, setError] = useState<null | string>(null);

  const addTaskWithClear = () => {
    switch (inputText.trim()) {
      case "":
        setError("Error text input");
        break;
      default:
        props.addTask(inputText.trim());
        SetInputText("");
    }
  };

  const changeFilter = (btnName: string) => {
    setFilterValue(btnName);
    // alert(btnName)
  };

  let filteredTasks = props.tasks;

  switch (btnName) {
    case "Completed":
      filteredTasks = props.tasks.filter((el) => el.isDone === true);
      break;
    case "Active":
      filteredTasks = props.tasks.filter((el) => el.isDone === false);
      break;
    default:
      filteredTasks = props.tasks;
  }

  const onChangeCheckBoxHandler = (taskId: string, taskIsDone: boolean) => {
    props.changeStatusInCheckboxes(taskId, taskIsDone);
  };

  // тернарник проверяет пуст ли массив тасок и если это так , то выводится сообщение о пустом списке
  const taskList = filteredTasks.length ? (
    filteredTasks.map((el) => {
      return (
        <li key={el.id}>
          <input
            type="button"
            value="x"
            onClick={() => props.removeTask(el.id)}
          />

          <input
            type="checkbox"
            checked={el.isDone}
            onChange={() => onChangeCheckBoxHandler(el.id, el.isDone)}
          />

          <span className={el.isDone === true ? "isDone" : ""}>{el.title}</span>
        </li>
      );
    })
  ) : (
    <h3>Tasks list is empty</h3>
  );

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null); //при любом нажатии в поле инпута сбрасывает ошибку
    // if(event.key === "Enter" && event.shiftKey === true)
    if (event.key === "Enter") {
      addTaskWithClear();
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    SetInputText(event.currentTarget.value);

  // JSX код
  return (
    <div>
      <i className="title">{`${props.title} ?`}</i>
      <div className="card-container">
        <div>
          <input
            type="text"
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            value={inputText}
            className={error ? "error" : ""}
          />

          <button onClick={addTaskWithClear}>+</button>
          {error && <div className="error-message">{error}</div>}
        </div>

        <ul>{taskList}</ul>

        <div>
          <button
            className={btnName === "All" ? "active-filter" : "filterButton"}
            onClick={() => changeFilter("All")}
          >
            All
          </button>
          <button
            className={btnName === "Active" ? "active-filter" : "filterButton"}
            onClick={() => changeFilter("Active")}
          >
            Active
          </button>

          <button
            className={
              btnName === "Completed" ? "active-filter" : "filterButton"
            }
            onClick={() => changeFilter("Completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
