import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModalAction } from "../redux/actions";
import { register } from "../api";
import { validateEmail } from "../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "white",
    padding: 40,
    borderRadius: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "yellow",
    color: "black",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
    background: "gold",
    color: "black",
    "&:hover": {
      background: "gold",
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url(" + process.env.PUBLIC_URL + "/background.jpg" + ")",
  },
  link: {
    textDecoration: "none",
  },
}));

const RegisterScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async () => {
    const response = await register(email, name, password);

    if (!response.success) {
      dispatch(
        showModalAction("Registration Failed", response.error, null, "Close")
      );
    }
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={emailError}
              helperText={emailError ? "Invalid email address." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(!validateEmail(e.target.value))
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              disabled={!(name && email && password)}
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onRegister}
            >
              Register
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link className={classes.link} to="/">
                Already have account? Log In
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default RegisterScreen;
