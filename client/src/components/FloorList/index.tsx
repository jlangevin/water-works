import React from "react";
import { initialState, waterBarReducer } from "../../store/reducers/waterBarReducer";
import Floor from "../Floor";
import "./FloorList.css";

type TFloorListProps = {}

const FloorList: React.FC<TFloorListProps> = () => {

  const [floors, dispatch] = React.useReducer(
    waterBarReducer,
    initialState
  );

  const floorIds = Object.keys(floors);

  return (
    <ul>
      {
        floorIds.map((floorId: any) => (
          <li key={floorId}>
            <Floor
              floorId={floorId}
              resources={floors[floorId]}
              dispatch={dispatch}
            />
          </li>
        ))
      }
    </ul>
  );
}

export default FloorList;
