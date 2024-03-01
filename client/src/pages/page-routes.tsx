import { Route, Routes } from "react-router-dom";
import Home from "./home/home";
import NotFound from "./not-found/not-found";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
