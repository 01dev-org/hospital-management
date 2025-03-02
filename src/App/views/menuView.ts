

const render = {
    displayMenu() {
        console.log(" === Menu principal ===:");
        console.log("1. Gestion Medecin");
        console.log("2. Gestion patient");
        console.log("3. Gestion des rendez-vous");
        console.log("4. Quitter");
    },
    displayDoctorManagement() {
        console.log(" === Gestion Medecin ===:");
        console.log("1. Ajouter un medecin");
        console.log("2. Afficher les medecin");
        console.log("3. Rechercher un medecin");
        console.log("4. Retourner au menu principal");
    },

    displayPatientManagement() {
        console.log(" === Gestion Patient ===:");
        console.log("1. Ajouter patient");
        console.log("2. Afficher les patients");
        // console.log("3. Rechercher un patient");
        // console.log("4. Demander un rendez-vous");
        console.log("3. Retourner au menu principal");
    },
    displayAppointmentManagement() {
        console.log(" === Gestion des Rendez-vous ===:");
        console.log("1. Creer un rendez-vous");
        console.log("2. lister les rendez-vous");
        console.log("3. Annuler un rendez-vous");
        console.log("4. Retourner au menu principal");
    },
};

export default render;
