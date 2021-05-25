import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import useConsumeContext from "../../context/FormModalContext";
import { getChannels } from "../../store/channel"

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const channels = useSelector(state => state.channels)
  const dispatch = useDispatch();
  const {handleSignUpModal} = useConsumeContext();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  // const loginDemoUser = async (e) => {
  //   e.preventDefault();
  //   return await dispatch(login("demouser@slackx.com", "password"))
  // }

  useEffect(() => {
    if (user) {
      async function fetchData() {
       await dispatch(getChannels())
      }
      fetchData();
    }

  }, [dispatch])

  // if (user) {
  //   console.log("!!!!!!!!!!!!!!!!!!!!", channels["1"].id)
  //   history.push(`/users/${user.id}/undefined}`)
  //   // redirect to Channels Page if session user exist
  //   // return <Redirect to={`/users/${user.id}/${channels["1"].id}`} />;
  // }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </div>
      <div>
        Don't have an account yet? <strong onClick={handleSignUpModal} style={{ cursor: 'pointer' }}>Create an Account</strong>
      </div>
      {/* <button className="button3" onClick={loginDemoUser} type="submit" style={{ cursor: 'pointer' }}>TRY FOR FREE</button> */}
    </form>
  );
};

export default LoginForm;
