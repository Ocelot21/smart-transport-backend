import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from "../models/user.model";
import { newToken } from '../utils/jwt';
import {generateError, generateResponse} from "../utils/response";

const getUser = async (req, res) => {
    const { id } = req.params;
    try{
        const passedId = mongoose.Types.ObjectId(id);
        const user = await User.findOne({
            _id: passedId
        });
        return res.send(generateResponse({user}))
    } catch(err){
        return res.send(generateError({message: "User not found", err}));
    }
};

const login = async(req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({
            username: username
        })
        if(!user) throw new Error('No user');
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) throw new Error('Not valid password');
        const token = newToken(user);
        return res.send(generateResponse({token}));
    } catch (err) {
        return res.send(generateError({message: "User not found", err}));
    }
}

const me = async(req, res) => {
    try{
        return res.send(generateResponse({user: req.user}));
    } catch (err) {
        return res.send(generateError({message: "Error ", err}));
    }
}

const register = async(req, res) => {
    try{
        const { username, email, password} = req.body;
        const hash = bcrypt.hashSync(password.toString(), 12);
        const user = await User.create({
            username,
            email,
            role: 'driver',
            password: hash
        })
        if(!user) throw new Error('No user');
        return res.send(generateResponse({user}));
    } catch (err) {
        return res.send(generateError({message: "User not found", err}));
    }
}

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({
            role: 'driver'
        });
        return res.send(generateResponse({users}))
    } catch(err){
        return res.send(generateError({message: "User not found", err}));
    }
};

const userController = {
    getUser,
    login,
    me,
    register,
    getAllUsers
};

export default userController;