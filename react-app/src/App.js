import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Splash from "./components/SplashPage/Splash";
import About from "./components/AboutPage/About";
import Channels from "./components/ChannelsPage/Channels";
import UserProfile from "./components/ChannelsPage/UserProfile";
import User from "./components/User";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import { authenticate } from "./store/session";
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
        <ProtectedRoute path="/users" exact>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
