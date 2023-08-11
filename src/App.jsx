import './App.css';
import Create from './Pages/Create';
import Home from './Pages/Home';
import Update from './Pages/Update';
import PokeInfo from './Pages/PokeInfo';
import Signin from './Auth/Signin';
import SignUp from './Auth/Signup';
import Delete from './Pages/Delete';
// Main from './ImportedPoke/Main';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState,useEffect } from 'react';
//import SiteNav from './Common/SiteNav';
import useGetToken from './hooks/useGetToken';

function App() {

//Auth
 const tokenObj = useGetToken();
 const [token, setToken] = useState(tokenObj.token)

 //console.log("This is Route >> " + token)

 useEffect(() => {
      setToken(tokenObj.token)
      //console.log("This is Route >> " + token)
    }, [tokenObj])


  console.log("This is Route >> " + token)


  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
         
          <Route path="/" element={<Signin/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/pokeInfo" element={<PokeInfo/>}></Route>
          {/* <Route path="/home" element={<Home/>}></Route> */}
          <Route path="/home" element={token ? <Home/> : <Signin/>}></Route>
          {/* <Route path="/create" element={<Create/>}></Route> */}
          <Route path="/create" element={token ? <Create/> : <Signin/>}></Route>
          {/* <Route path="/update/:id" element={<Update/>}></Route> */}
          <Route path="/update/:id" element={token ? <Update/> : <Signin/>}></Route>
          {/*<Route path="/delete" element={token ? <Delete/> : <Signin/>}></Route>*/}

        </Routes>
      </BrowserRouter>
    </div>
  
  );
}
export default App;

/*
import { useState,useEffect } from 'react';
import './App.css';
import Create from './Pages/Create';
import Home from './Pages/Home';
import Update from './Pages/Update';
import PokeInfo from './Pages/PokeInfo';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
//...........
import { Amplify } from 'aws-amplify';
import { awsExports } from './PokeUser/aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";
Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
});
//..........
function App() {
  const [count,setCount] = useState(0)
  //...........
  const [setJwtToken,jwtToken]= useState('')
  useEffect(() => {
    fetchJwtToken();
  }, []);
  const fetchJwtToken = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      setJwtToken(token);
    } catch (error) {
      console.log('Error fetching JWT token:', error);
    }
  };
  //.......
  return (
    <Authenticator initialState='signIn'
    components={{
      SignUp: {
        FormFields() {
          return (
            <>
              <Authenticator.SignUp.FormFields />
              
              <div><label>First name</label></div>
              <input
                type="text"
                name="given_name"
                placeholder="Please enter your first name"
              />
              <div><label>Last name</label></div>
              <input
                type="text"
                name="family_name"
                placeholder="Please enter your last name"
              />
              <div><label>Email</label></div>
              <input
                type="text"
                name="email"
                placeholder="Please enter a valid email"
              />
            </>
          );
        },
      },
    }}
    services={{
      async validateCustomSignUp(formData) {
        if (!formData.given_name) {
          return {
            given_name: 'First Name is required',
          };
        }
        if (!formData.family_name) {
          return {
            family_name: 'Last Name is required',
          };
        }
        if (!formData.email) {
          return {
            email: 'Email is required',
          };
        }
      },
    }}
    >
      
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/pokeInfo" element={<PokeInfo/>}></Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/update/:id" element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </Authenticator>
  );
}

export default App;
*/