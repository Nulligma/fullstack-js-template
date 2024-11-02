INSERT INTO Users (user_email) VALUES ('admin@admin.com');

INSERT INTO Job (job_name) VALUES ('Gardening'),('Chef'),('Cleaning'),('Manager'),('Accounts');

INSERT INTO User_jobs (user_id,job_id) VALUES ('15ca5cae-464d-4c94-a5b2-8deb6d534af0','"0a9d01ac-293f-4daf-b22c-16e83c88a3fa"');

INSERT INTO Profile VALUES (
    (select user_id from users where user_email = 'admin@admin.com'),
    'Admin oCompany',
    5
    )
