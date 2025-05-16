import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Alert from "./Alert";
import useLogin from "../hooks/useLogin";
import useSignup from "../hooks/useSignup";
import useOtpVerification from "../hooks/useOtpVerification";
import { BASE_URL } from "../utils/constants";
import { signInWithGoogle } from "../config/firebase";
import { setUser } from "../redux/userSlice";
import { formatTime } from "../utils/formatTime";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [otp, setOtp] = useState("");
  const [googleLoginError, setGoogleLoginError] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const emailRef = useRef(null);

  const { login, loading, error } = useLogin();
  const { signup, loading: signupLoading, error: signupError } = useSignup();
  const {
    isOtpSent,
    isOtpVerified,
    sendOtp,
    verifyOtp,
    timer,
    resendOtp,
    otpLoading,
  } = useOtpVerification();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err) {
      console.error(err);
    } finally {
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  const handleSignupClick = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !country) {
        toast.error("All fields are required");
        return;
      }
      if (!isOtpSent) {
        await sendOtp(email);
        return;
      }
      if (isOtpSent && !isOtpVerified) {
        const verified = await verifyOtp(email, otp);
        if (!verified) return;
      }
      if (isOtpVerified) {
        await signup({ name, email, password, country });
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const firebaseToken = await signInWithGoogle();
      const res = await axios.post(
        `${BASE_URL}auth/firebaseLogin`,
        { token: firebaseToken },
        { withCredentials: true }
      );
      if (res.status === 200 || res.status === 201) {
        const { name, email, country } = res.data.data;
        dispatch(setUser({ name, email, country }));
        toast.success("Login successful!");
        onClose();
        navigate("/allTask");
      } else {
        setGoogleLoginError(res.data.msg);
        toast.error(res.data.msg);
      }
    } catch (err) {
      setGoogleLoginError(err?.response?.data?.msg || "Something went wrong");
      toast.error(err?.response?.data?.msg || "Something went wrong");
      setTimeout(() => setGoogleLoginError(null), 2000);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='relative w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg'>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl'
        >
          &times;
        </button>

        {(error || signupError || googleLoginError) && (
          <Alert
            message={error || signupError || googleLoginError}
            type='error'
          />
        )}

        <h2 className='text-2xl font-bold text-center mb-6'>
          {isSignUpForm ? "Create Account" : "Login"}
        </h2>

        <form>
          {isSignUpForm && !isOtpSent && (
            <>
              <label className='block text-sm mb-1'>Name</label>
              <input
                type='text'
                className='input w-full mb-3'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className='block text-sm mb-1'>Email</label>
              <input
                type='email'
                ref={emailRef}
                className='input w-full mb-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='block text-sm mb-1'>Country</label>
              <input
                type='text'
                className='input w-full mb-3'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <label className='block text-sm mb-1'>Password</label>
              <input
                type='password'
                className='input w-full mb-3'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {isSignUpForm && isOtpSent && !isOtpVerified && (
            <>
              <p className='text-green-600 mb-2'>OTP Sent to your email</p>
              <label className='block text-sm mb-1'>Enter OTP</label>
              <input
                type='text'
                className='input w-full mb-3'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {timer > 0 ? (
                <p className='text-sm text-gray-500'>
                  OTP expires in{" "}
                  <span className='font-semibold'>{formatTime(timer)}</span>
                </p>
              ) : (
                <button
                  type='button'
                  className='text-sm text-blue-500 underline'
                  onClick={() => resendOtp(emailRef.current.value)}
                >
                  Resend OTP
                </button>
              )}
            </>
          )}

          {!isSignUpForm && (
            <>
              <label className='block text-sm mb-1'>Email</label>
              <input
                type='email'
                className='input w-full mb-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='block text-sm mb-1'>Password</label>
              <input
                type='password'
                className='input w-full mb-3'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          <button
            className='btn btn-neutral w-full mt-2'
            onClick={isSignUpForm ? handleSignupClick : handleLoginClick}
            disabled={loading || signupLoading || otpLoading}
          >
            {loading || signupLoading || otpLoading ? (
              <span className='loading loading-spinner loading-sm'></span>
            ) : isSignUpForm ? (
              !isOtpSent ? (
                "Send OTP"
              ) : !isOtpVerified ? (
                "Verify OTP"
              ) : (
                "Register"
              )
            ) : (
              "Login"
            )}
          </button>

          <button
            type='button'
            onClick={handleGoogleLogin}
            className='btn btn-outline w-full mt-4 flex items-center gap-2 justify-center'
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span className='loading loading-spinner loading-sm'></span>
            ) : (
              <>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/2875/2875331.png'
                  alt='Google'
                  className='w-5 h-5'
                />
                Continue with Google
              </>
            )}
          </button>

          <p className='text-sm mt-4 text-center'>
            {isSignUpForm
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span
              className='text-blue-500 cursor-pointer'
              onClick={() => {
                setIsSignUpForm(!isSignUpForm);
                setOtp("");
              }}
            >
              {isSignUpForm ? "Login" : "Register"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
