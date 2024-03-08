import { Route, Routes } from "react-router-dom";
import Home from "./home/home";
import NotFound from "./not-found/not-found";
import { AuthenticationGuard } from "@/guards/authentication-guard";
import Dashboard from "./dashboard/dashboard";
import Board from "./dashboard/board/board";
import AddJob from "./dashboard/board/add-job/add-job";

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route
        path="dashboard/board/:boardId"
        element={<AuthenticationGuard component={Board} />}
      >
        <Route
          path=":columnId/add-job"
          element={<AuthenticationGuard component={AddJob} />}
        />
      </Route>
      <Route
        path="dashboard"
        element={<AuthenticationGuard component={Dashboard} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
