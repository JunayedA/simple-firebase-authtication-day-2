import './App.css';
import initalizeAuthentication from './Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';


initalizeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider) 
    .then(result =>{
      const user = result.user;
      console.log(user)
    })
  }

  const handleRegistration = event =>{
    console.log('resistaiton will be added');
    event.preventDefault();
  }

  const handlePasswordChange = event =>{
    setPassword(event.target.value);
  }

  const handleEmailChange = event =>{
    setEmail(event.target.value);
    console.log(email, password)
  }
  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary">Please Register</h3>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3"/>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Example checkbox
        </label>
      </div>
    </div>
  </div>
  <button type="submit" className="btn btn-primary">Sign in</button>
</form>





      <br /><br /><br />
      <div>--------------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSingIn}>Google Sing In</button>
    </div>
  );
}

export default App;
