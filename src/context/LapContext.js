import createDataContext from './createDataContext';
// import jsonServer from '../api/jsonServer';

const lapReducer = (state, action) => {
  switch (action.type) {
    case 'add_lap':
      ///console.log('add_lap', state, action)
      // debugger
      return {...state, laps: [...state.laps, {
        id: Math.floor(Math.random() * 99999), 
        time: action.payload.time,
        lapNumber: state.laps.length + 1,
        lapTime: action.payload.lapTime,
      }] }
    // case 'get_laps':
    //   return action.payload;
    // case 'edit_lap':
    //   return state.map(lap => {
    //     return lap.id === action.payload.id ? action.payload : lap;
    //   });
    case 'delete_lap':
      let laps = [];
      let lapNumber = 1;
      for (let i=0; i < state.laps.length; i++) {
          if (state.laps[i].id === action.payload) {
              laps[i-1].time = laps[i-1].time + state.laps[i].lapTime;
              laps[i-1].lapTime = laps[i-1].lapTime + state.laps[i].lapTime;
          } else {
              laps[lapNumber-1] = {id: state.laps[i].id, time: state.laps[i].time, lapNumber: lapNumber, lapTime: state.laps[i].lapTime};
              lapNumber++;
          }
      }
      return {...state, laps};
    case 'reset_laps':
      return {...state, laps: action.payload};
    case 'set_active':
      return { ...state, active: !state.active };
    default:
      return state;
  }
};

const getLaps = dispatch => {
  return async () => {
    const response = await jsonServer.get('/laps');
    dispatch({ type: 'get_laps', payload: response.data });
  };
};

const addLap = dispatch => {
  return (time, lapTime, callback) => {
    dispatch({ type: 'add_lap', payload: { time, lapTime } });
    if (callback) {
      callback();
    }
  };
};

const deleteLap = dispatch => {
  return id => {
    // await jsonServer.delete(`/laps/${id}`);
    dispatch({ type: 'delete_lap', payload: id });
  };
};

const editLap = dispatch => {
  return async (id, time, callback) => {
    await jsonServer.put(`/laps/${id}`, { time });

    dispatch({
      type: 'edit_lap',
      payload: { id, time }
    });
    if (callback) {
      callback();
    }
  };
};

const toggleCounter = dispatch => {
  return async () => {
  dispatch({
    type: 'set_active',
    payload: { active: true }
  })
}
}

const resetLaps = dispatch => {
  return async () => {
    dispatch({type: 'reset_laps', payload: []})
  } 
}

export const { Context, Provider } = createDataContext(
  lapReducer,
  { addLap, deleteLap, editLap, getLaps, resetLaps, toggleCounter },
  {
    active: false,
  laps: 
  [
    /*
    {
        "id": 98779,
        "time": 1651850627356,
        "lapNumber": 1,
        "lapTime": 1282
    },
    {
        "id": 53351,
        "time": 1651850628586,
        "lapNumber": 2,
        "lapTime": 1230
    },
    {
        "id": 25853,
        "time": 1651850629122,
        "lapNumber": 3,
        "lapTime": 536
    },
    {
        "id": 29122,
        "time": 1651850630066,
        "lapNumber": 4,
        "lapTime": 944
    },
    {
        "id": 85264,
        "time": 1651850631154,
        "lapNumber": 5,
        "lapTime": 1088
    },
    {
        "id": 67758,
        "time": 1651850632041,
        "lapNumber": 6,
        "lapTime": 887
    },
    {
        "id": 25073,
        "time": 1651850632938,
        "lapNumber": 7,
        "lapTime": 897
    },
    {
        "id": 69576,
        "time": 1651850633790,
        "lapNumber": 8,
        "lapTime": 852
    },
    {
        "id": 66399,
        "time": 1651850634449,
        "lapNumber": 9,
        "lapTime": 659
    },
    {
        "id": 41698,
        "time": 1651850635153,
        "lapNumber": 10,
        "lapTime": 704
    }
    */
  ]
}
);
