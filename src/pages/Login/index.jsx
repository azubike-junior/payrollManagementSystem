import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/img/st_logo.png";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import { login } from "../../services/Authentication/login";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const { response, error, loading } = useSelector(
    (state) => state.loginReducer
  );

  const history = useHistory();

  const loginHandler = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setInputError("Please fill the required fields");
    }
    const data = {
      username,
      password,
      history,
    };
    dispatch(login(data));
  };

  return (
    <div>
      <div className="vertical-align-wrap">
        <div className="vertical-align-middle auth-main">
          <div className="auth-box">
            <div className="top">
              <div className="image">
                <img
                  src={logo}
                  style={{ width: "110px", height: "100px" }}
                  alt="User"
                />
              </div>
            </div>

            <div className="card">
              <div className="header text-center font-weight-700">
                <div className="lead">Login to your account</div>
              </div>
              <div className="body">
                <p className="text-danger">{inputError}</p>

                <form className="form-auth-small" onSubmit={loginHandler}>
                  <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      placeholder="Enter your Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                      type="password"
                      value={password}
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-suntrust btn-lg btn-block"
                  >
                    {loading ? <Loader /> : "LOGIN"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
