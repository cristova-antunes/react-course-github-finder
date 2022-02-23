export const GITHUB_REDUCER_ACTIONS = {
  GET_USERS: "GET_USERS",
  GET_USER_AND_REPO: "GET_USER_AND_REPO",
  SET_LOADING: "SET_LOADING",
  CLEAR_USERS: "CLEAR_USERS",
};

const githubReducer = (state, action) => {
  switch (action.type) {
    case GITHUB_REDUCER_ACTIONS.GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };

    case GITHUB_REDUCER_ACTIONS.GET_USER_AND_REPO:
      return {
        ...state,
        user: action.payload.user,
        userRepos: action.payload.repos,
        isLoading: false,
      };

    case GITHUB_REDUCER_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GITHUB_REDUCER_ACTIONS.CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export default githubReducer;
