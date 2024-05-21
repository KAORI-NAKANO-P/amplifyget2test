
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from "aws-amplify"
import outputs from "../amplify_outputs.json"
import { Stack } from "@mui/material";
import { Button } from '@aws-amplify/ui-react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import Account from "./pages/Account";

Amplify.configure(outputs)


// 開始
function App() {

  return (      
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (

        <main>
          <h1>{user?.signInDetails?.loginId}</h1>
          <Stack my={2} direction="row" justifyContent="end" spacing={1}>
            <Button onClick={signOut}>Sign out</Button>
          </Stack>
          <BrowserRouter>
            <Link to="/">Home画面</Link>
            <Link to="/Todo">ToDo（GraphQL）</Link>
            <Link to="/Account">ユーザアカウントの管理（Cognito）</Link>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Todo" element={<Todo />} />
              <Route path="/Account" element={<Account />} />
              <Route path="*" element={<h1>Not Found Page</h1>} />
            </Routes>
          </BrowserRouter>
        </main>
      )}
      </Authenticator>
  );
}

export default App;
