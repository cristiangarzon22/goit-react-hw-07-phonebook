import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "redux/operations";
import Bar from "./addBar";
import List from "./contactList";

export const App = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      <Bar />
      <List />
    </div>
  );
};
