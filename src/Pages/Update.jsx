import React, { useEffect, use, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
//import { updateUser } from '../Reducers/UserReducer';
//import Home from './Home';
import axios from "axios";
import useGetToken from '../hooks/useGetToken'

function Update() {
   
    const {id} = useParams();
    const pokemons = useSelector((state)=> state.pokemons);
    const [pid,setId] =useState('')
    const [name,setName] =useState('')
    const [weight,setWeight] =useState('')
    const [height,setHeight] =useState('')
    const [ability,setAbility] =useState('')
    const [error,setError] =useState(false)

    const navigate = useNavigate();
    const token = useGetToken();
    console.log("test   " + token.token);

    /* get all data
     useEffect(()=> {
        axios.get('http://localhost:8000')
        .then(result => setPokemons(result.data))
        .catch(err => console.log(err))
    },[])
    */

    //get specific data
    useEffect(()=>{
        axios.get("http://localhost:8000/"+id,{
            name,
            weight,
            height,
            ability
        },{
            headers: {
                "Authorization" : `Bearer ${token.token} `
            }
        })
        .then(res => {
            console.log(res.data.name)
            setName(res.data.name)
            setWeight(res.data.weight)  
            setHeight(res.data.height)  
            setAbility(res.data.ability)
               
        })  
        .catch(err => console.log(err))
         console.log(name)
    }, [])

    //update new data
    const handleUpdate = (event)=> {
        event.preventDefault();
        
        //Empty field validations
        if(id.length==0||name.length==0||weight.length==0||height.length==0||ability.length==0){
            setError(true)
        }
        if(id && name && weight && height && ability){
            //console.log(id,name,weight,height,ability)

        axios.put("http://localhost:8000/"+id,{
            name,
            weight,
            height,
            ability

        },{
            headers: {
                "Authorization" : `Bearer ${token.token} `
            }
        })
        .then(result => {
             //console.log(result)
             alert("Updated Sucessfully.")
             navigate('/Home')
        })
        .catch(
            err =>{ 
            console.log(err)
            alert("Update Unsucessful : "+ err)
            navigate('/')
            }
        )
    }
    }
    
    //table
    return (
        <div className='content'>

            <div className='header'>
                <h3>Update Pokemon</h3>
            </div>

            <form onSubmit={handleUpdate}>
                
                <div className='name'>
                    <label htmlFor='lname'className='ilabel'>Name</label><br/>
                    <input 
                        type='text' 
                        name='iname' 
                        className='form-control' 
                       //placeholder='enter name'
                       onChange={e=> setName(e.target.value)}
                       value={name}
                       required
                    />
                </div>

                <div className='weight'>
                    <label htmlFor='lweight' className='ilabel'>Weight</label><br/>
                    <input 
                        type='integer' 
                        name='iweight' 
                        className='form-control' 
                        //placeholder='enter weight in kg'
                        onChange={e=> setWeight(e.target.value)}
                        value={weight}
                        required
                    />
                </div>

                <div className='height'>
                    <label htmlFor='lheight' className='ilabel'>Height</label><br/>
                    <input 
                        type='integer' 
                        name='iheight' 
                        className='form-control' 
                        //placeholder='enter height in cm'
                        onChange={e=> setHeight(e.target.value)}
                        value={height}
                        required
                    />
                </div>

                <div className='ability'>
                    <label htmlFor='lability' className='ilabel'>Ability</label><br/>
                    <input 
                        type='text' 
                        name='iability' 
                        className='form-control' 
                        //placeholder='enter ability("fire","water","ground")'
                        onChange={e=> setAbility(e.target.value)}
                        value={ability}
                        required
                    />
                </div>
               
                <br/>
                <button className='btnEdit'>Update</button>
                
            </form>
        
        </div>
      )
}

export default Update
/* 
Error message for user input
{error && ability.length<=0? <label className='label'>Ability can't be empty</label>:""}
*/