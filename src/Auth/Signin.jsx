import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { awsExports } from './aws-exports';


function Signin(){
//const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [email, password] = useState('')
  const navigate = useNavigate()

    Amplify.configure({
      Auth: {
          region: awsExports.REGION,
          userPoolId: awsExports.USER_POOL_ID,
          userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
        }  
  })

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      console.log('Login.....');
      console.log(email);

      await Auth.signIn(email,password)
      console.log('Sign up successful')
      navigate('/home')
      fetchJwtToken()
      //.updateAuthStatus(true)
     
    } catch (error) {
      console.log('Error signing up:', error);
      alert('Error signing up : '+ error);
    }
  }

  //Session
  const fetchJwtToken = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      console.log("printint token " + token)
      while (true)
      if(token){
        navigate('/home')
        console.log("checking...")
        break;
      }
    } catch (error) {
      console.log('Error fetching JWT token:', error);
    }
  };

/*
async function handleSignin() {
  try {
    const user = await Auth.signIn(username, password);
    console.log('Sign up successful:', user);
    alert("Sucessfull")
    
  } catch (error) {
    console.log('error signing in', error);
  }
  <Home/>
}
*/
  return (
    <div className="form">
     <h1>Sign In</h1>
     
     <form onSubmit={handleSignin}>
       <div className="input-container">
         <label>Email : </label>
         <input type="text" value={email} onChange={e => { setEmail(e.target.value) }} className="Alabel" required />
       </div>

       <div className="input-container">
         <label>Password : </label>
         <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className="Alabel" required />
       </div>

       <div className="btnSignin">
         <button className="btnAuth"> Sign in </button>
       </div>

       <div className="btnSignup">
       <label>Don't have an account? <Link to ="/signup" className="btnAuth">Sign up</Link> </label>
       </div>
      
     </form>
   </div>
  )
}
export default Signin;
