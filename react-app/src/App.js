import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/SplashPage/NavBar";
import Splash from "./components/SplashPage/Splash";
import Footer from "./components/SplashPage/Footer";
import About from "./components/AboutPage/About";
import Channels from "./components/ChannelsPage/Channels";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ScrollToTop from "./context/ScrollToTop";
import { authenticate } from "./store/session";
import ErrorPage from "./components/404page/ErrorPage";
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
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Splash user={user}/>
          <Footer />
        </Route>
        <Route path="/about" exact>
          <NavBar user={user}/>
          <About user={user}/>
          <Footer />
        </Route>
        <ProtectedRoute path="/users/:userId(\d+)/:channelId(\d+)" exact>
          <Channels user={user} />
        </ProtectedRoute>
        <Route path="*">
          <NavBar user={user}/>
          <ErrorPage />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
