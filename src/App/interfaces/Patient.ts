import { IUser} from "./User";

export interface IPatient extends IUser {
    address: string;
    phone: string;
    // getPatient(): string;
}
