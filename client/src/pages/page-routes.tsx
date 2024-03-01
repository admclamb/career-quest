import { Route, Routes } from "react-router-dom";
import Home from "./home/home";
import NotFound from "./not-found/not-found";
import { AuthenticationGuard } from "@/guards/authentication-guard";
import Dashboard from "./dashboard/dashboard";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="dashboard"
        element={<AuthenticationGuard component={Dashboard} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
