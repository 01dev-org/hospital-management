import { IDoctor } from "../interfaces/Doctor";
import DoctorRepository from "../Repositories/DoctorRepository";

class DoctorService {
  private doctorRepository: DoctorRepository;

  constructor(doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async createDoctor(newDoctor : IDoctor): Promise<IDoctor> {
    return this.doctorRepository.create(newDoctor);
  }

  async listDoctors(): Promise<IDoctor[]> {
    return this.doctorRepository.list();
  }

  async findDoctorById(id: string): Promise<IDoctor | null> {
    return this.doctorRepository.findById(id);
  }

  
  async updateDoctor(id: string, data: Partial<IDoctor>): Promise<IDoctor | null> {
    return this.doctorRepository.update(id, data);
  }

  async deleteDoctor(id: string): Promise<boolean> {
    return this.doctorRepository.delete(id);
  }
}

export default DoctorService;
