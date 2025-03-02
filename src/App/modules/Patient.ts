import { IPatient } from "../interfaces/Patient";
import User from "./User";


export class Patient extends User implements IPatient {
    constructor(public id: string, public lastName: string, public firstName: string, public address: string, public phone: string) {
        super(id, lastName , firstName)
        this.address = address;
        this.phone = phone;
    }

}