import React from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [input, setInput] = React.useState({
    username: 'Lambda School',
    password: 'i<3Lambd4',
  })

  function inputHandler(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function submitHandler(e) {
    e.preventDefault()
    axios.post(`http://localhost:5000/api/login`, input)
    .then(resp => {
      // console.log(resp)
      localStorage.setItem('token', resp.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log(err.response))
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Welcome to the Bubble App!</h1>
      <label>
        Username:&nbsp;
        <input
          type='text'
          name='username'
          value={input.username}
          onChange={inputHandler}
        />
      </label>
      <label>
        Password:&nbsp;
        <input
          type='password'
          name='password'
          value={input.password}
          onChange={inputHandler}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default Login;
