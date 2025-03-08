INSERT INTO Users (user_email,user_password) VALUES ('admin@admin.com','12345');

INSERT INTO Job (job_name) VALUES ('Gardening'),('Chef'),('Cleaning'),('Manager'),('Accounts');

INSERT INTO User_jobs (user_id,job_id) 
VALUES ((select user_id from users where user_email = 'admin@admin.com'),
		(select job_id from Job where job_name = 'Chef'));

INSERT INTO Profile VALUES (
    (select user_id from users where user_email = 'admin@admin.com'),
    'Admin oCompany',
    5
    );