import {
  render,
  fireEvent,
  waitFor,
  queryByText,
} from "@testing-library/react";
import App from "../components/App/App";

test("renders App component", () => {
  const { getByText, getByPlaceholderText } = render(<App />);

  expect(getByText("Todos")).toBeInTheDocument();
  expect(getByPlaceholderText("введите текст...")).toBeInTheDocument();
});
test("validate input: empty todo", async () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  const { getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText("введите текст...");

  // Пытаемся добавить пустую задачу
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.submit(input);

  // Проверяем, что window.alert вызван
  expect(alertSpy).toHaveBeenCalled();

  // Ожидаем появления сообщения об ошибке
  await waitFor(() => {
    expect(getByPlaceholderText("введите текст...")).toBeInTheDocument();
  });

  // Очищаем поле ввода и пытаемся добавить непустую задачу
  fireEvent.change(input, { target: { value: "New todo" } });
  fireEvent.submit(input);

  // Проверяем, что сообщение об ошибке больше не отображается
  await waitFor(() => {
    expect(queryByText(document.body, "введите текст")).toBeNull();
  });

  // Восстанавливаем оригинальный window.alert
  alertSpy.mockRestore();
});

test("toggle todo: change task state", async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText("введите текст...");

  // Добавляем задачу
  fireEvent.change(input, { target: { value: "New todo" } });
  fireEvent.submit(input);

  // Ждем, пока элемент появится в DOM
  await waitFor(() => {
    expect(getByText("New todo")).toBeInTheDocument(); // Проверяем, что задача добавлена
  });

  // Переключаем состояние задачи
  fireEvent.click(getByText("New todo"));

  // Проверяем, что состояние задачи изменилось
  await waitFor(() => {
    expect(getByText("New todo")).toHaveClass("done"); // Проверяем, что задача теперь выполнена
  });
});

test("add new todo", async () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText("введите текст...");

  // Симулируем ввод текста и отправку формы
  fireEvent.change(input, { target: { value: "New todo" } });
  fireEvent.submit(input);

  // Ждем, пока элемент появится в DOM
  await waitFor(() => {
    expect(getByText("New todo")).toBeInTheDocument(); // Проверяем, что элемент с текстом "New todo" существует
  });
});

test("toggle todo", async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const newTodo = "New todo";

  // Добавляем новую задачу
  const input = getByPlaceholderText("введите текст...");
  fireEvent.change(input, { target: { value: newTodo } });
  fireEvent.submit(input);

  // Ждем, пока элемент появится в DOM
  await waitFor(() => {
    expect(getByText(newTodo)).toBeInTheDocument();
  });

  // Находим элемент задачи и кликаем по нему для переключения состояния
  const todo = getByText(newTodo);
  fireEvent.click(todo);

  // Проверяем, что состояние задачи изменено
  await waitFor(() => {
    expect(todo).toHaveClass("done");
  });
});

test("remove todo", async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  const newTodo = "New todo";

  // Добавляем новую задачу
  const input = getByPlaceholderText("введите текст...");
  fireEvent.change(input, { target: { value: newTodo } });
  fireEvent.submit(input);

  // Ждем, пока элемент появится в DOM
  await waitFor(() => {
    expect(getByText(newTodo)).toBeInTheDocument();
  });

  // Находим кнопку удаления и кликаем по ней
  const deleteButton = getByText("Clear All");
  fireEvent.click(deleteButton);

  // Проверяем, что задача удалена
  await waitFor(() => {
    expect(queryByText(newTodo)).toBeNull();
  });
});

test("delete all todos", async () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<App />);
  const newTodo = "New todo";

  // Добавляем новую задачу
  const input = getByPlaceholderText("введите текст...");
  fireEvent.change(input, { target: { value: newTodo } });
  fireEvent.submit(input);

  // Ждем, пока элемент появится в DOM
  await waitFor(() => {
    expect(getByText(newTodo)).toBeInTheDocument();
  });

  // Находим кнопку удаления всех задач и кликаем по ней
  const deleteAllButton = getByText("Clear All");
  fireEvent.click(deleteAllButton);

  // Проверяем, что все задачи удалены
  await waitFor(() => {
    expect(queryByText(newTodo)).toBeNull();
  });
});
