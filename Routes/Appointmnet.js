const express = require("express");
const AppointmentRouter = express.Router();
const {
  isadminAuthenticated,
  isstaffAuthenticated,
} = require("../Middleware/Auth");
const {
  bookAppointment,
  getallappointments,
  deleteappointment,
  updateappointment,
} = require("../Controller/Appointment");

AppointmentRouter.post(
  "/bookappointment",
  isstaffAuthenticated,
  bookAppointment
);
AppointmentRouter.get(
  "/getallappointment",
  isstaffAuthenticated,
  
  
  getallappointments
);
AppointmentRouter.get(
  "/getallappointmentforadmin",
  
  isadminAuthenticated,
  
  getallappointments
);
AppointmentRouter.delete(
  "/delete/:id",
  isstaffAuthenticated,
 
  deleteappointment
);
AppointmentRouter.delete(
  "/deleteadmin/:id",
  isadminAuthenticated,
 
  deleteappointment
);
AppointmentRouter.put(
  "/update/:id",
  isstaffAuthenticated,
  
  updateappointment
);
AppointmentRouter.put(
  "/updateadmin/:id",
  isadminAuthenticated,
  
  updateappointment
);
module.exports = AppointmentRouter;
