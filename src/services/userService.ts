import { promises } from "dns";
import { IUser, User } from "../models/user";

export default class UserService {
    // a method to create new user
    static async createUser(
        username: string,
        email: string,
        password: string,
        role?: string) {
        try {
            if (!username || !email || !password) {
                throw new Error("Invalid user data");
            }
            const user = new User({ username, email, password, role });
            return await user.save();
        } catch (error) {
            console.log("Error creating blog: ", error)
            return null;
        }
    }

    // a method to get all users
    static async findUserByEmail(email: string) {
        try {
            const user = await User.findOne({ email });
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }
     // a method to update user information
    static async findUserByIdAndUpdate(id: string, theUser: IUser) {
        try {
            const user = await User.findByIdAndUpdate(
                id, theUser, { new: true }
            );
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }
    
    // a method to delete user
    static async findUserByIdAndDelete(id: string) {
        try {
            const user = await User.findByIdAndDelete(id
            );
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }

    static async findUserById(id: string):Promise<IUser|null> {
        try {
            const user: IUser|null = await User.findById(id);
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }

    static async getAllUsers():Promise<IUser[]|null> {
        try {
            const users = await User.find().select("-password");
            return users
        } catch (error) {
            console.log("Error creating blog: ", error)
            return null;
        }
    }
}