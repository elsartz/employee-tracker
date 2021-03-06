DROP TABLE IF EXISTS personnel;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    idd INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    idr INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dep_id INTEGER,
    CONSTRAINT fk_depid FOREIGN KEY (dep_id) REFERENCES department(idd) ON DELETE SET NULL
);

CREATE TABLE personnel (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_roleid FOREIGN KEY (role_id) REFERENCES roles(idr) ON DELETE SET NULL,
    CONSTRAINT fk_managerid FOREIGN KEY (manager_id) REFERENCES personnel(id) ON DELETE SET NULL
);

