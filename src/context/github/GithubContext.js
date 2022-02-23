import { createContext, useReducer } from "react";
import githubReducer, { GITHUB_REDUCER_ACTIONS } from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvier = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    userRepos: [],
    isLoading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //Get search users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const { items } = await response.json();

    dispatch({
      type: GITHUB_REDUCER_ACTIONS.GET_USERS,
      payload: items,
    });
  };

  //Get single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "notfound";
    } else {
      const data = await response.json();

      dispatch({
        type: GITHUB_REDUCER_ACTIONS.GET_USER,
        payload: data,
      });
    }
  };

  //Get single user
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({
      type: GITHUB_REDUCER_ACTIONS.GET_USER_REPOS,
      payload: data,
    });
  };

  const clearUsers = () =>
    dispatch({ type: GITHUB_REDUCER_ACTIONS.CLEAR_USERS });

  const setLoading = () =>
    dispatch({ type: GITHUB_REDUCER_ACTIONS.SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        userRepos: state.userRepos,
        isLoading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
