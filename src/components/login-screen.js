import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../services/logic";

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

const LoginScreen = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const response = await loginUser(email, password);

    if (response.success) {
      history.push("/main");
    }
  };

  return (
    <div className={classes.container}>
      <Container maxWidth="sm">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
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
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onLogin}
            >
              Login
            </Button>
            <Grid container style={{ display: "flex", justifyContent: "center" }}>
              {/* <Grid item xs>
                <Link className={classes.link} to="/">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link className={classes.link} to="/register">
                  Don't have an account? Register now!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginScreen;
