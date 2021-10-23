import React, { useRef } from "react";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    let heading: any = document.querySelector(".heading");
    heading.style.color = "#fff";
  };
  const handleNotFocus = () => {
    let heading: any = document.querySelector(".heading");
    heading.style.color = "#272727";
  };

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        value={todo}
        type="text"
        placeholder="Enter a task"
        className="input__box"
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleNotFocus}
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputFeild;
