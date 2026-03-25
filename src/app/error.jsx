"use client";
export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
      <p className="text-lg">
        We apologize for the inconvenience. Please try again later.
      </p>
    </div>
  );
}
