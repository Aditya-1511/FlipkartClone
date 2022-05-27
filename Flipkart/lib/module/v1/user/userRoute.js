const usrRoutr = require("express").Router();
const resHndlr = require("../../../responseHandler");
const middleware = require("../../../middleware");
const constants = require("../../../constant");
const usrFacade = require("./userFacade");
const validators = require("./userValidators");

usrRoutr
  .route("/signup")
  .post([validators.validateSignup], function (req, res) {
    let { name, email, password, gender, dob } = req.body;
    // console.log(req.body);
    usrFacade
      .signUp({ name, email, password, gender, dob })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

usrRoutr
  .route("/login")
  .post(
    [middleware.authenticate.autntctTkn, validators.validateLogin],
    function (req, res) {
      let { email, password } = req.body;

      usrFacade
        .login({ email, password })
        .then(function (result) {
          resHndlr.sendSuccess(res, result, req);
        })
        .catch(function (err) {
          resHndlr.sendError(res, err, req);
        });
    }
  );

usrRoutr
  .route("/logout")
  .post([middleware.authenticate.autntctTkn], function (req, res) {
    let { accessToken, email } = req.body;
    usrFacade
      .logout({ email, accessToken })
      .then(function (result) {
        resHndlr.sendSuccess(res, result, req);
      })
      .catch(function (err) {
        resHndlr.sendError(res, err, req);
      });
  });

module.exports = usrRoutr;
