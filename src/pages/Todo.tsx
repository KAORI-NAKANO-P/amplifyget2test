
import '@aws-amplify/ui-react/styles.css'
import {  useEffect, useState } from "react";
import { Amplify } from "aws-amplify"
import outputs from "../../amplify_outputs.json"
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

Amplify.configure(outputs)
const client = generateClient<Schema>();

// 開始
const Todo = () => {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  // Todo作成
  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
  // Todo削除
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => deleteTodo(todo.id)}
          key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  )
}

export default Todo;
