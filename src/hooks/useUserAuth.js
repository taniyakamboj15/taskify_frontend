import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
const useUserAuth = () => {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}get/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Failed to fetch user data");

      dispatch(setUser(data.data));
      navigate("/alltask");
    } catch (error) {
      console.error("Error fetching user:", error.message);

      dispatch(setUser(null));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return { user, loading };
};

export default useUserAuth;
