import React from 'react'
import { Link } from 'react-router-dom'
import { StyleSheet} from 'react-native';

function LogIn() {
  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <Link to="/">Image placeholder</Link>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <h1>Left Overs</h1>
        <form>
          <input placeholder="Email address" type="text"/>
          <input placeholder="Password" type="text"/>
        </form>
        <div>
          <button>Login</button>
          <button>Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    width: "100%",
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  form: {
    backgroundColor: "white",
    marginTop: "10%" ,
    marginRight: "30%",
    marginLeft: "30%",
    height: "50%",
    border: "1px black solid", 
    borderRadius: "5px",
    padding: "5%",
  },

});

export default LogIn