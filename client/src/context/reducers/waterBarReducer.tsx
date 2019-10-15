export interface IPayload {
  floorId: number;
  type: string;
  status: boolean;
}

export type IAction = {
  type: string,
  payload: IPayload
};

export type IFloorResources = {
  waterBarDispenser: boolean;
  waterBarSink: boolean;
};

export interface IState {
  [index: number]: IFloorResources;
}

export const initialState: IState = {
  1: {
    waterBarDispenser: true,
    waterBarSink: true
  },
  3: {
    waterBarDispenser: true,
    waterBarSink: true
  },
  5: {
    waterBarDispenser: true,
    waterBarSink: true
  },
  7: {
    waterBarDispenser: true,
    waterBarSink: true
  },
  9: {
    waterBarDispenser: true,
    waterBarSink: true
  }
};

export const types = {
  SET_STATUS: "SET_STATUS"
};

export const reducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case types.SET_STATUS:

      // Grab copy of current floor resources
      const newFloorState = {
        ...state[action.payload.floorId],
        [action.payload.type]: action.payload.status
      };

      const newState = {
        ...state,
        ...{
          [action.payload.floorId]: newFloorState
        }
      };
      
      return newState;

    default:
      return state;
  }
};
