import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import M from "materialize-css"



const Singup = () => {
  const initialentry = { username: "", email: "", password: "" }
  const [imput, setImput] = useState(initialentry);


  const navigate = useNavigate();

  const handelInput = (e) => {
    const { name, value } = e.target;
    setImput({ ...imput, [name]: value });
  };

  const preventDefault = e => {
    e.preventDefault()
  }

  const singupUser = () => {
    axios.post("http://localhost:4000/api/user/singup", imput)
      .then(async response => {
        if (response.status === 200) {
          if (response.data) {
            await sessionStorage.setItem("auth-token", response.data)
            console.log("success token")
            M.toast({ html: 'Success Register' })
            navigate("/");
          } else {
            console.log("error generating login token")
          }
        } else {
          console.log("invalid, username, email or password")
        }
        //setImput({username : "", email : "", password: ""})
      }).catch(M.toast({ html: 'provide the data required' }))
  }





  return (
    <div className='align-items: center'> <h1>Register</h1>
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={preventDefault} >
            <div className="card-content">
              <div className='row'>
                <input className="input-field col s12"
                  onChange={handelInput} name="username" value={imput.username}
                  type="text" placeholder="Your username" autoFocus required />

                <input className="input-field col s12"
                  onChange={handelInput} name="email" value={imput.email}
                  type="email" placeholder="Your email" autoFocus required />

                <input className="input-field col s12"
                  onChange={handelInput} name="password" value={imput.password}
                  type="password" placeholder="Your password" autoFocus required />

                <button className="waves-effect waves-light btn-small" onClick={singupUser}>Register</button>

              </div>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
}

export default Singup;

