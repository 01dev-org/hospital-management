import { medecins } from "../data/database"; // Import du tableau en mémoire
import { IDoctor } from "../interfaces/Doctor";

class DoctorRepository {
  // ✅ Ajouter un médecin
  create(doctor: IDoctor): IDoctor {
    medecins.push(doctor);
    return doctor;
  }

  // ✅ Obtenir tous les médecins
  list(): IDoctor[] {
    return medecins;
  }

  // ✅ Trouver un médecin par ID
  findById(id: string): IDoctor | null {
    return medecins.find((doctor) => doctor.id === id) || null;
  }

  // ✅ Mettre à jour un médecin
  update(id: string, data: Partial<IDoctor>): IDoctor | null {
    const index = medecins.findIndex((doctor) => doctor.id === id);
    if (index === -1) return null;

    medecins[index] = { ...medecins[index], ...data };
    return medecins[index];
  }

  // ✅ Supprimer un médecin
  delete(id: string): boolean {
    const index = medecins.findIndex((doctor) => doctor.id === id);
    if (index === -1) return false;

    medecins.splice(index, 1);
    return true;
  }
}

export default DoctorRepository;
