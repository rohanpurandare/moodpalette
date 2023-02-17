import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";



function App() {
  const { user } = useContext(AuthContext);
  console.log("in app")
	return (
		<Router>
			<Routes>
    
      <Route exact path="/" element = {user ? <Home /> : <Register />}/> {/* Only display home if user is logged in */}
      <Route path="/register" element = {user ? <Navigate to="/" /> : <Register />}/> {/* can't register if already logged in */}
      <Route path="/login" element = {user ? <Navigate to="/" /> : <Login />}/> {/* can't login if a;ready logged in */}
      <Route path="/home" element={<Home />} />

      {/*<Route path="/profile/:username" element = {<Profile/>} />*/}

			</Routes>
		</Router>



	);
}

export default App;