//import "./App.css";
import React, { useState, useEffect } from 'react';
//import Pagination from './ImportedPoke/Pagination'
import Pagination from './Pagination';
import Axios from 'axios'
import PokemonList from './PokemonList';
//import { useState } from "react";
//import Axios from "axios";
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";

function App() {
  
  const [pokeman, setPokeman] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
    Axios.get(currentPageUrl, {
      cancelToken: new Axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokeman(res.data.results.map(p => p.name))
    })

    return () => cancel()
  }, [currentPageUrl])
  
  /*Search Field
  const [ID, setID] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = {ID};
    }
  */

  /* Page Link
  const navigate = useNavigate();
  const handleGoToMenu = () => navigate("menu");*/

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  
  if (loading) return "Loading..."
    
  return (
    
   
    <>
      <h2>Pokemon</h2>
      {/*<form onSubmit={handleSubmit}>
          <label>Enter ID :  </label>
          <input
             type = "text"
             placeholder=" 001"
             required
             value = {ID}
             onChange ={(e) => setID(e.target.value)}
          />
             <button>search</button>
          <br/>    
       </form>*/}

      <PokemonList pokemon={pokeman} />
      
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  
  );
}

export default App;