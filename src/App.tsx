import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.scss";
import InputFeild from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(JSON.parse(window.localStorage.getItem("todos") || "[]"));
    setCompletedTodos(
      JSON.parse(window.localStorage.getItem("completed") || "[]")
    );
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTodo: Todo = {
        id: Date.now(),
        todo: todo,
        isDone: false,
        isComplete: false,
      } as Todo;

      const updatedTodos = [...todos, newTodo];

      window.localStorage.setItem("todos", JSON.stringify(updatedTodos));

      setTodos([
        ...todos,
        { id: Date.now(), todo, isDone: false, isComplete: false },
      ]);

      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      add.isComplete = true;
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      add.isComplete = false;
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    window.localStorage.setItem("todos", JSON.stringify(active));
    window.localStorage.setItem("completed", JSON.stringify(complete));
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1 className="heading">Taskify</h1>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
