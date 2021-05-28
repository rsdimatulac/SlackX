import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import slackLogo from "../../imgs/colorLogo.png";
import useConsumeContext from '../../context/FormModalContext';
import "./SignUpForm.css";


const SignUpForm = () => {
  const { handleLoginModal } = useConsumeContext();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  const onSignUp = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstname, lastname, email, password, confirmPassword));
      if (data?.errors) {
        setErrors(data?.errors);
      }
    } else {
      const valErrors = [...errors, "Passwords must match."]
      setErrors(valErrors);
    }
  };

  useEffect(() => {
    if (user) {
      history.push(`/users/${user.id}/1`);
    }
  }, [user, history])


  return (
    <div className="signup__wrapper">
      <form onSubmit={onSignUp}>
        <div className="signup__header">
          <h1>Sign up to</h1>
          <img src={slackLogo} alt=""></img>
          <h1>slackX</h1>
        </div>
        <div className="errors">
          {errors?.map((error) => (
            <div key={error}>・{error}</div>
          ))}
        </div>
        <div className="signup__input">
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            onChange={e => setFirstname(e.target.value)}
            value={firstname}
            required
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            onChange={e => setLastname(e.target.value)}
            value={lastname}
            required
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="password"
            placeholder="Confirm password"
            name="confirm_password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          ></input>
        </div>
        <div className="signup__button">
          <button style={{ cursor: 'pointer' }} type="submit">Sign Up</button>
        </div>
        <div className="goto__login">
          <p>Already have an account? </p>
          <h3 onClick={handleLoginModal} style={{ cursor: 'pointer' }}>Log in instead</h3>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
