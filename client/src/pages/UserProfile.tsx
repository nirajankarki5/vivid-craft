import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { PiUploadSimple, PiHeartLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useState } from "react";
import { clearToken, getToken } from "../utils/auth";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiUser";
import Loading from "../components/Loading";
import Error from "./Error";

const UserProfile: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();

  const token = getToken();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", token],
    queryFn: ({ queryKey }) => {
      const token = queryKey[1];
      return getUser(token);
    },
  });

  console.log(data);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="mx-auto grid justify-center gap-1 md:w-[45rem] md:grid-cols-2 md:justify-center">
        <aside className="mb-1 mt-4 flex h-36 items-center justify-center md:mb-4 md:mt-8 md:h-44 lg:h-56">
          <div className="flex h-full w-36 items-center justify-center rounded-full bg-gray-200 md:w-44 lg:w-56">
            <FaRegUser className="mx-auto text-5xl text-gray-400" />
            {/* <img src="" alt="" /> */}
          </div>
        </aside>

        <section className="mb-5 mt-2 text-center md:my-auto md:text-left">
          <p className="text-md mb-1 font-semibold text-gray-800 md:text-2xl">
            Welcome,&nbsp;{data?.username}
          </p>
          <p>{data?.email}</p>

          <p className="w-80 py-2 text-center text-sm text-gray-400 md:w-auto md:pt-5 md:text-left md:text-base">
            Get gorgeous, high-quality pictures that User has handpicked for
            free.
          </p>

          <button
            onClick={() => {
              clearToken();
              navigate("/");
            }}
            className="mt-2 rounded-md border-[1px] border-red-600 px-4 py-2 text-lg text-red-600 transition-all duration-150 hover:bg-red-500 hover:text-white"
          >
            Log&nbsp;out &nbsp;
            <MdLogout className="text-md inline" />
          </button>
        </section>
      </div>

      <div className="md:pl-5">
        <Box
          sx={{
            maxWidth: { xs: 320, sm: 480 },
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            style={{
              height: "60px",
              borderBottom: "1px solid #eee",
              width: "80vw",
            }}
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="Uploads"
              icon={<PiUploadSimple className="text-xl" />}
              iconPosition="end"
            />
            <Tab
              label="Likes"
              icon={<PiHeartLight className="text-xl" />}
              iconPosition="end"
            />
          </Tabs>
        </Box>

        <p className="mt-16 text-center text-2xl text-gray-400">
          {value === 0 ? "My Images" : "My Favourites"}
        </p>
        {/* Image Grid Goes here */}
      </div>
    </>
  );
};

export default UserProfile;
