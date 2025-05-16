import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async ({ name, email, password, country }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password, country }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to sign up");
      }

      const data = await res.json();
      console.log("Signup Response:", data);

      dispatch(setUser(data.data));
      toast.success("Signup Successful");
      navigate("/allTask");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
      toast.error(err.message);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};

export default useSignup;
