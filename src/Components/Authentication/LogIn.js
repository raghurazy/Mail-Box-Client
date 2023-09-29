import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

function LogIn() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [inputRequire, setInputRequire] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    if (enteredEmail === "" || enteredPass === "") {
      setInputRequire(true);
      return;
    }
    setInputRequire(false);

    try {
      const resLogin = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgQ5BTw9ydyzfvdjaLcaQOY5Jnygws5mE",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          }
        }
      );
      const data = await resLogin.json();

      if (resLogin.ok) {
        console.log("Logged IN");
        dispatch(authActions.login({tokenId: data.idToken}));
        navigate('/profile',{replace: true});

      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form>
      {inputRequire && <p style={{ color: "red" }}>*Please fill all inputs.</p>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          ref={emailInputRef}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passInputRef}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Link>Forgot password?</Link>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={loginSubmitHandler}>
        Log In
      </Button>
    </Form>
  );
}

export default LogIn;