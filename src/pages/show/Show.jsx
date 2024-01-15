import React from 'react';
import Paper from "../../components/paper/Paper";
import "./showPage.scss"
import {formatDate} from "../../utils/formatDate/formatDate";
import {useNavigate} from "react-router-dom";
const Show = () => {

  const navigate=useNavigate()
  const data=JSON.parse(localStorage.getItem("collection"))
  const keywords=data?.keywords?.[0]?.split(",")


  return (
    <div className={"show-page"}>
      <div>
        <h6 onClick={()=>navigate(-1)}>{"< Back"}</h6>
      </div>
      <Paper>
        <div className={"show-page-result"}>
          <h4>{data?.title}</h4>
          {data?.thumb && <img alt="image" src={data?.thumb}/>}
          <h3>Description :</h3>
          <p>{data?.description}</p>
          <h3>Created at :</h3>
          <p>{formatDate(data?.date_created)}</p>
          <h5>Keywords</h5>
          <div className={"show-page-result__keywords"}>
            {keywords?.map((item, index) =>
              <div key={index}>
              <Paper>{item}</Paper>
                </div>
            )}

          </div>

        </div>
      </Paper>
    </div>
  );
};

export default Show;