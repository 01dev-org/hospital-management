import { IAppointment } from "../interfaces/Appointment";
import { IDoctor } from "../interfaces/Doctor";
import { Status } from "../interfaces/enums/Status";
import { IPatient } from "../interfaces/Patient";

export class Appointment implements IAppointment {

    constructor (
        public id: string,
        public date: Date,
        public time: string,
        public status: Status,
        public doctor: IDoctor,
        public patient: IPatient
    ){}

    // cancelAppointment(): void{
    //     this.status == "CANCELLED" 
    //     console.log(`Le rendez-vous ${this.id} de ${this.patient.firstName} a été annulé.`);
    // }
}