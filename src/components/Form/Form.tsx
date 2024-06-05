import React, { useState } from "react";
import "./Form.css";
import { FormProps } from "../../types/types";

export default function Form({ putTodo }: FormProps): JSX.Element {
  const [value, setValue] = useState("");
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        putTodo(value);
        setValue("");
      }}
    >
      <input
        type="input"
        placeholder="введите текст..."
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
