import { IUser, User } from "../models/user";

export default class UserService {
    // a method to create new user
    static async createUser(username: string, email: string, password: string, role?: string) {
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
            const user = await User.find({ email });
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }

    static async findUserByIdAndUpdate(id:string, theUser: IUser) {
        try {
            const user = await User.findByIdAndUpdate(
                id, theUser, {new : true}
            );
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }

    static async findUserById(id: string) {
        try {
            const user = await User.findById(id);
            return user
        } catch (e) {
            console.log(e)
            return null
        }

    }

    static async getAllUsers() {
        try {
            const users = await User.find().select("-password");
            return users
        } catch (error) {
            console.log("Error creating blog: ", error)
            return null;
        }
    }
}