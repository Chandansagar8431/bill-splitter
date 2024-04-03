import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// initial register and login objects
const initialRegisterObject = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};
const initialLoginObject = {
  email: "",
  password: "",
};

const Login = () => {
  const [formObject, setFormObject] = useState(initialRegisterObject);
  const [pageType, setPageType] = useState("login");
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(true);
  const [error, setError] = useState({
    name: "",
    email: "",
    pasaword: "",
    confirmpassword: "",
  });

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const navigate = useNavigate();

  // effect to have the input validations on all the fields
  useEffect(() => {
    //regex for the desired feilds
    const nameRegex = /^[A-Za-z0-9{3  ,20}]+\s?[A-Za-z0-9]+\s?[A-Za-z0-9]+\s?$/;
    const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.com$/;
    const passwordRegex =
      /^(?=.*[!@#$%^&*()\-_=+{}\[\]|;:'",.<>?])[A-Za-z0-9!@#$%^&*()\-_=+{}\[\]|;:'",.<>?]{8,15}$/;

    setValidName(nameRegex.test(formObject.name));
    setValidEmail(emailRegex.test(formObject.email));
    setValidPassword(passwordRegex.test(formObject.password));
    setValidMatch(true);
  }, [formObject]);

  //when onblur on the each input fields
  const unFocusedOnInput = (e) => {
    const get = e.target.name;
    if (formObject[get] === "") {
      setError({ ...error, [e.target.name]: `${e.target.name} is required` });
    }
  };

  // login and register handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formObject.password !== formObject.confirmpassword) {
      setValidMatch(false);
      return;
    }
    const data = await fetch(`http://localhost:3100/auth/${pageType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formObject),
    });
    const user = await data.json;
    user && pageType === "login" ? navigate("/home") : setPageType("login");
  };

  const handleFormChange = (e) => {
    const newValue = { ...formObject, [e.target.name]: e.target.value };
    setFormObject(newValue);
    setError({ ...error, [e.target.name]: "" });
  };

  return (
    <div className="flex items-center justify-center h-full  h-screen w-screen bg-custom-blue font-sans p-2 overflow-y-auto">
      <div
        className={`flex flex-col justify-around ${
          pageType === "login" ? "h-60" : "h-80"
        }`}>
        <h2 className="font-sans text-xl mx-3 font-extrabold">
          {" "}
          Hi welcome to food ordering carnival
        </h2>
        <div className="p-4 bg-green">
          {isRegister && (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => handleSubmit(e)}>
              <label className="font-semibold">
                Name {""}
                <input
                  className="rounded-lg px-2 border-2 border-blue-300 focus:outline-none bg-slate-200 w-64"
                  placeholder="Enter Name"
                  type="text"
                  value={formObject.name}
                  name="name"
                  onChange={(e) => handleFormChange(e)}
                  onFocus={() => setNameFocus(true)}
                  onBlur={(e) => unFocusedOnInput(e)}
                />
              </label>
              {nameFocus && !validName && formObject.name && (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="ml-1 text-red-700">
                    name must be greater then 3 chracters
                  </span>
                </div>
              )}
              {error.name ? (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="text-red-700 ml-1">{error.name}</span>
                </div>
              ) : null}
              <label className="font-semibold">
                Email {""}
                <input
                  placeholder="Enter Email"
                  className="w-64 rounded-lg px-2 border-2 focus:outline-none border-blue-300  bg-slate-200"
                  type="email"
                  value={formObject.email}
                  name="email"
                  onChange={(e) => handleFormChange(e)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={(e) => unFocusedOnInput(e)}
                />
              </label>
              {emailFocus && !validEmail && formObject.email && (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="ml-1 text-red-700">
                    email must be valid one
                  </span>
                </div>
              )}
              {error.email ? (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="text-red-700 ml-1">{error.email}</span>
                </div>
              ) : null}
              <label className="font-semibold">
                Password {""}
                <input
                  placeholder="Enter Password"
                  className="w-64 rounded-lg px-2 border-2 border-blue-300 focus:outline-none  bg-slate-200"
                  type="password"
                  value={formObject.password}
                  name="password"
                  onChange={(e) => handleFormChange(e)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={(e) => unFocusedOnInput(e)}
                />
              </label>
              {passwordFocus && !validPassword && formObject.password && (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="ml-1 text-red-700">
                    Must be of length 8-15 and have one special char
                  </span>
                </div>
              )}
              {error.password ? (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="text-red-700 ml-1">{error.password}</span>
                </div>
              ) : null}
              <label className="font-semibold">
                Confirm Password {""}
                <input
                  placeholder="Confirm Password "
                  className="w-64 rounded-lg px-2 border-2 border-blue-300 focus:outline-none bg-slate-200"
                  type="password"
                  value={formObject.confirmpassword}
                  name="confirmpassword"
                  onChange={(e) => handleFormChange(e)}
                  onBlur={(e) => unFocusedOnInput(e)}
                />
              </label>
              {!validMatch && formObject.confirmpassword && (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="ml-1 text-red-700">
                    should match the password
                  </span>
                </div>
              )}
              {error.confirmpassword ? (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="text-red-700 ml-1">
                    {error.confirmpassword}
                  </span>
                </div>
              ) : null}

              <button className="bg-black text-white py-1" type="submit">
                Submit
              </button>
            </form>
          )}
          {isLogin && (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => handleSubmit(e)}>
              <label className="font-semibold">
                Email {""}
                <input
                  placeholder=" Enter Email"
                  className="w-64 rounded-lg px-2 bg-slate-200 border-2 border-blue-300 focus:outline-none"
                  type="email"
                  value={formObject.email}
                  name="email"
                  onChange={(e) => handleFormChange(e)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={(e) => unFocusedOnInput(e)}
                />
              </label>
              {emailFocus && !validEmail && formObject.email && (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="ml-1 text-red-700">
                    email must be valid one
                  </span>
                </div>
              )}
              {error.email ? (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="text-red-700 ml-1">{error.email}</span>
                </div>
              ) : null}

              <label className="font-semibold">
                Password {""}
                <input
                  placeholder="Enter Password"
                  className="w-64 rounded-lg px-2 bg-slate-200 border-2 border-blue-300 focus:outline-none"
                  type="password"
                  value={formObject.password}
                  name="password"
                  onChange={(e) => handleFormChange(e)}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={(e) => unFocusedOnInput(e)}
                />
              </label>
              {passwordFocus && !validPassword && formObject.password && (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="ml-1 text-red-700">
                    Must be of length 8-15 and have one special char
                  </span>
                </div>
              )}
              {error.password ? (
                <div>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    className="text-red-700"
                  />
                  <span className="text-red-700 ml-1">{error.password}</span>
                </div>
              ) : null}

              <button className="bg-black text-white py-1" type="submit">
                Submit
              </button>
            </form>
          )}
          {isRegister ? (
            <div className="my-2">
              'Already a user Please' {""}
              <button
                className="font-bold"
                onClick={() => {
                  setPageType("login");
                  setFormObject(initialLoginObject);
                }}>
                Login
              </button>
            </div>
          ) : (
            <div className="my-2 ">
              'New user'{" "}
              <button
                className="font-bold"
                onClick={() => {
                  setPageType("register");
                  setFormObject(initialRegisterObject);
                }}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
