import { IDoctor } from "./Doctor";
import { Status } from "./enums/Status";
import { IPatient } from "./Patient";


export interface IAppointment {
    id: string;
    date: Date;
    time: string;
    status: Status;
    doctor: IDoctor;
    patient: IPatient;
    // cancelAppointment(): void;
  }