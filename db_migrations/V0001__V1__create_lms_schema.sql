
CREATE TABLE t_p80947900_training_platform_ma.departments (
    department_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TYPE t_p80947900_training_platform_ma.user_role AS ENUM ('worker', 'admin');

CREATE TABLE t_p80947900_training_platform_ma.users (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    login VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role t_p80947900_training_platform_ma.user_role NOT NULL DEFAULT 'worker',
    department_id INT REFERENCES t_p80947900_training_platform_ma.departments(department_id)
);

CREATE INDEX idx_users_department_id ON t_p80947900_training_platform_ma.users(department_id);
CREATE INDEX idx_users_login ON t_p80947900_training_platform_ma.users(login);

CREATE TABLE t_p80947900_training_platform_ma.courses (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by_user_id INT REFERENCES t_p80947900_training_platform_ma.users(user_id)
);

CREATE INDEX idx_courses_created_by ON t_p80947900_training_platform_ma.courses(created_by_user_id);

CREATE TABLE t_p80947900_training_platform_ma.course_materials (
    material_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES t_p80947900_training_platform_ma.courses(course_id),
    title VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_course_materials_course_id ON t_p80947900_training_platform_ma.course_materials(course_id);

CREATE TABLE t_p80947900_training_platform_ma.tests (
    test_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES t_p80947900_training_platform_ma.courses(course_id),
    title VARCHAR(255) NOT NULL,
    created_by_user_id INT REFERENCES t_p80947900_training_platform_ma.users(user_id)
);

CREATE INDEX idx_tests_course_id ON t_p80947900_training_platform_ma.tests(course_id);
CREATE INDEX idx_tests_created_by ON t_p80947900_training_platform_ma.tests(created_by_user_id);

CREATE TABLE t_p80947900_training_platform_ma.questions (
    question_id SERIAL PRIMARY KEY,
    test_id INT NOT NULL REFERENCES t_p80947900_training_platform_ma.tests(test_id),
    question_text TEXT NOT NULL,
    created_by_user_id INT REFERENCES t_p80947900_training_platform_ma.users(user_id)
);

CREATE INDEX idx_questions_test_id ON t_p80947900_training_platform_ma.questions(test_id);
CREATE INDEX idx_questions_created_by ON t_p80947900_training_platform_ma.questions(created_by_user_id);

CREATE TABLE t_p80947900_training_platform_ma.answers (
    answer_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES t_p80947900_training_platform_ma.questions(question_id),
    answer_text VARCHAR(500) NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_answers_question_id ON t_p80947900_training_platform_ma.answers(question_id);

CREATE TYPE t_p80947900_training_platform_ma.test_status AS ENUM ('passed', 'failed');

CREATE TABLE t_p80947900_training_platform_ma.test_results (
    result_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES t_p80947900_training_platform_ma.users(user_id),
    test_id INT NOT NULL REFERENCES t_p80947900_training_platform_ma.tests(test_id),
    score_percentage DECIMAL(5,2) NOT NULL,
    status t_p80947900_training_platform_ma.test_status NOT NULL,
    completion_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_results_user_id ON t_p80947900_training_platform_ma.test_results(user_id);
CREATE INDEX idx_test_results_test_id ON t_p80947900_training_platform_ma.test_results(test_id);
