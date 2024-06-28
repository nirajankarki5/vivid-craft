import { FaRegUser } from "react-icons/fa6";

const UserProfile = () => {
  return (
    <>
      <aside className="mb-4 mt-24 flex h-36 items-center justify-center md:h-44 lg:h-56">
        <div className="flex h-full w-36 items-center justify-center rounded-full bg-gray-200 md:w-44 lg:w-56">
          <FaRegUser className="mx-auto text-5xl text-gray-400" />
          {/* <img src="" alt="" /> */}
        </div>
      </aside>

      <section className="text-center">
        <p className="text-sm font-semibold text-gray-400 md:text-xl">
          @username
        </p>
        <p>Email</p>
      </section>

      <h2 className="p-5 text-xl font-medium md:p-10 md:text-2xl md:font-semibold">
        My Images
      </h2>

      {/* Image Grid Goes here */}
    </>
  );
};

export default UserProfile;
