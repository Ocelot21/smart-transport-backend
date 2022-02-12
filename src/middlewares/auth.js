import User from "../models/user.model";
import {generateError} from "../utils/response";
import {verifyToken} from "../utils/jwt";

export const protectUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error(`Unauthorized`);
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        if (!token) {
            throw new Error(`Unauthorized`);
        }
        const payload = await verifyToken(token);
        const user = await User.findOne({
            _id: payload.id
        }).lean().exec();
        if(!user) throw new Error(`Unauthorized`);
        req.user = user;
        next()
    } catch (e) {
        return res.status(401).send(generateError({message: `Unauthorized`}));
    }
}

export const protectAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error(`Unauthorized`);
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        if (!token) {
            throw new Error(`Unauthorized`);
        }
        const payload = await verifyToken(token);
        const user = await User.findOne({
            _id: payload.id
        }).lean().exec();
        if(user?.role !== 'admin') throw new Error(`Unauthorized`);
        req.user = user;
        next()
    } catch (e) {
        return res.status(401).send(generateError({message: `Unauthorized`}));
    }
}