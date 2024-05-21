import type { Schema } from "../resource"
import { env } from "$amplify/env/create-user"
import {
  AdminCreateUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider"
import { Amplify } from "aws-amplify";
import { createUserProfile } from "./graphql/mutations";
import { generateClient } from "aws-amplify/data";

type Handler = Schema["createUser"]["functionHandler"]
const client = new CognitoIdentityProviderClient()

export const handler: Handler = async (event) => {

  console.log("## call AdminCreateUserCommand")
  const { userId } = event.arguments
  const command = new AdminCreateUserCommand({
    Username: userId,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  })
  const response = await client.send(command)

  console.log("## end AdminCreateUserCommand")

  return response
}