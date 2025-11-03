<h1 align="center">🏫 School Management System</h1>

<p align="center">
  <img src="https://img.icons8.com/fluency/96/school.png" alt="School Icon" />
</p>

<p align="center">
  A full-stack <strong>School Management System</strong> application built using <strong>Spring Boot</strong> (backend), <strong>React</strong> (frontend), <strong>PostgreSQL</strong> (database), and <strong>Docker</strong> for containerization.
</p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li>Manage Students, Teachers, Classes, and Subjects</li>
  <li>User Authentication and Role-Based Access Control</li>
  <li>CRUD operations with RESTful APIs</li>
  <li>Responsive React frontend UI</li>
  <li>Dockerized backend, frontend, and PostgreSQL for easy deployment</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>
<p align="center">
  <img src="https://skillicons.dev/icons?i=spring,java,react,postgres,docker,git" alt="Tech Stack Icons" />
</p>

<hr>

<h2>📁 Project Structure</h2>
<pre><code>
backend/
 ├── src/studentmanagement
 │    └── main/java/com/example/schoolmanagement/
 │         ├── controller/
 │         ├── service/
 │         ├── security/
 │         ├── config/
 │         ├── dto/
 │         ├── repository/
 │         ├── model/
 │         └── SchoolManagementApplication.java
 └── src/main/resources/application.properties

frontend/
 ├── public/
 ├── src/
 │    ├── components/
 │    ├── pages/
 │    ├── App.js
 │    └── index.js
 └── package.json

docker-compose.yml
Dockerfile.backend
Dockerfile.frontend
</code></pre>

<hr>

<h2>📦 Running Locally</h2>

<h3>Clone the repo</h3>
<pre><code>git clone https://github.com/dhakeddevendra5/SchoolManagementSystem.git
cd school-management-system</code></pre>

<h3>Start PostgreSQL database</h3>
<pre><code>docker-compose up -d postgres</code></pre>

<h3>Run backend Spring Boot app</h3>
<pre><code>cd backend
./mvnw spring-boot:run
</code></pre>

<h3>Run React frontend app</h3>
<pre><code>cd frontend
npm install
npm start
</code></pre>

Access frontend at <code>http://localhost:3000</code>, backend at <code>http://localhost:8080</code>

<hr>

<h2>🐳 Run with Docker</h2>
<p>Run all services together with Docker Compose:</p>
<pre><code>docker-compose up --build</code></pre>

<p>Services:</p>
<ul>
  <li>Backend: Spring Boot app</li>
  <li>Frontend: React app</li>
  <li>PostgreSQL database</li>
</ul>

<hr>

<h2>🧪 API Endpoints (Examples)</h2>
<ul>
  <li><code>GET /api/students</code> - List all students</li>
  <li><code>POST /api/students/add</code> - Add new student</li>
  <li><code>PUT /api/teachers/{id}</code> - Update teacher details</li>
  <li><code>DELETE /api/classes/{id}</code> - Delete a class</li>
</ul>

<hr>

<h2>🤝 Contributing</h2>
<p>Contributions, issues, and feature requests are welcome! Feel free to check the <code>issues</code> page or submit a pull request.</p>

<hr>

<h2>📧 Contact</h2>
<p><strong>Devendra Dhaked</strong></p>
<ul>
  <li>Email: <a href="mailto:dhakeddevendra5@gmail.com">dhakeddevendra5@gmail.com</a></li>
  <li>LinkedIn: <a href="https://www.linkedin.com/in/dhakeddevendra5/" target="_blank">devendra-dhaked</a></li>
</ul>

<hr>

<h2>📜 License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
