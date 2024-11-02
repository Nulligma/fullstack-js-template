import { Outlet, useNavigate } from "react-router-dom"
import styles from './todoStyles.module.css'
import { useEffect, useState } from "react";
import { useAppStore } from "../../main.jsx";

const TodoLayout = () => {
    const token = useAppStore((state) => state.token);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const profile = useAppStore(state => state.profile);

    useEffect(() => {
        if(!token) navigate("/auth/login");
        else setLoading(false);
    }, [token]);

    if(loading) return 'Loading auth...';

    return <div className="card">
        <section className={styles.layout}>
            <h3>{profile.name}'s Todos</h3>
            <Outlet />
        </section>
    </div>
}

export default TodoLayout;