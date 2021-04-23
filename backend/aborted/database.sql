CREATE DATABASE tangible;

CREATE TABLE cities(
    city_id SERIAL PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL
)

CREATE TABLE addresses(
    address_id SERIAL PRIMARY KEY,
    locality VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    building VARCHAR(100) NOT NULL,
    landmark VARCHAR(100),
    zip_code VARCHAR(6),
    city_id INT REFERENCES cities(city_id),
)

CREATE TABLE departments(
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
)

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    address_id INT REFERENCES addresses(address_id),
    department_id INT REFERENCES departments(department_id),
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP NOT NULL,
    mobile_no VARCHAR(10) NOT NULL
)

CREATE TABLE projects(
    project_id SERIAL PRIMARY_KEY,
    project_title VARCHAR(100) NOT NULL,
    project_description VARCHAR(255) NOT NULL,
    created_by INT REFERENCES users(user_id),
    assignee INT REFERENCES users(user_id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL 
)

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    task_title VARCHAR(100) NOT NULL,
    task_description VARCHAR(255) NOT NULL,
    project_id INT REFERENCES projects(project_id),
    created_by INT REFERENCES users(user_id),
    assignee INT REFERENCES users(user_id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL 
)