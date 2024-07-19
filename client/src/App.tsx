import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SingleImage from "./pages/SingleImage";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import Upload from "./pages/Upload";
import ProtectedRoute from "./pages/ProtectedRoute";

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
            <Route path="image/:imageId" element={<SingleImage />} />
            <Route path="about" element={<About />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="my-profile" element={<UserProfile />} />
              <Route path="upload" element={<Upload />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
