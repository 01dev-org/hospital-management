import app from "../App";
import DoctorService from "../services/DoctorService";
import { rl } from "../interfaces/RL";
import render from "../views/menuView"; 
import { IDoctor } from "../interfaces/Doctor";

class DoctorController {
  private doctorService: DoctorService;

  constructor(doctorService: DoctorService) {
    this.doctorService = doctorService;
  }

  run() {
    render.displayDoctorManagement();
    rl.question("Veuillez choisir une option : ", (choice) => {
      switch (choice) {
        case "1":
          this.createDoctor();
          break;
        case "2":
          this.listDoctors();
          break;
        case "3":
          rl.question("Entrez l'ID du médecin : ", async (doctorId) => {
            if (!doctorId.trim()) {
              console.log("❌ L'ID du médecin est requis.");
              return this.run();
            }

            const doctor = await this.findDoctor(doctorId);
            if (doctor) {
             console.table(doctor);
            }
            this.run();
          });
          break;
        case "4":
          console.log("🔙 Retour au menu principal...");
          app();
          break;
        default:
          console.log("⚠️ Option invalide.");
          this.run();
      }
    });
  }

  // ✅ Ajouter un médecin
  createDoctor() {
    rl.question("Nom du médecin : ", (lastName) => {
      rl.question("Prénom du médecin : ", (firstName) => {
        rl.question("Spécialité du médecin : ", (speciality) => {
          const newDoctor: IDoctor = {
            id: (Math.random() * 10000).toFixed(0),
            lastName,
            firstName,
            speciality,
          };
          this.doctorService.createDoctor(newDoctor);
          console.log("✅ Médecin ajouté avec succès !");
          this.run();
        });
      });
    });
  }

  async listDoctors() {
    const doctors = await this.doctorService.listDoctors();

    if (doctors.length === 0) {
      console.log("⚠️ Aucun médecin disponible.");
    } else {
      console.log("\n📋 Liste des médecins :\n");

      doctors.forEach((doctor) => {
        const separator = "─".repeat(30);
        console.log(separator);
        console.log(`🆔 ID : ${doctor.id}`);
        console.log(`🩺 Nom : ${doctor.firstName} ${doctor.lastName}`);
        console.log(`🏥 Spécialité : ${doctor.speciality}`);
        console.log(separator);
      });
    }
    this.run();
  }

  async findDoctor(id: string): Promise<IDoctor | null> {
    const doctor = await this.doctorService.findDoctorById(id);

    if (!doctor) {
      console.log("❌ Médecin introuvable.");
      return null;
    }
    return doctor;
  }
}

export default DoctorController;
