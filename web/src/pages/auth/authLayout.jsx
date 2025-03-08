import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppStore } from "../../main.jsx";

const AuthLayout = () => {
  const token = useAppStore((state) => state.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) navigate("/todo");
    else setLoading(false);
  }, [token, navigate]);

  if (loading) return "Loading auth...";

  return (
    <>
      <h1>Auth</h1>
      <Outlet />
    </>
  );
};

export default AuthLayout;
