import createDataContext from './createDataContext';

const optionsReducer = (state, action) => {
  switch (action.type) {
    case 'edit_options':
      return action.payload;
    // case 'add_options':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 99999),
    //       title: action.payload.title,
    //       content: action.payload.content,
    //     },
    //   ];
    default:
      return state;
  }
};

const editOptions = (dispatch) => {
  return (lapLength, totalLaps, measurement, callback) => {
    dispatch({
      type: 'edit_options',
      payload: { lapLength, maxLaps, measurement },
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  optionsReducer,
  { editOptions },
  { lapLength: 100, totalLaps: 12, measurement: 'meters' }
);
