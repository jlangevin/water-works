import React from 'react';
import Resource from "../Resource";
import { types } from "../../store/reducers/waterBarReducer";
import './Floor.css';

type TFloorProps = {
  floorId: number;
  resources: any;
  dispatch: any;
}

const Floor: React.FC<TFloorProps> = ({ floorId, resources, dispatch }) => {

  const handleChange = (floorId: number, resourceType: string) => {
    dispatch({
      type: types.TOGGLE_STATUS,
      payload: {
        floorId,
        resourceType
      }
    });
  };

  return (
    <div className="Floor">
      <h3>Floor { floorId }</h3>
      <div>
        {
          "waterBarDispenser" in resources &&
          <Resource
            label={`Water Dispenser`}
            status={resources.waterBarDispenser}
            clickHandler={() => handleChange(floorId, "waterBarDispenser")}
          />
        }
        {
          "waterBarSink" in resources &&
          <Resource
            label={"Sink"}
            status={resources.waterBarSink}
            clickHandler={() => handleChange(floorId, "waterBarSink")}
          />
        }
      </div>
    </div>
  );
}

export default Floor;
