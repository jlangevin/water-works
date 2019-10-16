export interface IPayload {
  floorId: number;
  resourceType: string;
}

export interface IAction {
  type: string,
  payload: IPayload
};

export interface IFloorResources {
  waterBarDispenser?: boolean;
  waterBarSink?: boolean;
  [key: string]: boolean | undefined; // This allows the object to be indexable by key, this is not a new property
};

export interface IState {
  [index: number]: IFloorResources;
}

export const initialState: IState = {
  1: {
    waterBarDispenser: true
  },
  3: {
    waterBarDispenser: false,
    waterBarSink: true
  },
  5: {
    waterBarDispenser: true,
    waterBarSink: false
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
  TOGGLE_STATUS: "TOGGLE_STATUS"
};

export const waterBarReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case types.TOGGLE_STATUS:

      // Get the current status of the floor resource
      const currStatus = state[action.payload.floorId][action.payload.resourceType];

      // Grab copy of current floor resources
      const newFloorState = {
        ...state[action.payload.floorId],
        [action.payload.resourceType]: !currStatus
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
