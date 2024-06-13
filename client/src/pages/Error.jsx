import React from "react";

const Error = () => {
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className="my-10 mt-[8rem] text-center text-gray-400">
      <h1 className="mb-4 text-5xl font-medium">Error!!!</h1>
      <p className="mb-4 text-lg">An error occured</p>

      <p>
        Go to &nbsp;
        <Link to={"/"} className="text-lg text-blue-500 underline">
          home
        </Link>
      </p>
      <br />
      <p>
        Or &nbsp;
        <button
          onClick={refreshPage}
          className="border-none bg-white text-lg text-blue-500 underline"
        >
          Refresh Page
        </button>
      </p>
    </div>
  );
};

export default Error;
