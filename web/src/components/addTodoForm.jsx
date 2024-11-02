import { useForm } from "react-hook-form";
import styles from "./styles/form.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todoApi";

const AddTodoForm = () => {
    const { register, handleSubmit } = useForm();
    const queryClient = useQueryClient();
    const mutation = useMutation({ mutationFn: createTodo, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['todo-list'] }) } })

    const onSubmit = data => mutation.mutate(data);

    return <form className={styles.create} onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} className={styles.title} />
        <input type="date" {...register('dueDate')} />
        <button type="submit">Add</button>
    </form>
}

export default AddTodoForm;