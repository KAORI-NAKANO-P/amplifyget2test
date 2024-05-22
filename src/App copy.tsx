
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { /*FormEvent,*/ useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { Hub } from 'aws-amplify/utils';

const client = generateClient<Schema>();
Amplify.configure(outputs)


// 認証イベントのリッスン
Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signedIn':
      console.log('user have been signedIn successfully.');
      break;
    case 'signedOut':
      console.log('user have been signedOut successfully.');
      break;
    case 'tokenRefresh':
      console.log('auth tokens have been refreshed.');
      break;
    case 'tokenRefresh_failure':
      console.log('failure while refreshing auth tokens.');
      break;
    case 'signInWithRedirect':
      console.log('signInWithRedirect API has successfully been resolved.');
      break;
    case 'signInWithRedirect_failure':
      console.log('failure while trying to resolve signInWithRedirect API.');
      break;
    case 'customOAuthState':
      console.log('custom state returned from CognitoHosted UI');
      break;
  }
});

// サインアップ時のIF
// interface SignUpFormElements extends HTMLFormControlsCollection {
//   email: HTMLInputElement
//   password: HTMLInputElement
// }
// interface SignUpForm extends HTMLFormElement {
//   readonly elements: SignUpFormElements
// }

// ユーザ情報取得
// const { username, userId, signInDetails } = await getCurrentUser();
// console.log("username", username);
// console.log("user id", userId);
// console.log("sign-in details", signInDetails);

// セッション情報取得
// const session = await fetchAuthSession();
// console.log("id token", session.tokens.idToken)
// console.log("access token", session.tokens.accessToken)

// 開始
function App() {
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

  // サインアップ実行
  // async function handleSubmit(event: FormEvent<SignUpForm>) {
  //   event.preventDefault()
  //   const form = event.currentTarget
  //   // ... validate inputs
  //   await signUp({
  //     username: form.elements.email.value,
  //     password: form.elements.password.value,
  //   })
  // }

  // アカウントのグループ追加
 async function addToGroup() {

  try {
    const res=await client.mutations.addUserToGroup({
      groupName: "ADMINS",
      userId: "77845ae8-b061-7022-5d2f-933c19fbebbc",
    })
    console.log(res);
  } catch (err) {
    console.log('addUserToGroup call error',err);
  }
 }

  return (
        
    <Authenticator>
      {({ signOut, user }) => (

        <main>
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
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
          <button onClick={addToGroup}>add Grop</button><br/>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
      </Authenticator>
  );
}

export default App;
