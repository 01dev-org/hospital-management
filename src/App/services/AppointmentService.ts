import { IAppointment } from "../interfaces/Appointment";
import { Status } from "../interfaces/enums/Status";
import AppointmentRepository from "../Repositories/AppointmentRepository";


class AppointmentService {
  private appointmentRepo: AppointmentRepository;

  constructor(appointmentRepo: AppointmentRepository) {
    this.appointmentRepo = appointmentRepo;
  }

  async scheduleAppointment(appointment: IAppointment): Promise<IAppointment> {
    return this.appointmentRepo.create(appointment);
  }

  async validateAppointment(appointment: IAppointment): Promise<boolean> {
    const existingAppointments = await this.appointmentRepo.list();
    
    const formattedDate = appointment.date.toISOString().split("T")[0]; 
    
    const existingAppointment = existingAppointments.find(
      (existingApp) => 
        existingApp.patient.id === appointment.patient.id && 
        existingApp.date.toISOString().split("T")[0] === formattedDate 
    );
  
    return !existingAppointment;
  }
  

  async getAppointments(): Promise<IAppointment[]> {
    return this.appointmentRepo.list();
  }

  async getAppointmentById(id: string): Promise<IAppointment | null> {
    return this.appointmentRepo.findById(id);
  }

  async cancelAppointment(id: string): Promise<boolean> {
    const appointment = await this.getAppointmentById(id);
    if (!appointment) return false;

    return !!(await this.appointmentRepo.update(id, { status: Status.CANCELLED}));
  }
}

export default AppointmentService;
