import React from 'react'
import { StyleSheet} from 'react-native';
import { Link } from 'react-router-dom';
// import "../components/styles/NavBar.css"

function NavBar() {
  return (
    <div style={styles.container}>
      <p>NavBar</p>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "red",
      position: "fixed",
      width: "100%"
      
    }
  });

export default NavBar