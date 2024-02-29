import { IUser, User } from "../models/user";

export default class UserService{
    static async createUser(username:string, email:string, password:string, role:string){
        try{
        if(!username || !email ||!!password ||role){
            throw new Error("Invalid user data");
            }
        const user = new User({ username , email , password , role});
        return user
        }catch(error){
            console.log("Error creating blog: ", error)
            return null;
        }
    }
}