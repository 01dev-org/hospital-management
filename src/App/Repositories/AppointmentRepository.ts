import { IAppointment } from "../interfaces/Appointment";
import { Appointment } from "../modules/Appointment";
import { rdvs } from "../data/database";

class AppointmentRepository {

  async create(appointmentData: IAppointment): Promise<IAppointment> {
    const appointment = new Appointment(
      appointmentData.id,
      appointmentData.date,
      appointmentData.time,
      appointmentData.status,
      appointmentData.doctor,
      appointmentData.patient
    );

    rdvs.push(appointment);
    return appointment;
  }

  async list(): Promise<IAppointment[]> {
    return rdvs;
  }

  async findById(id: string): Promise<IAppointment | null> {
    return rdvs.find((rdv) => rdv.id === id) || null;
  }

  async update(id: string, data: Partial<IAppointment>): Promise<IAppointment | null> {
    const index = rdvs.findIndex((rdv) => rdv.id === id);
    if (index === -1) return null;

    rdvs[index] = { ...rdvs[index], ...data };
    return rdvs[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = rdvs.findIndex((rdv) => rdv.id === id);
    if (index === -1) return false;
    rdvs.splice(index, 1);
    return true;
  }


}


export default AppointmentRepository;
