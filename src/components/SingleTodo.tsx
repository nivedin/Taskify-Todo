import React, { useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );

    !edit && localStorage.setItem("todos", JSON.stringify(updateTodos));
    !edit && setTodos(updateTodos);
  };

  const handleDelete = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    localStorage.setItem("completed", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const handleEdit = (id: number) => {
    if (!todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: editTodo } : todo
    );
    localStorage.setItem("todos", JSON.stringify(todos));

    setTodos(updateTodos);
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo__single ${snapshot.isDragging ? "dragActive" : ""}`}
          onSubmit={(e) => handleEditTodo(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              value={editTodo}
              type="text"
              className="todo__single__input"
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : (
            <span
              className="todo__single__text"
              style={todo.isDone ? { textDecoration: "line-through" } : {}}
            >
              {todo.todo}
            </span>
          )}
          <div>
            <span className="icon" onClick={() => handleEdit(todo.id)}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
