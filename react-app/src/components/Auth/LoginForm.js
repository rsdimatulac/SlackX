import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import useConsumeContext from "../../context/FormModalContext";
import slackLogo from "../../imgs/colorLogo.png";
// import { getChannels } from "../../store/channel";
import "./LoginForm.css";


const LoginForm = () => {
  const { handleSignUpModal } = useConsumeContext();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  // const channels = useSelector(state => state.channels);
  const dispatch = useDispatch();
  const history = useHistory();


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  // TODO: Getting undefined error when logging in. Might need refactoring.
  // useEffect(() => {
  //   let firstChanId;
  //   if (user) {
  //     async function fetchData() {
  //       await dispatch(getChannels())
  //     }
  //     fetchData();
  //     for (let key in channels) {
  //       if (user?.id in channels[key]?.users) {
  //         firstChanId = key;
  //         break;
  //       }
  //     }
  //     history.push(`/users/${user?.id}/${firstChanId}`)
  //   }
  // }, [dispatch, user, channels, history])

  useEffect(() => {
    if (user) {
      history.push(`/users/${user.id}/1`);
    }
  }, [user, history])


  return (
    <div className="login__wrapper">
      <form onSubmit={onLogin}>
        <div className="login__header">
          <h1>Login to </h1>
          <img src={slackLogo} alt=""></img>
          <h1> slackX </h1>
        </div>
        <div className="errors">
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
      </form>
    </div>
  );
};

export default LoginForm;
