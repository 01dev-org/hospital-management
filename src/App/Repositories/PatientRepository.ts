import { patients } from "../data/database"; // Import du tableau en mémoire
import { IPatient } from '../interfaces/Patient';

class PatientRepository {
  async create(patient: IPatient): Promise<IPatient> {
    patients.push(patient);
    return patient;
  }

  async list(): Promise<IPatient[]> {
    return patients;
  }

  async findById(id: string): Promise<IPatient | null> {
    return patients.find((p) => p.id === id) || null;
  }

  async delete(id: string): Promise<boolean> {
    const index = patients.findIndex((p) => p.id === id);
    if (index === -1) return false;
    patients.splice(index, 1);
    return true;
  }

}

export default PatientRepository;
