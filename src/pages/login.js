import React from "react";
import { auth, provider } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();
  let signinWithGoogle = () => {
    signInWithPopup(auth, provider).then((results) => {
      console.log(results);
      let name = results.user.displayName;
      let photo = results.user.photoURL;
      localStorage.setItem("name", name);
      localStorage.setItem("photo", photo);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signinWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Login;
