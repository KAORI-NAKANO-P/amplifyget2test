
import '@aws-amplify/ui-react/styles.css'
import { useEffect } from "react";
import { get } from 'aws-amplify/api';
import { fetchAuthSession } from 'aws-amplify/auth';
import outputs from "../../amplify_outputs.json"
import { Amplify } from "aws-amplify"

Amplify.configure(outputs)

const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    REST: outputs.custom.API,
  },
});
const session = await fetchAuthSession();
const token = session.tokens?.idToken

// Amplify.configure(outputs, {
//   API: {
//     REST: {
//       options:{
//         headers: async () => {
//         return { Authorization: token };
//         }
//       }
//     }
//   }
// });

// 開始
const RestApi = () => {

  useEffect(() => {
  }, []);

  async function getItem() {
    try {
      const authSession = (await fetchAuthSession()).tokens;
      console.log(`${authSession?.accessToken.toString()}`)


      const session = await fetchAuthSession();
      const token = session.tokens?.idToken

      const restOperation = get({ 
        apiName: 'myRestApi',
        path: 'items' ,
        options: {
          headers: {
            'Content-Type' : 'application/json',
            //Authorization: `${authSession?.accessToken.toString()}`
            Authorization: `${authSession?.idToken?.toString}`
            
          }
        }
      });
      const response = await restOperation.response;
      console.log('GET call succeeded: ', response);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  
  return (
    <div> 
      <br />  
      <p>---------------------------------------------</p>
      <button onClick={getItem}>
        REST-API(GET)
      </button>
    </div>
     
  );
}

export default RestApi;