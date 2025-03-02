import PatientService from "../services/PatientService";
import render from "../views/menuView";
import { IPatient } from "../interfaces/Patient";
import { rl } from "../interfaces/RL";
import app from "../App";

class PatientController {
  private patientService: PatientService;

  constructor(patientService: PatientService) {
    this.patientService = patientService;
  }

  run() {
    render.displayPatientManagement();
    rl.question("Veuillez choisir une option : ", (choice) => {
      switch (choice) {
        case "1":
          this.createPatient();
          break;
        case "2":
          this.listPatients();
          break;
        case "3":
          console.log("Retour au menu principal...");
         app();
          break;
        default:
          console.log("Option invalide.");
          this.run();
      }
    });
  }

  // ✅ Ajouter un patient
  createPatient() {
    rl.question("Nom du patient : ", (lastName) => {
      rl.question("Prénom du patient : ", (firstName) => {
        rl.question("Adresse : ", (address) => {
          rl.question("Téléphone : ", (phone) => {
            const newPatient: IPatient = {
              id: (Math.random() * 10000).toFixed(0), 
              lastName,
              firstName,
              address,
              phone,
            };

            this.patientService.createPatient(newPatient);
            console.log("✅ Patient ajouté avec succès !");
            this.run();
          });
        });
      });
    });
  }

  async  listPatients() {
    const patiensts = await this.patientService.listPatients();
  
    if (patiensts.length === 0) {
      console.log("⚠️ Aucun Patient n'est encore s'inscrit.");
    } else {
      console.log("\n📋 Liste des patients :\n");
  
      patiensts.forEach((patient) => {
        const separator = "─".repeat(30); 
        console.log(separator);
        console.log(`ID : ${patient.id}`);
        console.log(`🏥 Nom Complet : ${patient.firstName} ${patient.lastName}`);
        console.log(`📍 Adresse :  ${patient.address}`);
        console.log(`📞 Telephone : ${patient.phone}`);
        console.log(separator);
      });
    }
  
    this.run();
  }
}

export default PatientController;
