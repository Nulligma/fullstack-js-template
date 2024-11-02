import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTodo } from "../../api/todoApi";
import styles from "./todoStyles.module.css"

const TodoItem = () => {
    const { id } = useParams();
    const query = useQuery({ initialData: {}, queryKey: ['todo'], queryFn: () => getTodo(id) });

    if (query.isFetching) return <div>Loading....</div>;

    if (query.isError)
        return (
            <div>
                {query.error.status}: {query.error.message}:
                {JSON.stringify(query.error.response?.data) || "No added message"}
            </div>
        );


    return <div className={styles.item}>
        <div className={styles.header}>
            <h4 className={styles.title}>{query.data.title}</h4>
            <button>Close</button>
        </div>
        <div className={styles.body}>
            <textarea rows="4" cols="50">
                {query.data.body}
            </textarea>

            <b>Due on: {new Date(query.data.dueDate).toDateString()}</b>

            <div className={styles.actions}>
                <button>Update</button> <button>Delete</button>
            </div>
        </div>
    </div>
}

export default TodoItem;