import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "../../api/todoApi";
import { Link } from "react-router-dom";
import { Path } from "../../constants/routes";

const Home = () => {
  const query = useQuery({ queryKey: ["home-page"], queryFn: getHomePage });

  if (query.isFetching) return <div>Loading....</div>;

  if (query.isError)
    return (
      <div>
        {query.error.status}: {query.error.message}:
        {JSON.stringify(query.error.response?.data) || "No added message"}
      </div>
    );

  return (
    <div>
      {query.data} <br />{" "}
      <Link to={Path.todo}>
        <h2>View your todos</h2>
      </Link>
    </div>
  );
};

export default Home;
