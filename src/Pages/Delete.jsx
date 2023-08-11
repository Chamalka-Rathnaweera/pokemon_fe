/*import React from 'react'
import axios from "axios";
import useGetToken from '../hooks/useGetToken'
function Delete() {

    const token = useGetToken();
    console.log("test   " + token.token);

     //delete function
     const handleDelete = (id) =>{
        axios.delete('http://localhost:8000/'+id),{
            headers: {
                "Authorization" : `Bearer ${token.token} `
            }
        }
        .then(res => {
            console.log(res)
            alert("Deleted Sucessfully.")
            window.location.reload()
        })
        .catch(err => console.log(err))
        }
      
  return (
    <div>
     <button className="btnDelete" onClick={() => handleDelete}>Delete</button>
    </div>
  )
}

export default Delete*/
