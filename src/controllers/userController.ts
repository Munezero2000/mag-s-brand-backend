import express, {Request, Response} from "express";
import { validateUserObject, IUser } from "../models/user";
import UserService from "../services/userService";

export default class UserController{
    static async getUsers (req:Request, res:Response) {
        try {
            const users:IUser[] | null = await UserService.getAllUsers();
            if (!users) {
                res.status(400).send("No users found");
                return;
            }
            res.status(200).send({ usersCount: users.length, users: users });
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }

    static async registerUser (req:Request, res:Response){
        try {
            const { error } = validateUserObject(req.body);
            if (error) {
                res.status(400).send(error.details[0].message); // Return error message if validation fails
                return;
            }
    
            const { username, email, password, role } = req.body;
            // check if email has been used
            const theUser = await UserService.findUserByEmail(email);
            if (theUser) {
                res.status(400).send({ message: "Email has been taken"});
                return;
            }
            // save the user to the database
            const user: IUser | null = await UserService.createUser(username, email, password, role);
            if (!user) {
                res.status(400).send({ message: "Account not created" });
                return;
            }
    
            // Send the created user object back
            res.status(201).send({ message: "Account created successfully", createdUser: user });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Internal Server Error");
        }
    }

    static async getUserById(req:Request, res:Response)  {
        const { id } = req.params;
        try {
            if (!id) {
                res.status(400).send("an user id is required");
                return;
            }
    
            const user = await UserService.findUserById(id);
            if (!user) {
                res.status(400).send("user not found");
                return;
            }
            res.status(200).send(user);
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }

    static async updateUserInfo (req:Request, res:Response) {
        const { id } = req.params;
        try {
    
            // checking if the id is given
            if (!id) {
                res.status(400).send("a user id is required");
                return;
            }
            // validating new user information
            const { error } = validateUserObject(req.body);
            if (error) {
                res.status(400).send(error.details[0].message); // Return error message if validation fails
                return;
            }
            // getting the new information
            const { username, email, password, role, profile } = req.body
            const theUser: IUser = { username, email, password, role, profile };
    
            // updating the user if the id is valid and 
            const updatedUser = await UserService.findUserByIdAndUpdate(id, theUser);
            if (!updatedUser) {
                res.status(400).send("user not found");
                return;
            }
            res.status(200).send(updatedUser);
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }

    static async deleteUserInfo(req:Request, res:Response){
        const { id } = req.params;
        try {
            // checking if the id is given
            if (!id) {
                res.status(400).send("a user id is required");
                return;
            }
            // Deleting the user from the database
            const deletedUser = await UserService.findUserByIdAndDelete(id);
            if (!deletedUser) {
                res.status(400).send("user not found");
                return;
            }
            res.status(200).send({ message: "User had been deleted successfully", data: deletedUser });
    
        } catch (e) {
            console.log(e)
            res.status(500).send("Internal server error")
        }
    }
}