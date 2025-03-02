import { IPatient } from "../interfaces/Patient";
import PatientRepository from "../Repositories/PatientRepository";

class PatientService {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async createPatient(patient: IPatient): Promise<IPatient> {
    return this.patientRepository.create(patient);
  }

  async listPatients(): Promise<IPatient[]> {
    return this.patientRepository.list();
  }

  async findPatientById(id: string): Promise<IPatient | null> {
    return this.patientRepository.findById(id);
  }

  async deletePatient(id: string): Promise<boolean> {
    return this.patientRepository.delete(id);
  }
}

export default PatientService;
