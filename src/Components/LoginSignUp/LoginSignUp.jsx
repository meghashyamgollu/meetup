import axios from "axios";
import { nanoid } from "nanoid";
import { useState } from "react";
// import { store } from "../../Redux/store";
// import {useSelector, useDispatch} from "../../Redux/Login/action.js"
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const LoginSignUp = () => {
  const [userSU, setUserSU] = useState({
    name: "",
    password: "",
    location: "",
    interests: [],
    image: ""
  });
  // const dispatch = useDispatch();
  // const logData  = useSelector((store) => store.user);
  const handleChange = (event) => {
    const {id, value} = event.target;
    setUserSU({
      ...userSU, 
      [id] : value
    });
    console.log(userSU);
  }
  const handleChck = (event) => {
    const {value} = event.target;
    userSU.interests.push(value);
    console.log(userSU);
  }

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/users", {...userSU, id: nanoid()})
    .then(res => {console.log(res)})
    .catch((error) => {
      console.log(error);
      alert("Sign Up Successful!");
    })
  }
const [userSI, setUserSI] = useState({
  name: "",
  password: ""
})

  const [users, storeUsers] = useState([]);

  const handleChangeSI = (event) => {
    const {id, value} = event.target;
    setUserSI({
      ...userSI, 
      [id] : value
    });
    console.log(userSI);
  }
  const getUsers = () => {
    axios.get("http://localhost:8080/users")
    .then(res => {
      storeUsers(res);
    })
  };
  let navigate = useNavigate();
  const handleSignin = (e) => {
    getUsers();
    users.foreach((el) => {
      if(el.name===userSI.name && el.password===userSI.password){
        alert("Signed In");
        navigate("/");
        return
      }
    })
  }


  return (
    <div className="loginSignUp">
      <form className="signUp" onSubmit={(e) => {handleSignup(e) }}>
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          id="name"
          onChange={(event) => {handleChange(event) }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          id="password"
          onChange={(event) => {handleChange(event) }}
          required
        />
        <br />
        <select value={""} className="location" id="location" onChange={(event) => {handleChange(event) }}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <br />
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          type="checkbox" id="interest" value="technology"
          className="technology"
          onChange={(event) => {handleChck(event) }}
        />
        <br />
        <label>food</label>
        <input type="checkbox" id="interest" value="food" className="food" onChange={(event) => {  handleChck(event) }} />
        <br />
        <label>movies</label>
        <input type="checkbox" id="interest" value="movies" className="movies" onChange={(event) => {handleChck(event) }} />
        <br />
        <label>culture</label>
        <input type="checkbox" id="interest" value="culture" className="culture" onChange={(event) => {handleChck(event) }} />
        <br />
        <label>art</label>
        <input type="checkbox" id="interest" value="art" className="art" onChange={(event) => { handleChck(event)}} />
        <br />
        <label>drama</label>
        <input type="checkbox" id="interest" value="drama" className="drama" onChange={(event) => { handleChck(event)}} />
        <br />
        <label>image</label>
        <input
          type="url"
          className="image"
          id="image"
          onChange={(event) => {handleChange(event) }}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form className="login" onSubmit={(e) => {handleSignin(e) }}>
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => {handleChangeSI(event) }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => { handleChangeSI(event)}}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
