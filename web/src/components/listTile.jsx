import { Link } from "react-router-dom";

const ListTile = ({ _id, title, dueDate, done }) => {
    return <li>
        <Link to={`/todo/${_id}`}>
        <input type="checkbox" id={_id} name={_id} value={title} defaultChecked={done} />
        <label htmlFor={_id}>{title}</label>
        <i>{new Date(dueDate).toDateString()}</i>
        </Link>
    </li>
}

export default ListTile;