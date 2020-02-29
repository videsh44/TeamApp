import { v4 } from "node-uuid";

export const createTeam = text => ({
  type: "CREATE_TEAM",
  id: v4(),
  text
});

export const addTeamMembers = (id, text, name, discription) => {
  return {
    type: "ADD_TEAM_MEMBERS",
    id: id,
    text: text,
    user_id: v4(),
    name,
    discription
  };
};

export const deleteTeamMember = (id, user_id) => {
  return {
    type: "DELETE_MEMBER",
    id: id,
    user_id: user_id
  };
};
