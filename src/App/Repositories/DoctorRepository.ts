import { medecins } from "../data/database";
import { IDoctor } from "../interfaces/Doctor";

class DoctorRepository {

  create(doctor: IDoctor): IDoctor {
    medecins.push(doctor);
    return doctor;
  }


  list(): IDoctor[] {
    return medecins;
  }

  findById(id: string): IDoctor | null {
    return medecins.find((doctor) => doctor.id === id) || null;
  }


  update(id: string, data: Partial<IDoctor>): IDoctor | null {
    const index = medecins.findIndex((doctor) => doctor.id === id);
    if (index === -1) return null;

    medecins[index] = { ...medecins[index], ...data };
    return medecins[index];
  }

  delete(id: string): boolean {
    const index = medecins.findIndex((doctor) => doctor.id === id);
    if (index === -1) return false;

    medecins.splice(index, 1);
    return true;
  }
}

export default DoctorRepository;
