import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./src/pages/Home.jsx";
import Inventory from "./src/pages/Inventory.jsx";
import SignUp from "./src/pages/SignUp.jsx";
import LogIn from "./src/pages/LogIn.jsx";
import Recipes from "./src/pages/Recipes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
      </Routes>
    </BrowserRouter>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   formContainer: {
//     backgroundColor: "green",
//     width: "100%",
//     flex: 1,
//     alignItems: "center",
//     textAlign: "center",
//     justifyContent: "center",
//   },
//   form: {
//     backgroundColor: "white",
//     marginTop: "10%" ,
//     marginRight: "30%",
//     marginLeft: "30%",
//     height: "50%",
//     border: "1px black solid", 
//     borderRadius: "5px",
//     padding: "5%",
//   },
// });
