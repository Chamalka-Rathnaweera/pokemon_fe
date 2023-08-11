import axios from "axios";
import React, {useEffect, useState} from "react";
import './style.css'

function PokeInfo() {
    const [pokemons,setPokemons] = useState([])
    
    useEffect(()=> {
        axios.get('http://localhost:8000')
        .then(result => {
            setPokemons(result.data)
        })
        .catch(err => console.log(err))
        //console.log(pokemons);
    },[])
  return (
    <>
         <h1>Hello</h1>
         {
            //loading ? <h1>Loading...</h1> :
            pokemons.map((pokemon)=>{
                return (
                    <>
                        <div className="card" /*onClick={()=>infoPokemon(item)}*/>
                            <h3>{pokemon.name}</h3>
                        </div>
                           <br/>
                    </>
                )
             })
        }
        </>
     )
 }

export default PokeInfo
