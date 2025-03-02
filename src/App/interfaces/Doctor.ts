import { IUser } from "./User";

export interface IDoctor extends IUser {
    speciality: string;
}