import toast from "react-hot-toast";
import { setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../apis";

const { SIGNUP_API, LOGIN_API } = userEndpoints;

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error.response?.data?.message || "Signup Failed");
      navigate("/");
    }
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response?.data?.message || "Login Failed");
      navigate("/login");
    }

    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/login");
  };
}
