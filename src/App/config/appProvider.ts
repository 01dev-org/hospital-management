import AppointmentController from "../controllers/AppointmentController";
import DoctorController from "../controllers/DoctorController";
import PatientController from "../controllers/PatientController";
import AppointmentRepository from "../Repositories/AppointmentRepository";
import DoctorRepository from "../Repositories/DoctorRepository";
import PatientRepository from "../Repositories/PatientRepository";
import AppointmentService from "../services/AppointmentService";
import DoctorService from "../services/DoctorService";
import PatientService from "../services/PatientService";

// Validator

//  -- DOCTOR --
const doctorRepository = new DoctorRepository();
const doctorService = new DoctorService(doctorRepository);
const doctorController = new DoctorController(doctorService);

// -- PATIENT --

const patientRepository = new PatientRepository();
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

// -- APPOINTMENT --

const appointmentRepository = new AppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);
const appointmentController = new AppointmentController(appointmentService);
export {
 doctorController,
 patientController,
 appointmentController
};

