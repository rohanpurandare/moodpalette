import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });  
  try {
    const res = await axios.post("/auth/login", userCredential);  // call login api call
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data }); // if valid user, return user object
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err }); // if not valid, return error
  }
};