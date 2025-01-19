const express = require("express");
const UserRouter = express.Router();
const {
  isadminAuthenticated,
  isstaffAuthenticated,
} = require("../Middleware/Auth");
const {
  staffregister,
  stafflogin,
  addnewadmin,
  logoutadmin,
  logoutstaff,
  registerdoctor,
  getuserdetails,
  getalldoctors
} = require("../Controller/User");
UserRouter.post("/staff/signup", staffregister);
UserRouter.post("/staff/login", stafflogin);
UserRouter.post("/admin/login", stafflogin);
UserRouter.post("/admin/signup", addnewadmin);
UserRouter.get("/adminlogout", isadminAuthenticated, logoutadmin);
UserRouter.get("/stafflogout", isstaffAuthenticated, logoutstaff);
UserRouter.post("/doctor/signup", isadminAuthenticated, registerdoctor);
UserRouter.get("/admin/details",isadminAuthenticated,getuserdetails)
UserRouter.get("/staff/details",isstaffAuthenticated,getuserdetails)
UserRouter.get("/getalldoctors",getalldoctors)

module.exports = UserRouter;
