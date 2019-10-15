import React, { createContext, useEffect, useReducer } from 'react';
import { initialState, reducer, IState } from './reducers/waterBarReducer';
import { useActions } from './actions/waterBarActions';

interface IContextProps {
  state: IState;
  dispatch: ({type}:{type:string}) => void;
}

export const StoreContext = createContext(initialState);

export const StoreProvider = function(props: any) {
  // Get state and dispatch from Reacts new API useReducer. 
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get actions from useActions and pass it to Context
  const actions = useActions(state, dispatch);
  
  // Log new state
  useEffect(() => console.log({ newState: state }), [state]);
  
  let contextObj = { state, dispatch, actions };
  // Render state, dispatch and special case actions
  return (
    <StoreContext.Provider
      value={contextObj}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
