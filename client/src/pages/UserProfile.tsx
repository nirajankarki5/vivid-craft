import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PiUploadSimple, PiHeartLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { useState } from "react";

const UserProfile = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mx-auto grid justify-center gap-1 md:w-[45rem] md:grid-cols-2 md:justify-center">
        <aside className="mb-4 mt-8 flex h-36 items-center justify-center md:h-44 lg:h-56">
          <div className="flex h-full w-36 items-center justify-center rounded-full bg-gray-200 md:w-44 lg:w-56">
            <FaRegUser className="mx-auto text-5xl text-gray-400" />
            {/* <img src="" alt="" /> */}
          </div>
        </aside>

        <section className="mb-5 mt-2 text-center md:my-auto md:text-left">
          <p className="text-md mb-1 font-semibold text-gray-800 md:text-2xl">
            @username
          </p>
          <p>email@gmail.com</p>

          <p className="w-80 pt-5 text-center text-sm text-gray-400 md:w-auto md:text-left md:text-base">
            Get gorgeous, high-quality pictures that User has handpicked for
            free.
          </p>
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
