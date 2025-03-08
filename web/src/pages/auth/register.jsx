import { useForm } from "react-hook-form";
import styles from "./authStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getJobList, registerUser } from "../../api/userApi";
import { useEffect, useState } from "react";
import { useAppStore } from "../../main";
import { Path } from "../../constants/routes";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const jobList = useQuery({ queryKey: ["job-list"], queryFn: getJobList });
  const [jobListStatus, setJobListStatus] = useState("loading...");
  const navigate = useNavigate();
  const setToken = useAppStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setToken(data.token);
      navigate(Path.todo);
    },
  });

  useEffect(() => {
    if (jobList.isFetching) setJobListStatus("fetching Job List...");

    if (jobList.isError) {
      const error = `${jobList.error.status}: ${jobList.error.message}:
                ${JSON.stringify(jobList.error.response?.data)}`;
      setJobListStatus(error);
    }

    if (jobList.isFetched) setJobListStatus(null);
  }, [jobList]);

  const onSubmit = (data) => mutation.mutate(data);

  if (mutation.isPending) return "Submitting user data";

  if (mutation.isError)
    return (
      <div>
        {mutation.error.status}: {mutation.error.message}:
        {JSON.stringify(mutation.error.response?.data) || "No added message"}
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        placeholder="enter email here"
        {...register("email")}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        placeholder="enter password here"
        {...register("password")}
      />

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        placeholder="enter name here"
        {...register("name")}
      />

      <label htmlFor="jobList">Select a job</label>
      {jobListStatus != null ? (
        <input disabled id="jobList" placeholder={jobListStatus} />
      ) : (
        <select id="jobList" name="jobList" {...register("jobList")} multiple>
          {jobList.data.map((job) => (
            <option key={job.jobId} value={job.jobName}>
              {job.jobName}
            </option>
          ))}
        </select>
      )}

      <button>Register</button>

      <Link to={"../login"}>Already registered? Login here</Link>
    </form>
  );
};

export default RegisterPage;
