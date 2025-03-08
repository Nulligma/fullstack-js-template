import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./todo/list.jsx";
import TodoLayout from "./todo/layout.jsx";
import HomePage from "./home/home.jsx";
import NotFound from "./home/notFound.jsx";
import TodoItem from "./todo/item.jsx";
import "../App.css";
import LoginPage from "./auth/login.jsx";
import RegisterPage from "./auth/register.jsx";
import AuthLayout from "./auth/authLayout.jsx";
import { Path } from "../constants/routes.js";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path={Path.home} element={<HomePage />} />

      <Route path={Path.auth} element={<AuthLayout />}>
        <Route path={Path.login} element={<LoginPage />} />
        <Route path={Path.register} element={<RegisterPage />} />
      </Route>

      <Route path={Path.todo} element={<TodoLayout />}>
        <Route index element={<TodoList />} />
        <Route path=":id" element={<TodoItem />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
