import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Splash from "./components/SplashPage/Splash";
import About from "./components/AboutPage/About";
import Channels from "./components/ChannelsPage/Channels";
import UserProfile from "./components/ChannelsPage/UserProfile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage/Splash";
import "./index.css";
import "./reset.css";

const App = () => {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Splash />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <ProtectedRoute path="/users/:userId(\d+)" exact>
          <Channels user={user} />
        </ProtectedRoute>
        {/* TODO: Route might not be needed.. Either implement a popup sidebar or MODAL */}
        <ProtectedRoute path="/users/:userId(\d+)/:channelId(\d+)/profile" exact>
          <UserProfile />
        </ProtectedRoute>
        {/* TODO: Convert Login and Signup to Modals */}
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
