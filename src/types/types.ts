export type Todo = {
  id: number;
  value: string;
  done: boolean;
};

export type FormProps = {
  putTodo: (value: string) => void;
};

export type FilterButtonsProps = {
  filter: (filter: string) => void;
};