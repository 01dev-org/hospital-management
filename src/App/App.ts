import {rl} from "./interfaces/RL";
import render from "./views/menuView";
import {appointmentController, doctorController, patientController} from "./config/appProvider";

 function app() {
  render.displayMenu();
  rl.question("Choisissez une option : ", (choice) => {
    switch (choice) {
      case "1":
       doctorController.run();
        break;
      case "2":
        patientController.run();
        break;
      case "3":
        appointmentController.run();
        break;
      case "4":
        console.log("Au revoir !");
        rl.close();
        break;
      default:
        console.log("Option invalide.");
        app();
    }
  });
}

export default app;