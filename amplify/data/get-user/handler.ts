import type { Schema } from "../resource"
import { env } from "$amplify/env/get-user"
import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"

type Handler = Schema["getUser"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {

  console.log("## call AdminGetUserCommand")
  const { userId } = event.arguments
  const command = new AdminGetUserCommand({
    Username: userId,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  })
  const response = await client.send(command)

  console.log("## end AdminGetUserCommand")
  return response
}