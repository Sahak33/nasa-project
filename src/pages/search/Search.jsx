import React, {useState} from 'react';
import "./search.scss"
import Paper from "../../components/paper/Paper";
import {useForm} from "react-hook-form";
import Input from "../../components/input/Input";
import {yearPattern} from "../../constants/constants";
import {getData} from "../../utils/getData/getData";
import Loader from "../../components/loader/loader";
import {useNavigate} from "react-router-dom";

function Search() {
  const form = JSON.parse(localStorage.getItem("form"))
  const {register, reset, handleSubmit, formState: {errors}} = useForm({defaultValues:{...form}});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const collections = JSON.parse(localStorage.getItem("collections"))

  const onSubmit = async data => {
    const {search, year_end, year_start} = data
    const params = new URLSearchParams({
      q: search
    });
    if (year_end) {
      params.append('year_end', year_end);
    }
    if (year_start) {
      params.append('year_start', year_start);
    }
    setLoading(true)
    localStorage.setItem("form",JSON.stringify(data))
    try {
      const res = await getData(params)
      localStorage.setItem("collections", JSON.stringify(res.collection.items))
      setLoading(false)

    } catch (e) {
      setLoading(false)
      localStorage.removeItem("collections")

    }
  }

  const showClick = (data) => {
    navigate("/show")
    localStorage.setItem("collection", JSON.stringify(data))
  }

  const deleteClick = () => {
    reset()
    localStorage.removeItem("collections")
    localStorage.removeItem("form")
  }
  return (
    <div className={"search-page"}>
      <Paper>
        <form className={"search-page__form"} onSubmit={handleSubmit(onSubmit)}>
          <h1>Search box</h1>
          <Input isRequired placeholder={"Enter text"} errors={errors} register={register} label={"Search Collection"}
                 name={"search"}/>
          <Input placeholder={"Enter start year"} errors={errors} register={register} label={"Start year"}
                 name={"year_start"}
                 pattern={yearPattern}/>
          <Input placeholder={"Enter end year"} errors={errors} register={register} label={"End year"}
                 name={"year_end"}
                 pattern={yearPattern}/>
          <button disabled={loading}>
            {loading ? <Loader/> : "Search"}
          </button>
        </form>
      </Paper>
      <button onClick={deleteClick} className={"search-page__delete-button"} type="reset">Delete All
      </button>
      {!!collections?.length && <div className={"search-page__results"}>
        <Paper style={{maxHeight: "100%", overflowY: "auto"}}>
          <div className={"search-page__results__item"}>
            {collections?.map(({data, links}, index) =>
              <div key={index}>
                <Paper>
                  <div className={"search-page__results__item__context"}>
                    <p>{data?.[0].title}</p>
                    {links?.[0]?.href && <img alt="image" src={links?.[0]?.href}/>}
                    <button type="button" onClick={() => showClick({...data?.[0], thumb: links?.[0]?.href})}>Show
                    </button>
                  </div>
                </Paper>
              </div>
            )}
          </div>
        </Paper>

      </div>}
    </div>
  );
}

export default Search;