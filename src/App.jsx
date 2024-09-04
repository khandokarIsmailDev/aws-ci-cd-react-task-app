import React,{useReducer, useState} from "react";
import "./index.css";
import Page from "./Page";
import { TaskContext } from "./context";
import toast, { Toaster } from "react-hot-toast";
import { initialState, taskReduser } from "./reducer/TaskReduser";


const App = () => {
  // const [taskData, setTaskData] = useState(null);
  const [state,dispatch] = useReducer(taskReduser,initialState)

  return (
    <>
    <TaskContext.Provider value={{state,dispatch}}>
      <Toaster position="top-center" reverseOrder={false} />
      <Page /> 
       </TaskContext.Provider>
    </>

  );
};

export default App;
