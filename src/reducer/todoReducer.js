import { GETALL, ADD, MarkComplete, EDIT, Delete } from "../utils/action";

function todoReducer(state, { type, payload }) {
  switch (type) {
    case GETALL: {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem("todos"));
      const newItems = dataFromLocalStorage ? dataFromLocalStorage : [];
      return [...state, ...newItems];
    }
    case ADD:
      const result = [...state, payload];
      localStorage.setItem("todos", JSON.stringify(result));
      return result;
    case MarkComplete: {
      const index = state.findIndex(x => x.id === payload.id);
      if (index > -1) {
        state[index].completed = true;
      }
      const result = [...state];
      localStorage.setItem("todos", JSON.stringify(result));
      return [...state];
    }
    case EDIT: {
      const result = state.map(st => {
        if (st.id === payload.id) {
          st.title = payload.title;
        }
        return st;
      });
      localStorage.setItem("todos", JSON.stringify(result));
      return result;
    }
    case Delete: {
      const result = state.filter(st => st.id !== payload.id);
      localStorage.setItem("todos", JSON.stringify(result));
      return result;
    }
    default:
      throw new Error();
  }
}

export default todoReducer;
