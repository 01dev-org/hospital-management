import { rl } from "../interfaces/RL";
import { Status } from "../interfaces/enums/Status";
import AppointmentService from "../services/AppointmentService";
import render from "../views/menuView";
import { medecins, patients } from "../data/database";
import app from "../App";

class AppointmentController {
  private appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }

  run() {
    render.displayAppointmentManagement();
    rl.question("Veuillez choisir une option : ", (choice) => {
      switch (choice) {
        case "1":
          this.createAppointment();
          break;
        case "2":
          this.listAppointments();
          break;
        case "3":
          this.cancelAppointment();
          break;
        case "4":
          console.log("Retour au menu principal.");
          app();
          break;
        default:
          console.log("Option invalide.");
          this.run();
      }
    });
  }

  async createAppointment() {    
      rl.question("Entrez la date du rendez-vous (YYYY-MM-DD) : ", async (date) => {
        rl.question("Entrez l'heure du rendez-vous (HH:MM) : ", async (time) => {
          rl.question("Entrez l'ID du médecin : ", async (doctorId) => {
            rl.question("Entrez l'ID du patient : ", async (patientId) => {
              const doctor = medecins.find((doc) => doc.id === doctorId);
              if (!doctor) {
                console.log("❌ Médecin introuvable.");
                return this.run();
              }

              const patient = patients.find((pat) => pat.id === patientId);
              if (!patient) {
                console.log("❌ Patient introuvable.");
                return this.run();
              }

              const appointment = {
                id : (Math.random() * 10000).toFixed(0),
                date: new Date(date),
                time,
                status: Status.PENDING,
                doctor,
                patient
              };

              const result = await this.appointmentService.scheduleAppointment(appointment);
              if (result) {
                console.log("✅ Rendez-vous créé avec succès !");
              } else {
                console.log("❌ Le patient a déjà un rendez-vous ce jour-là.");
              }
              this.run();
            });
          });
        });
      });
  }

  async listAppointments() {
    const appointments = await this.appointmentService.getAppointments();
    console.log("📅 Liste des rendez-vous :");
    appointments.forEach((rdv) => {
      console.log(`- ${rdv.date.toDateString()} à ${rdv.time}, Patient: ${rdv.patient.firstName}, Médecin: ${rdv.doctor.firstName}`);
    });
    this.run();
  }

  async cancelAppointment() {
    rl.question("Entrez l'ID du rendez-vous à annuler : ", async (id) => {
      const success = await this.appointmentService.cancelAppointment(id);
      if (success) {
        console.log("✅ Rendez-vous annulé avec succès.");
      } else {
        console.log("❌ Impossible d'annuler, ID introuvable.");
      }
      this.run();
    });
  }
}

export default AppointmentController;
