import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import TutorialesLista from "./components/tutorials-list.component"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

/*function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Full Stack
        </a>
        <div className="navbar-nav mr-auto">
          
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;*/

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              FullStack
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Inicio
                </Link>
              </li>
              
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                  
                  <Link to={"/tutoriales"} className="nav-link">
                  Tutoriales
                  </Link>

                  <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                  </Link>
                 
                  
                  <Link to={"/add"} className="nav-link">
                  Agregar
                  </Link>
                  
                  </li>
              )}
              
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Board
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Salir
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Ingresar
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Registrate
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />

              <Route exact path={["/", "/tutorials"]} component={TutorialsList}/>
              <Route exact path={["/", "/tutoriales"]} component={TutorialesLista}/>
              <Route exact path="/add" component={AddTutorial} />
              <Route path="/tutorials/:id" component={Tutorial} />
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);