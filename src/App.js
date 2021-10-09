import './App.css';
import initalizeAuthentication from './Firebase/firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useState } from 'react';


initalizeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const auth = getAuth();
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider) 
    .then(result =>{
      const user = result.user;
      console.log(user)
    })
  }

  const handleRegistration = event =>{
    event.preventDefault();
    console.log(email, password);
    if(password.length < 6){
      setError('Password Must be at least 6 characters long.')
      return;
    }
    else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
      setError(' Minimum eight characters, at least one letter, one number and one special character needed');
      return;
    }
    isLogin?processLogin(email, password):createNewUser(email, password)
  }

  const processLogin =(email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log(user)
      setError('');
    })
    .catch(error =>{
      setError(error.message)
    })
  }  

  const createNewUser = (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log(user);
      setError('');
      verifyEmail();
      setUserName();
    })
    .catch(error=>{
      setError(error.message);
    })
  }

  const   setUserName = () =>{
    updateProfile(auth.currentUser, {displayName:name})
    .then(result =>{
      
    })
  }

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(result =>{
      console.log(result)
    })
  }

  const toggleLogin = event =>{
    setIsLogin(event.target.checked)
  }

  const handleNameChange = e =>{
    setName(e.target.value)
  } 

  const handlePasswordChange = event =>{
    setPassword(event.target.value);
  }

  const handleEmailChange = event =>{
    setEmail(event.target.value);
  }

  const handleResetPassword = () =>{
    sendPasswordResetEmail(auth,email)
    .then(result =>{

    })
  }
  return (
    <div className="mx-5">
      <form onSubmit={handleRegistration}>
        <h3 className="text-primary">Please {isLogin ? 'Login' : 'Register'}</h3>
  {!isLogin &&<div className="row mb-3">
    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" onBlur={handleNameChange} className="form-control" id="inputName" placeholder="Your name"/>
    </div>
  </div>}
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registered?
        </label>
      </div>
    </div>
  </div>
  <div className="row mb-3 text-danger">
    {error}
  </div>
  <button type="submit" className="btn btn-primary me-2">{isLogin? 'Login': 'Register'}</button>
  <button type="button" onClick={handleResetPassword} className="btn btn-secondary btn-sm">Reset Password</button>
</form>





      <br /><br /><br />
      <div>--------------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSingIn}>Google Sing In</button>
    </div>
  );
}

export default App;
