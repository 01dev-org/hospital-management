import { IDoctor } from "../interfaces/Doctor";
import User from "./User";

class Doctor extends User implements IDoctor {

    constructor(public id: string, public lastName: string, public firstName: string, phone : string, public speciality : string){
        super(id, lastName , firstName)
    }
}

export default Doctor;