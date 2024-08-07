import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="my-10 mt-[8rem] text-center text-gray-400">
      <h1 className="mb-4 text-5xl font-medium">Not found!!!</h1>
      <p className="mb-4 text-lg">
        The page you are looking for can not be found
      </p>

      <p>
        Go to &nbsp;
        <Link to={"/"} className="text-lg text-blue-500 underline">
          home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
