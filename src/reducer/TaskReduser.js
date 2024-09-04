const initialState = {
  taskData: null,
};

const taskReduser = (state, action) => {
  switch (action.type) {
    case "EDIT_MODAL":
      return {
        taskData: null,
      };
      break;

    case "ALL_DELETE":
      return {
        taskData: [...action.payload],
      };
      break;

    case "TASK_EDIT":
      return {
        ...state,
        taskData: {
          ...state.taskData,
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          tags: action.payload.tags,
          priority: action.payload.priority,
          isFavorite: action.payload.isFavorite,
        },
      };
      break;
  }
};

export { initialState, taskReduser };
