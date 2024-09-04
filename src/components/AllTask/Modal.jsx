import React, { useContext, useState } from "react";
import { TaskContext } from "../../context";
import toast from "react-hot-toast";

const Modal = ({onClose,onSave}) => {

    //global state
    const {state,dispatch} = useContext(TaskContext)

  const [formData,setFormData] = useState(state.taskData || {
    id:crypto.randomUUID(),
    title:"",
    description:"",
    tags:[],
    priority:"",
    isFavorite: false
  })

  const [error,setError] = useState({})

  // console.log(formData)

  const [isAdd, setIsAdd] = useState(Object.is(state.taskData, null))



  function handleChange(event){
    const name = event.target.name 
    let value = event.target.value 
      
      if(name === "tags"){
        value = value.split(",")
      }
  
      setFormData({
        ...formData,
        [name]:value
      })
    
  }

   
  function handleSubmit (e){
    e.preventDefault()

    let addErrors = {}

    if(!formData.title.trim()){
       addErrors.title = 'Title can not be empty!'
       toast.error(addErrors.title)
     }else if(!formData.description.trim()){
       addErrors.description='Description can not be empty!'
       toast.error(addErrors.description)
     }else if(formData.tags.length===0){
       addErrors.tags='Minimum One tag needed!'
       toast.error(addErrors.tags)
     }

     if(Object.keys(addErrors).length === 0){
      onSave(formData,isAdd)
     }

     
       setError(addErrors);
  }

  

  return (
    <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-10 left-0">
      <form onSubmit={handleSubmit} className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
        <button
          type="button"
          className="bg-white rounded-md float-end p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={onClose}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6 hover:rotate-45 ease-in-out duration-500 hover:text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {isAdd ? "Add New Task" : "Edit Task" }
        </h2>
        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={(e) => handleChange(e)}
              required=""
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              required=""
              value={formData.description}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={e => handleChange(e)}
                required=""
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                id="priority"
                value={formData.priority}
                onChange={e => handleChange(e)}
                required=""
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            
          >
            {isAdd ? "Add New Task" : "Edit Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
