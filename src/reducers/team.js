const initialState = [
  {
    id: 1,
    text: "Static Team",
    members: [
      {
        user_id: 3,
        name: "test1",
        discription: "Some Discription"
      }
    ]
  }
];

const team = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TEAM":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          members: []
        }
      ];
    case "ADD_TEAM_MEMBERS":
      return state.map(team =>
        team.id === action.id
          ? {
              ...team,
              members: [
                ...team.members,
                {
                  user_id: action.user_id,
                  name: action.name,
                  discription: action.discription
                }
              ]
            }
          : team
      );
    case "DELETE_MEMBER":
      return state.map(team =>
        team.id === action.id
          ? {
              ...team,
              members: team.members.filter(
                mem => mem.user_id !== action.user_id
              )
            }
          : team
      );
    default:
      return state;
  }
};

export default team;
