
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';

const client = generateClient<Schema>();


const initial_newAcc = { userid:''}
const initial_chgAcc = { userid:'', groupname:''};

// 開始
const Account = () => {
  const [newAcc, setNewAcc] = useState(initial_newAcc);
  const [chgAcc, setChgAcc] = useState(initial_chgAcc);


  useEffect(() => {
  }, []);

  async function getItem() {
    try {
      const authSession = (await fetchAuthSession()).tokens;
      console.log(`${authSession?.accessToken.toString()}`)
      const restOperation = get({ 
        apiName: 'myRestApi',
        path: 'items' ,
        options: {
          headers: {
            'Content-Type' : 'application/json',
            Authorization: `${authSession?.accessToken.toString()}`
          }
        }
      });
      const response = await restOperation.response;
      console.log('GET call succeeded: ', response);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  function setInput(key:any, value:any) {
    setNewAcc({ ...newAcc, [key]: value });
  }
  function setInput2(key:any, value:any) {
    setChgAcc({ ...chgAcc, [key]: value });
  }

  //-------------------------------------------------
  // アカウントの追加
  async function createUser() {

    if (!newAcc.userid ) return;

      try {
        const res=await client.mutations.createUser({
          userId: newAcc.userid,
        })
        console.log('createUser call succeed',res);
      } catch (err) {
        console.log('createUser call error',err);
      }
  }

  // アカウントの削除
  async function deleteUser() {

    if (!newAcc.userid ) return;

      try {
        const res=await client.mutations.deleteUser({
          userId: newAcc.userid,
        })
        console.log('deleteUser call succeed',res);
      } catch (err) {
        console.log('deleteUser call error',err);
      }
  }

  // アカウント情報の取得
  async function getUser() {

    if (!newAcc.userid ) return;

      try {
        const res=await client.queries.getUser({
          userId: newAcc.userid,
        })
        console.log(res.data);

        console.log('getUser call succeed',res);
      } catch (err) {
        console.log('getUser call error',err);
      }
  }

    //-------------------------------------------------
    // アカウントのグループ追加
  async function addToGroup() {

      try {
        const res=await client.mutations.addUserToGroup({
          groupName: chgAcc.groupname,
          userId: chgAcc.userid,
        })
        console.log('addUserToGroup call succeed',res);
      } catch (err) {
        console.log('addUserToGroup call error',err);
      }
  }

    // アカウントのグループ削除
    async function removeFromGroup() {

      try {
        const res=await client.mutations.removeUserFromGroup({
          groupName: chgAcc.groupname,
          userId: chgAcc.userid,
        })
        console.log('removeFromGroup call succeed',res);
      } catch (err) {
        console.log('removeFromGroup call error',err);
      }
  }

  return (
    <div> 
      <br />  
      <p>---------------------------------------------</p>
      <button onClick={getItem}>
        REST-API(GET)
      </button>
      <p>---------------------------------------------</p>
      <button onClick={createUser}>
        アカウントの登録
      </button>
      &nbsp; <button onClick={deleteUser}>
        アカウントの削除
      </button>
      &nbsp; <button onClick={getUser}>
        アカウントの取得
      </button>
      <br/><br/>
      &nbsp;<input
        onChange={(event) => setInput('userid', event.target.value)}
        value={newAcc.userid}
        placeholder="ユーザID（メールアドレス）"
      />
      <br/>
      {/* <p>---------------------------------------------</p> */}
      {/* <p><button onClick={() => listUsers(10)}>リスト取得</button></p>
      {accounts.map((account, index) => (
      <div key={account.Username ? account.Username : index} >
        <p >{account.Username}, {account.UserStatus}, {account.UserCreateDate}</p>
      </div>
       ))} */}
      <p>---------------------------------------------</p>
      <button onClick={addToGroup}>グループへの追加</button>
      &nbsp; <button onClick={removeFromGroup}>グループからの削除</button>
      <br/><br/>

      &nbsp;<input
        onChange={(event) => setInput2('userid', event.target.value)}
        value={chgAcc.userid}
        placeholder="ユーザID（メールアドレス）"
      />
      <br/>
      &nbsp;<input
        onChange={(event) => setInput2('groupname', event.target.value)}
        value={chgAcc.groupname}
        placeholder="グループ名"
      />
    </div>
     
  );
}

export default Account;