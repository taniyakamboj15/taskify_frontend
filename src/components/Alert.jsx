import React from "react";

const Alert = ({ message, type }) => {
  const icon =
    type === "error" ? (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 shrink-0 stroke-current'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    ) : (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 shrink-0 stroke-current'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M5 13l4 4L19 7'
        />
      </svg>
    );

  return (
    <div
      role='alert'
      aria-live='polite'
      className={`alert ${
        type === "error" ? "alert-error" : "alert-success"
      } shadow-lg fade-in transition-opacity duration-300 ease-in-out min-h-[48px] w-full max-w-xs mx-auto`}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
