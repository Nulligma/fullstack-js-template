import { useForm } from "react-hook-form";
import styles from './authStyles.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/userApi";
import { useAppStore } from "../../main";

const LoginPage = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const setToken = useAppStore(state => state.setToken);
    const setProfile = useAppStore(state => state.setProfile);
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setToken(data.token);
            setProfile({ name: data.name, rating: data.rating });
            navigate("/todo");
        }
    });

    const onSubmit = (data) => mutation.mutate(data);

    if (mutation.isPending) return 'Submitting user data';

    if (mutation.isError)
        return (
            <div>
                {mutation.error.status}: {mutation.error.message}:
                {JSON.stringify(mutation.error.response?.data) || "No added message"}
            </div>
        );

    return <div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="enter email here" {...register('email')} />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" placeholder="enter password here" {...register('password')} />

            <button type="submit">Login</button>

            <Link to="../register">Create account</Link>
        </form>
    </div>
}

export default LoginPage;