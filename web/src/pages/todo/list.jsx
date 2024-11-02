import AddTodoForm from "../../components/addTodoForm.jsx";
import ListTile from "../../components/listTile.jsx";
import styles from "./todoStyles.module.css"
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../../api/todoApi.js";

const List = () => {
    const query = useQuery({ initialData: [], queryKey: ['todo-list'], queryFn: getTodoList });

    if (query.isFetching) return <div>Loading....</div>;

    if (query.isError)
        return (
            <div>
                {query.error.status}: {query.error.message}:
                {JSON.stringify(query.error.response?.data) || "No added message"}
            </div>
        );

    return <div className={styles.todoList}>
        <ul>
            {query.data.map(todo => <ListTile key={todo._id} {...todo} />)}
        </ul>

        <AddTodoForm />
    </div>
}

export default List;