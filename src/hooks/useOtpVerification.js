import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const useOtpVerification = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(300);
  const [otpLoading, setOtpLoading] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    setTimer(300);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) clearInterval(intervalRef.current);
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async (email) => {
    setOtpLoading(true);
    try {
      const res = await fetch(`${BASE_URL}auth/sendOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || "Failed to send OTP");

      toast.success("OTP sent to your email");
      setIsOtpSent(true);
      startTimer();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async (email, otp) => {
    setOtpLoading(true);
    try {
      const res = await fetch(`${BASE_URL}auth/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.msg || "Invalid OTP");
      }

      toast.success("OTP verified");
      setIsOtpVerified(true);
      clearInterval(intervalRef.current);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setOtpLoading(false);
    }
  };

  const resendOtp = async (email) => {
    await sendOtp(email);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return {
    isOtpSent,
    isOtpVerified,
    timer,
    sendOtp,
    verifyOtp,
    resendOtp,
    otpLoading,
  };
};

export default useOtpVerification;
