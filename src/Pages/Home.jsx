import axios from "axios";
import { useState,useEffect } from 'react';
import './style.css'
import ReactPaginate from 'react-paginate';
import { useRef } from "react";
import { Auth } from 'aws-amplify';
import { Link, useNavigate,useParams } from "react-router-dom";
import useGetToken from '../hooks/useGetToken'

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

function Home(){

    const {id} = useParams();
    const [pokemons,setPokemons] = useState([])
    const [search,setSearch] = useState()

    const navigate = useNavigate();

    //search
    const [inputValue,setInputValue] = useState(0);

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10;
    const lastIndex = currentPage *recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = pokemons.slice(firstIndex,lastIndex);
    const npage = Math.ceil(pokemons.length / recordsPerPage)
    const numbers = [...Array(npage +1).keys()].slice(1)

    //Auth
    const token = useGetToken();
    console.log("test   " + token.token);
   
    //signout
    async function signOut() {
        try {
          await Auth.signOut();
          navigate('/')
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }

    //get all data
    // {Id:1 Name: "Charmender", Weight: 78, Height: 170, Ability: "fire"}
    useEffect(()=> {
        axios.get('http://localhost:8000')
        
        .then(result => {
         //{result?.length? (
            setPokemons(result.data)
         //): alert("No results to show.")}
            setSearch(result.data);
        })
        .catch(err => console.log(err))
        //console.log(pokemons);
    },[])
   
    //search function
    const handleSearch = (event) =>{
        event.preventDefault();
        axios.get('http://localhost:8000/'+id)
        .then(result => {
            console.log(result)
            //setPokemons(result.data)
        })
        .catch(err => console.log(err))
    }

    //delete function
    const handleDelete = (id) =>{
    axios.delete('http://localhost:8000/'+id,{
        headers: {
            "Authorization" : `Bearer ${token.token} `
        }
    })
    .then(res => {
        console.log(res)
        alert("Deleted Sucessfully.")
        window.location.reload()
    })
    .catch(
        err =>{ 
        console.log(err)
        alert("Deletion Unsucessful : "+ err)
        navigate('/')
        }
    )
    }
  
    //table
    return(
        <div className="conatiner">

            <div className="header">
                <button onClick={signOut} className="btnSignout">Sign out</button>
                <h2>Pokemon App</h2>
            </div>

            <div className='search'>
                <input 
                    type ="text" 
                    placeholder="Search..." 
                    onChange ={handleSearch}
                    className="searchTerm"

                    // onChangeCapture={(e)=>{
                    //     e.preventDefault()
                    //     setInputValue(e.target.value)
                    // }}
                />
		    </div>

            <Link to ="/create" className="btnCreate">Create</Link>
            
            <table className="table">
            
                <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Weight (KG) </th>
                        <th>Height (M) </th>
                        <th>Ability</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody className="tbody">
                  
                    {records?.map((pokemon)=>{
                        return <tr /*key={index}*/>
                       
                            <td>{pokemon.name}</td>
                            <td>{pokemon.weight}</td>
                            <td>{pokemon.height}</td>
                            <td>{pokemon.ability}</td>
                            <td>
                            <Link to = {`/update/${pokemon._id}`} className="btnEdit">Edit</Link>
                            <button className="btnDelete" onClick={() => handleDelete(pokemon._id)}>Delete</button>
                            </td> 
                        
                         </tr>
                        })
                    }
                </tbody>
                
            </table>
            
            {/* pagination */}
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href ='#' className="btnPagination"
                        onClick={prePage}>Prev</a>
                    </li>
                    <br/>
                    {
                        numbers.map((n,i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href="#" className="btnPagination"
                                onClick={() => changeCPage(n)}>{n}</a>
                            </li> 
                        ))
                    }<br/>
                    <li className='page-item'>
                        <a href="#" className="btnPagination"
                        onClick={nextPage}>Next</a>
                    </li> <br/>
                </ul>
            </nav>
            
            {/* footer */}
            <div className='footer'>
                <p>&copy; Sample application using React JS, Nest JS, Mongo DB</p>
            </div>

        </div>
    )
    
    function prePage(){
        if(currentPage !== 1){
            setCurrentPage(currentPage-1)
        }
    }
    function changeCPage(id){
        setCurrentPage(id)
    }
    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage+1)
        }

    }
}

export default Home
