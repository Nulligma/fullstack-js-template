import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "../../api/todoApi";

const Home = () => {
    const query = useQuery({ queryKey: ['home-page'], queryFn: getHomePage });

    if (query.isFetching) return <div>Loading....</div>;

    if (query.isError)
        return (
            <div>
                {query.error.status}: {query.error.message}:
                {JSON.stringify(query.error.response?.data) || "No added message"}
            </div>
        );

    return <div>{query.data}</div>
}

export default Home;