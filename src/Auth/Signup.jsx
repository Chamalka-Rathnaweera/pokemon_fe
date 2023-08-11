import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { awsExports } from './aws-exports';
import { Link,useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  Amplify.configure({
    Auth: {
        region: awsExports.REGION,
        userPoolId: awsExports.USER_POOL_ID,
        userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
      }
})

 //sign up
  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      const user = await Auth.signUp({
        username: email,
        password: password,
      });
      console.log('Sign up successful:', user);
      alert('Sign up successful: '+ user)
      navigate('/Home')
    } catch (error) {
      console.log('Error signing up:', error);
      alert('Error signing up: '+ error)
    }
  };
  
  //confirmation
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp({username : email, code : otp});
    } catch (error) {
      console.log('error confirming sign up', error);
      alert('Error confirming sign up: '+ error)
    }
  }
    return (
    <>
     <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

      <form onSubmit={signUpUser}>
        <h3>Sign Up</h3>

        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => { setEmail(e.target.value) }} className="Alabel"required />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} className="Alabel" required/>
        </div>

        <div>
          <label>confirmation:</label>
          <input type="text" value={otp} onChange={e => { setOTP(e.target.value) }} className="Alabel" required/>
          <button onClick={confirmSignUp} className="btnAuth">Send OTP</button>
       </div>

      <button type="submit" className="btnAuth">Sign Up</button>

      <div>
       <label>Already have an account?  </label>
       <Link to ="/" className="btnAuth">Sign in</Link>
      </div>

      </form>
    </>
     );
}
export default SignUp;

/*
import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify';

//Sign-up
async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      autoSignIn: { // optional - enables auto sign in after user is confirmed
        enabled: true,
      }
    });
    console.log(user);
  } catch (error) {
    console.log('error signing up:', error);
  }

  //Re-send sign up confirmation code
  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  //Confirm sign up
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  //Auto sign in after sign up
  function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload;
      if (event === 'autoSignIn') {
        const user = payload.data;
        // assign user
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
      }
    })
  }

} 
*/
