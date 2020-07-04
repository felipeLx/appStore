import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from "react-router-dom";

import api from '../../api/index';
import Aux from '../../hoc/Aux';

const login = React.memo(props => {
    const history = useHistory();
    const [user, setUser] = useState({
            email: '',
            password: ''
    });

    const [authenticated, setAuthenticated] = useState(false);

    const inputChangedHandler = (event) => {
      console.log(event.target.value);
      
        setUser({ [event.target.id]: event.target.value});
    };

    const submitHandler = async(event) => {
      event.preventDefault();
      setAuthenticated(true);
      await api.loginUser(user)
              .then(res => {
                console.log(res);
                return (window.location.href = history.push('/api'))
              })
              .catch(err => console.log(err));
  };

    return (
      <div className="container">
        <div style={{ marginTop: "4rem", paddingTop: "70px" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left"> </i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Ainda não tem uma conta? <Link to="/user/auth">Registrar</Link>
              </p>
            </div>
            <form>
              <div className="input-field col s12">
                <input
                  onChange={inputChangedHandler}
                  // value={user.email}
                  error={user.errors}
                  id="email"
                  type="email"
                  
                />
                <label htmlFor="email">Email</label>
                
              </div>
              <div className="input-field col s12">
                <input
                  onChange={inputChangedHandler}
                  // value={user.password}
                  error={user.errors}
                  id="password"
                  type="password"
                 
                />
                <label htmlFor="password">Password</label>
                
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  onClick= {(event) => submitHandler(event)}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
});

export default login;