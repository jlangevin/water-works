import React from 'react';
import './Resource.css';

type TResourceProps = {
  label: string;
  status: boolean;
  clickHandler: any;
}

const Resource: React.FC<TResourceProps> = ({ label, status, clickHandler }) => {
  return (
    <div className="Resource">
      { label }: 
      <button className={`btn ${status ? "working" : "fade"}`} onClick={clickHandler}>{ "Working" }</button>
      <button className={`btn ${status ? "fade" : "ooo"}`} onClick={clickHandler}>{ "Out of Order" }</button>
    </div>
  );
}

export default Resource;
