import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetToken from '../hooks/useGetToken'
import axios from 'axios'


function Create() {

    const [name,setName] =useState('')
    const [weight,setWeight] =useState('')
    const [height,setHeight] =useState('')
    const [ability,setAbility] =useState('')
    const [error,setError] =useState(false)
    const token = useGetToken();
    console.log("test   " + token.token);
   

    const navigate = useNavigate()
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(name.length==0||weight.length==0||height.length==0||ability.length==0){
            setError(true)
        }
        if(name && weight && height && ability){
            //console.log(id,name,weight,height,ability)
        
            axios.post("http://localhost:8000/",{
            //key: index,
            name: name,
            weight: weight,
            height: height,
            ability: ability
        },{
            headers: {
                "Authorization" : `Bearer ${token.token} `
            }
        })
        .then(result => {
            
             alert("Inserted Sucessfully.")
             navigate('/Home')
        })
        .catch(
            err =>{ 
            console.log(err)
            alert("Creation Unsucessful : "+ err)
            navigate('/')
            }
        )
        }
    }
    
 //table
  return (
    <div className='content'>
        <div className='header'>
            <h3>Add New Pokemon</h3>
        </div>
        
            <form onSubmit={handleSubmit}>

                <div className='name'>
                    <label htmlFor='lname'className='ilabel'>Name :</label><br/>
                    <input 
                        type='text' 
                        name='iname' 
                        className='form-control' 
                        placeholder='enter name'
                        onChange={e=> setName(e.target.value)}
                        required
                    />
                </div>

                {/*error && name.length<=0? <label className='label'>Name can't be empty</label>:""*/}

                <div className='weight'>
                    <label htmlFor='lweight'className='ilabel'>Weight :(KG)</label><br/>
                    <input 
                        type='integer' 
                        name='iweight' 
                        className='form-control' 
                        placeholder='enter weight in kg'
                        onChange={e=> setWeight(e.target.value)}
                        required
                    />
                </div>
                
                {/*error && weight.length<=0? <label className='label'>Weight can't be empty</label>:""*/}

                <div className='height'>
                    <label htmlFor='lheight'className='ilabel'>Height(M) :</label><br/>
                    <input 
                        type='integer' 
                        name='iheight' 
                        className='form-control' 
                        placeholder='enter height in m'
                        onChange={e=> setHeight(e.target.value)}
                        required
                    />
                </div>
                
                {/*error && height.length<=0? <label className='label'>Height can't be empty</label>:""*/}

                <div className='ability'>
                    <label htmlFor='lability' className='ilabel'>Ability :</label><br/>
                    <input 
                        type='text' 
                        name='iability' 
                        className='form-control' 
                        placeholder='enter ability("fire","water","ground")'
                        onChange={e=> setAbility(e.target.value)}
                        required
                    />
                </div>
            
                {/*error && ability.length<=0? <label className='label'>Ability can't be empty</label>:""*/}
                
                <button className='btnSubmit'>Submit</button>
            </form>
        
    </div>
  )
}

export default Create
/*

<div className='id'>
                    <label htmlFor='lid'>ID :</label><br/>
                    <input 
                        type='text' 
                        name='iid' 
                        className='form-control' 
                        placeholder='enter id'
                        onChange={e=> setId(e.target.value)}
                    />
                </div>

<select id="Ability" name="ability">
     <option value="au">Plant</option>
      <option value="ca">Fire</option>
      <option value="usa">Bug</option>
      <option value="au">Fairy</option>
       <option value="ca">Dragon</option>
       <option value="usa">Shadow</option>
        <option value="au">Ground</option>
         <option value="ca">Normal</option>
        <option value="usa">Psychic</option>
          <option value="au">Steel</option>
         <option value="ca">Dark</option>
         <option value="usa">Electric</option>
        onChange={e=> setAbility(e.target.value)}
</select>
 */