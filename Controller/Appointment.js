const asyncHandler = require("express-async-handler");
const AppointmentModel = require("../Model/Appointment");
const UserModel = require("../Model/User");

const bookAppointment = asyncHandler(async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      PatientId,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address,
    } = req.body;
    // console.log(  firstName,
    //     lastName,
    //     email,
    //     phone,
    //     nic,
    //     dob,
    //     gender,
    //     appointment_date,
    //     department,
    //     doctor_firstName,
    //     doctor_lastName,
    //     hasVisited,
    //     address,)
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !PatientId ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      throw new Error("Please complete the details");
    }
    // console.log(doctor_firstName,doctor_lastName,department)
    const isConflict = await UserModel.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });
    // console.log(isConflict)

    if (isConflict.length == 0) {
      throw new Error("Doctor not found ");
    }
    if (isConflict.length > 1) {
      throw new Error(
        "More than one doctor with this name please contact directly"
      );
    }

    const doctorId = isConflict[0]._id;
    // const patientId = req.user._id;

    const alreadyappointed = AppointmentModel.find({ email: email });
    // console.log(alreadyappointed);
    if ((await alreadyappointed).length > 0) {
      throw new Error("patient already registered");
    }
    const appointment = await AppointmentModel.create({
      firstName,
      lastName,
      email,
      phone,
      PatientId,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
    });

    res.json({
      success: true,
      message: "appointment sent successfully",
      appointment,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getallappointments = asyncHandler(async (req, res) => {
  try {
    const appointments = await AppointmentModel.find();
    res.json({ success: true, appointments });
  } catch (err) {
    throw new Error(err);
  }
});

//update appointment
const updateappointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(req.body);
  
  // console.log(lastName)
  try {
    
   
    let appointmnet = await AppointmentModel.findById(id);
    if (!appointmnet) {
      throw new Error("There is no appointment with respect to this id");
    }
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "PatientId",
      "dob",
      "gender",
      "appointment_date",
      "department",
      "doctor_firstName",
      "doctor_lastName",
      "status"
    ];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((field) => allowedFields.includes(field));

    if (!isValidUpdate) {
      throw new Error("Invalid field(s) provided for update.");
    }

    if (updates.length === 0) {
      throw new Error("Please provide at least one field to update.");
    }

    appointmnet = await AppointmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      // useFindAndModify: false,
    });
    res.json({
      success: true,
      message: "appointment update successfully",
      appointmnet,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const deleteappointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    let appointmnet = await AppointmentModel.findById(id);
    if (!appointmnet) {
      throw new Error("There is no appointment with respect to this id");
    }
    await appointmnet.deleteOne();
    res.json({ success: true, message: "appointment deleted successfully" });
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  bookAppointment,
  getallappointments,
  deleteappointment,
  updateappointment,
};
