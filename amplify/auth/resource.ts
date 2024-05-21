import { defineAuth } from '@aws-amplify/backend';
import { addUserToGroup } from "../data/add-user-to-group/resource"
import { removeUserFromGroup } from "../data/remove-user-from-group/resource"
import { createUser } from "../data/create-user/resource"
import { deleteUser } from "../data/delete-user/resource"
import { getUser } from "../data/get-user/resource"
import { postConfirmation } from "../auth/post-confirmation/resource"
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },

  groups: ["ADMINS"],

  access: (allow) => [
    allow.resource(createUser).to(["createUser"]),
    allow.resource(deleteUser).to(["deleteUser"]),
    allow.resource(getUser).to(["manageUsers"]),
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(removeUserFromGroup).to(["removeUserFromGroup"]),
  ],
  triggers: {
    postConfirmation
  }

});
