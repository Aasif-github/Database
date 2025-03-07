## How to install postgress using docker and create db using cli in ubuntu.

To install PostgreSQL using Docker and create a database using the CLI in Ubuntu, follow these steps:

---

### **Step 1: Install Docker**
If Docker is not installed, install it using:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```
Verify the installation:
```bash
docker --version
```

---

### **Step 2: Pull the PostgreSQL Docker Image**
Pull the latest PostgreSQL image from Docker Hub:
```bash
docker pull postgres
```

---

### **Step 3: Run a PostgreSQL Container**
Run a PostgreSQL container with the following command:
```bash
docker run --name my-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
```
- `--name my-postgres`: Assigns a name to the container.
- `-e POSTGRES_USER=admin`: Sets the username.
- `-e POSTGRES_PASSWORD=admin123`: Sets the password.
- `-e POSTGRES_DB=mydb`: Creates a database named `mydb`.
- `-p 5432:5432`: Maps PostgreSQL’s default port to the host.
- `-d postgres`: Runs the container in detached mode.

Check running containers:
```bash
docker ps
```


### To create `Table` and insert data into it(my_database_name=`E_COM_DB`).
```sql
E_COM_DB=# CREATE TABLE cars(brand VARCHAR(255), model VARCHAR(255), year INT);
CREATE TABLE
E_COM_DB=# select * from cars;
 brand | model | year 
-------+-------+------
(0 rows)

E_COM_DB=# INSERT INTO cars(brand, model, year) VALUES ('Ford','Mustang', 1965);
INSERT 0 1
E_COM_DB=# INSERT INTO cars(brand, model, year) VALUES ('BMW','Swdan', 1961);
INSERT 0 1
E_COM_DB=# select * from cars;
 brand |  model  | year 
-------+---------+------
 Ford  | Mustang | 1965
 BMW   | Swdan   | 1961
(2 rows)
```

---

### **Step 4: Access PostgreSQL CLI**
To enter the PostgreSQL shell:
```bash
docker exec -it my-postgres psql -U admin -d mydb
```
This logs you into the `psql` CLI.

---

### **Step 5: Create a New Database from CLI**
If you need to create a new database manually:
1. Enter the container:
   ```bash
   docker exec -it my-postgres bash
   ```
2. Access PostgreSQL:
   ```bash
   psql -U admin
   ```
3. Create a new database:
   ```sql
   CREATE DATABASE testdb;
   ```
4. Verify the database:
   ```sql
   \l
   ```
5. Exit:
   ```sql
   \q
   exit
   ```

---

### **Step 6: Stop & Restart the Container**
To stop the container:
```bash
docker stop my-postgres
```
To restart it:
```bash
docker start my-postgres
```

To remove the container (if needed):
```bash
docker rm -f my-postgres
```

Now, PostgreSQL is running in Docker, and you have successfully created a database using the CLI. 🚀