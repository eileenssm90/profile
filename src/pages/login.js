import React from "react";
import { auth, provider } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const Login = ({ isAuth, setIsAuth }) => {
  let navigate = useNavigate();
  const showToastMessage = () => {
    toast.success("Logged in!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  let signinWithGoogle = () => {
    signInWithPopup(auth, provider).then((results) => {
      console.log(results);
      let name = results.user.displayName;
      let photo = results.user.photoURL;
      localStorage.setItem("name", name);
      localStorage.setItem("photo", photo);
      setIsAuth(true) && console.log(isAuth);
      showToastMessage();
      navigate("/");
    });
  };

  return (
    <div>
      <p>Sign in to continue</p>
      <button
        onClick={signinWithGoogle}
        type="button"
        class="login-with-google-btn"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
