import createDataContext from './createDataContext';

const eventReducer = (state, action) => {
  switch (action.type) {
    // case 'edit_blogpost':
    //   return state.map((blogPost) => {
    //     return blogPost.id === action.payload.id ? action.payload : blogPost;
    //   });
    // case 'delete_blogpost':
    //   return state.filter((blogPost) => blogPost.id !== action.payload);
    case "add_event":
      return {
        id: Math.floor(Math.random() * 99999),
        title: action.payload.title,
        lapLength: parseInt(action.payload.lapLength),
        measurement: action.payload.measurement,
        maxLaps: parseInt(action.payload.maxLaps),
      };
    default:
      return state;
  }
};

const addEvent = (dispatch) => {
  return (title, lapLength, measurement, maxLaps, callback) => {
    dispatch({
      type: "add_event",
      payload: { title, lapLength, measurement, maxLaps },
    });
    if (callback) {
      callback();
    }
  };
};
// const deleteBlogPost = (dispatch) => {
//   return (id) => {
//     dispatch({ type: 'delete_blogpost', payload: id });
//   };
// };
// const editBlogPost = (dispatch) => {
//   return (id, title, content, callback) => {
//     dispatch({
//       type: 'edit_blogpost',
//       payload: { id, title, content },
//     });
//     if (callback) {
//       callback();
//     }
//   };
// };

export const { Context, Provider } = createDataContext(
  eventReducer,
  { addEvent },
  { }
);
