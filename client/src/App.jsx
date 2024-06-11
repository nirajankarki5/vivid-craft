import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SingleImage from "./pages/SingleImage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime is time till the data is invalidated. Once data is invalidated, it refetches the data
      staleTime: 60 * 1000, // milliseconds
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="c/:categoryName" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="image/:id" element={<SingleImage />} />
            <Route path="*" element={<Error />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
