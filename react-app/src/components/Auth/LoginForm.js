import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import useConsumeContext from "../../context/FormModalContext";
import slackLogo from "../../imgs/colorLogo.png";
import "./LoginForm.css"
import { getChannels } from "../../store/channel";

const LoginForm = () => {
  // const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  // const channels = useSelector(state => state.channels)
  const dispatch = useDispatch();
  const { handleSignUpModal } = useConsumeContext();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  useEffect(() => {
    if (user) {
      async function fetchData() {
        await dispatch(getChannels())
      }
      fetchData();
    }

  }, [dispatch, user])

  // if (user) {
  //   // console.log("!!!!!!!!!!!!!!!!!!!!", channels["1"].id)
  //   // history.push(`/users/${user.id}/undefined}`)
  //   // redirect to Channels Page if session user exist
  //   return <Redirect to={`/users/${user.id}/${channels["1"].id}`} />;
  // }

  return (
    <div className="login__wrapper">
      <form onSubmit={onLogin}>
        <div className="login__header">
          <h1>Login to </h1>
          <img src={slackLogo} alt=""></img>
          <h1> slackX </h1>
        </div>
        <div className="errors">
          {/* <div>・error1</div>
          <div>・error2</div>
          <div>・error3</div> */}

          {errors.map((error) => (
            <div key={error}>・{error}</div>
          ))}
        </div>
        <div className="login__input">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login__input">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login__button">
          <button style={{ cursor: 'pointer' }} type="submit">Login</button>
        </div>
        <div className="goto__signup">
          <p>New to slackX?</p>
          <h3 onClick={handleSignUpModal} style={{ cursor: 'pointer' }}>Create an account</h3>
        </div>
        {/* <button className="button3" onClick={loginDemoUser} type="submit" style={{ cursor: 'pointer' }}>TRY FOR FREE</button> */}
      </form>
    </div>
  );
};

export default LoginForm;
