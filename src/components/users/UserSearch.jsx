import { useState, useContext } from "react";
import { GITHUB_REDUCER_ACTIONS } from "../../context/github/GithubReducer";
import GithubContext from "../../context/github/GithubContext";
import { searchUsers } from "../../context/github/GithubActions";
import AlertContext, { ALERT_TYPE } from "../../context/alert/AlertContext";

export default function UserSearch() {
  const [text, setText] = useState("");
  const { users, dispatch } = useContext(GithubContext);

  const { setAlert } = useContext(AlertContext);

  function handleChange(e) {
    setText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (text === "") {
      setAlert("Please fill the field", ALERT_TYPE.error);
    } else {
      dispatch({
        type: GITHUB_REDUCER_ACTIONS.SET_LOADING,
      });

      const users = await searchUsers(text);

      dispatch({
        type: GITHUB_REDUCER_ACTIONS.GET_USERS,
        payload: users,
      });
      setText("");
    }
  }

  function handleClearBtn() {
    dispatch({
      type: GITHUB_REDUCER_ACTIONS.CLEAR_USERS,
    });
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClearBtn} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
