export const initialState = { items: [], filter: 'all', sort: 'asc' };

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE':
      return { ...state, items: state.items.filter(task => task.id !== action.payload) };
    case 'TOGGLE':
      return { 
        ...state, 
        items: state.items.map(task => 
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ) 
      };
    case 'FILTER':
      return { ...state, filter: action.payload };
    case 'SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}

export default tasksReducer;
