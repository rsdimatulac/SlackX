import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await dispatch(signUp(firstname, lastname, email, password));
    }
  };

  if (user) {
    // redirect to Channels Page if session user exist
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstname"
          onChange={e =>setFirstname(e.target.value)}
          value={firstname}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastname"
          onChange={e => setLastname(e.target.value)}
          value={lastname}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
      {/* TODO  */}
    </form>
  );
};

export default SignUpForm;
