CREATE TABLE Users(
    user_id uuid primary key DEFAULT gen_random_uuid(),
    user_email VARCHAR(100) UNIQUE NOT NULL,
    user_password VARCHAR(30) NOT NULL
);

CREATE TABLE Job(
    job_id uuid primary key DEFAULT gen_random_uuid(),
    job_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE User_jobs(
    user_id uuid NOT NULL REFERENCES Users(user_id),
    job_id uuid NOT NULL REFERENCES Job(job_id),
    primary key (user_id,job_id)
);

CREATE TABLE Profile(
    user_id uuid primary key REFERENCES Users(user_id),
    profile_name TEXT NOT NULL,
    profile_rating INT CHECK (
        profile_rating >=1
        AND profile_rating <=5
    )
);

CREATE TABLE Task(
    task_id uuid primary key DEFAULT gen_random_uuid(),
    task_mongo_id VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE User_tasks(
    user_id uuid NOT NULL REFERENCES Users(user_id),
    task_id uuid NOT NULL REFERENCES Task(task_id),
    primary key (user_id,task_id)
);

--Indexes
CREATE INDEX idx_user_email ON Users(user_email);
CREATE INDEX idx_task_mongo ON Task(task_mongo_id);