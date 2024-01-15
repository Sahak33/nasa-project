import React from 'react';
import "./paper.scss"
const Paper = ({children,style}) => {
  return (
    <div  style={style} className={"paper"}>
      {children}
    </div>
  );
};

export default Paper;