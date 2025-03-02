import { IUser } from "../interfaces/User";


class User implements IUser {
    constructor( public id: string, public lastName: string, public firstName: string) {}
}

export default User;
