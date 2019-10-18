import React from "react";

const Login = () => {
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
    // send post to login
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
          type='text'
          name='password'
          value={input.password}
          onChange={inputHandler}
        />
      </label>
    </form>
  );
};

export default Login;
