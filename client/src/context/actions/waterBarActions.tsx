import { types, IPayload, IState } from "../reducers/waterBarReducer";

export const useActions = (state: IState, dispatch: any) => {
  function toggleResource({ floorId, type, status }: IPayload) {
    // Ensure the floor is defined (not all floors have waterbars)
    const floorInfo = typeof state[floorId];
    if (floorInfo !== "undefined") {
      alert("Floor is invalid");
    } else {
      // Ensure the resource is defined (not all floors have a sink at the water dispenser)
      const resourceIndex = Object.keys(floorInfo).indexOf(type);
      if (resourceIndex !== -1) {
        alert("Resource is invalid");
      }
      dispatch({
        type: types.SET_STATUS,
        payload: {
          floorId: floorId,
          type: type,
          status: status
        }
      });
    }
  }
  
  return {
    toggleResource
  };
};