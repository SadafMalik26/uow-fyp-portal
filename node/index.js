const express = require("express");
const databaseConn = require("./configs/databaseconn");
const errorHandling = require("./middleware/errorhandling");

const cors = require('cors');
const cookiesParser = require("cookie-parser");

const teacher = require("./routes/TeacherRoutes")
const student = require("./routes/StudentRoutes")
const admin = require("./routes/AdminRoutes")
const user = require("./routes/UserRoutes")
const group = require("./routes/GroupRoutes")
const timeline = require("./routes/TimelineRoutes")
const template = require("./routes/TemplateRoutes")
const project = require("./routes/ProjectRoutes")

const pastEndeavor = require("./routes/PastEndeavorRoutes")
const facultyProject = require("./routes/FacultyProjectRoutes")
const importantLink = require("./routes/ImpotantLinkRoutes")
const chat = require("./routes/ChatRoutes")
const meeting = require("./routes/MeetingRoutes")
const notice = require("./routes/NoticeRoutes")

require('dotenv').config()

//db connect mongoose
databaseConn();

const app = express();

var corsOptions = {
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
app.use(cookiesParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.Port || 5000;

//api with /user will go to user routes
app.use("/user", user);

//api with /teacher will go to teacher routes
app.use("/teacher", teacher);

//api with /student will go to student routes
app.use("/student", student);

//api with /admin will go to admin routes
app.use("/admin", admin);

//api with /group will go to group routes
app.use("/group", group);

//api with /timeline will go to timeline routes
app.use("/timelines", timeline);

//api with /template will go to template routes
app.use("/templates", template);

//api with /project will go to project routes
app.use("/projects", project);

//api with /pastendeavorlist will go to chat routes
app.use("/pastendeavor", pastEndeavor);

//api with /facultyproject list will go to chat routes
app.use("/facultyproject",facultyProject );

//api with /chat will go to chat routes
app.use("/chat", chat);

//api with /meeting will go to chat routes
app.use("/meeting", meeting);

//api with /important links will go to chat routes
app.use("/link", importantLink);

//api with /notice links will go to chat routes
app.use("/notice", notice);

app.use(errorHandling);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
