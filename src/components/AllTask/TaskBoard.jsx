import React, { useContext, useState } from "react";
import TaskList from "./TaskList";
import TaskAction from "./TaskAction";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { TaskContext } from "../../context";
import { allData } from "../../data/allData";


const TaskBoard = () => {

    const {state,dispatch} = useContext(TaskContext)

    //modal show hide state
    const [showModal,setShowModal] = useState(false)

    //taskData set state
    const [tasks,setTasks] = useState(allData)
    console.log(tasks)

    //for search
    const [originalTasks, setOriginalTasks] = useState([...tasks]);
  

    function handleEditModal(){
        setShowModal(true)
        dispatch({
            type:"EDIT_MODAL",
            payload:null
        })
        // setTaskData(null)
    }

    function handleCloseModal(){
        setShowModal(false)
    }

    function handleSave(newTask,isAdd){
        if (isAdd) {
            setTasks([...tasks, newTask]);
            toast.success("User Saved Successfully")
        } else {
            setTasks(tasks.map(task =>{
                if(task.id === newTask.id){
                    toast.success("Update Successfully")
                    return newTask
                }
                return task
            }))
        }
        
        setShowModal(false)
        
    }

    function handleDelete(taskId){
        const deletedTask = tasks.filter(task => task.id !== taskId)
        setTasks(deletedTask)
    }

    function handleAllDelete(){
        tasks.length = 0
        dispatch({
            type :"ALL_DELETE",
            payload:tasks
        })
        // setTaskData([
        //     ...tasks
        // ])
    }

    function handleSearch(searchText){
        const searchFilter = tasks.filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()))
        if(searchText.trim() === ''){
            console.log(searchText)
            setTasks(originalTasks)
        }else{
            setTasks([...searchFilter])
        }

        // console.log("ai holo :" + searchText)
        
    }

    function handleFavorite(taskId){
        const taskIndex = tasks.findIndex(task=>task.id === taskId)
    const newTask = [...tasks]
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite  // er mane toggle koralm value true hole false kore dilam , r false hole true kore dilam
    setTasks(newTask)
    console.log(taskId+'joij')
    }

  return (
    <>
    {
        showModal && <Modal
         onClose={handleCloseModal}
         onSave={handleSave}
         />
    }
    <section className="mb-20" id="tasks">
      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction editModal={handleEditModal} AllDelete={handleAllDelete} onSearch={handleSearch} />
          {
            tasks.length !== 0 ? (<TaskList tasks={tasks} onFav={handleFavorite} setShowModal={setShowModal} onDelete={handleDelete} />) : (<p className="just justify-center flex font-bold text-3xl">Task List is empty!</p>)
          }
          
        </div>
      </div>
    </section>
    </>
  );
};

export default TaskBoard;
