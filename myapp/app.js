var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");
var likeCommentRouter = require('./routes/likeComment');

var app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./apiDocsV1/swagger.json");
app.use("/apiDocsV1", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/post", postsRouter);
app.use('/like-comment', likeCommentRouter);

//MongoDb Connection
var mongoose = require("./config/dbConfig");
const likeComment = require("./model/likeCommentModel");
mongoose.dbConnection();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});
console.log("Server is running on port 3000");
module.exports = app;
