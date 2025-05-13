## design database for role based access control (mysql)

Designing a **Role-Based Access Control (RBAC)** database in MySQL involves creating tables to manage:

1. Users
2. Roles
3. Permissions
4. Role-Permission relationships
5. User-Role relationships

---

## ✅ **RBAC Schema Design in MySQL**

### 🔸 1. `users` Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🔸 2. `roles` Table

```sql
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🔸 3. `permissions` Table

```sql
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 🔸 4. `user_roles` Table (Pivot table for many-to-many)

```sql
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

---

### 🔸 5. `role_permissions` Table (Pivot table for many-to-many)

```sql
CREATE TABLE role_permissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```

---

## ✅ Example Use Cases

| Task                      | Where it happens                                                           |
| ------------------------- | -------------------------------------------------------------------------- |
| Assign role to user       | Insert into `user_roles`                                                   |
| Assign permission to role | Insert into `role_permissions`                                             |
| Check user permission     | Join `users` → `user_roles` → `roles` → `role_permissions` → `permissions` |

---




## ✅ Sample Query: Get All Permissions of a User

```sql
SELECT p.name AS permission
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON r.id = ur.role_id
JOIN role_permissions rp ON rp.role_id = r.id
JOIN permissions p ON p.id = rp.permission_id
WHERE u.id = 1;
```

### permissions

---

Here’s how you can insert sample data into your `permissions` table:

---

## ✅ SQL: Insert Sample Permissions

```sql
INSERT INTO permissions (name, description) VALUES
('view_users', 'Permission to view user list'),
('create_users', 'Permission to create new users'),
('edit_users', 'Permission to edit existing users'),
('delete_users', 'Permission to delete users'),

('view_roles', 'Permission to view roles'),
('create_roles', 'Permission to create roles'),
('edit_roles', 'Permission to edit roles'),
('delete_roles', 'Permission to delete roles'),

('view_permissions', 'Permission to view permissions'),
('assign_permissions', 'Permission to assign permissions to roles');
```

---

## ✅ Verify Inserted Data

```sql
SELECT * FROM permissions;
```

---

Let me know if you’d like to seed other tables like `roles` and `users`, or want full insert queries for all relationships (`role_permissions`, etc.).


### seed role_permissions

Here's how you can **seed the `role_permissions` table** with sample data to associate roles with permissions.

---

## ✅ Assumptions

* You already have data in:

  * `roles` table (e.g., Admin, Editor, Viewer)
  * `permissions` table (e.g., view\_users, create\_users, etc.)

Let’s assume these IDs:

### 🔹 Roles

| Role   | ID |
| ------ | -- |
| Admin  | 1  |
| Editor | 2  |
| Viewer | 3  |

### 🔹 Permissions

| Permission          | ID |
| ------------------- | -- |
| view\_users         | 1  |
| create\_users       | 2  |
| edit\_users         | 3  |
| delete\_users       | 4  |
| view\_roles         | 5  |
| create\_roles       | 6  |
| edit\_roles         | 7  |
| delete\_roles       | 8  |
| view\_permissions   | 9  |
| assign\_permissions | 10 |

---

## ✅ SQL: Seed `role_permissions` Table

### 🔹 1. Admin gets **all permissions**:

```sql
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;
```

### 🔹 2. Editor gets **limited permissions**:

```sql
INSERT INTO role_permissions (role_id, permission_id) VALUES
(2, 1), -- view_users
(2, 2), -- create_users
(2, 3), -- edit_users
(2, 5), -- view_roles
(2, 6), -- create_roles
(2, 7); -- edit_roles
```

### 🔹 3. Viewer gets **read-only permissions**:

```sql
INSERT INTO role_permissions (role_id, permission_id) VALUES
(3, 1), -- view_users
(3, 5), -- view_roles
(3, 9); -- view_permissions
```

---

## ✅ Check Role Permissions

```sql
SELECT r.name AS role, p.name AS permission
FROM role_permissions rp
JOIN roles r ON r.id = rp.role_id
JOIN permissions p ON p.id = rp.permission_id
ORDER BY r.name;
```

---

Let me know if you want to generate this dynamically via Laravel Seeder or need seed data for `user_roles` as well.



