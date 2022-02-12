import mongoose from 'mongoose';

import User from "../models/user.model";
import {generateError, generateResponse} from "../utils/response";
import Bus from '../models/bus.model';

const createBus = async(req, res) => {
    try{
        const {
            busId,
            driver,
            seats,
            taken,
            route,
            lat,
            lng,
            broken,
        } = req.body;
        const driverId = await User.findOne({
            username: driver
        });
        const bus = await Bus.create({
            busId,
            driver: driverId._id,
            seats,
            taken,
            route,
            lat,
            lng,
            broken,
        })
        if(!bus) throw new Error('No bus');
        return res.send(generateResponse({bus}));
    } catch (err) {
        return res.send(generateError({message: "Bus not found", err}));
    }
};

const deleteBus = async(req, res) => {
    try{
        const { id } = req.params;
        const deleted = await Bus.findOneAndDelete({
            _id: mongoose.Types.ObjectId(id)
        });
        return res.send(generateResponse({deleted}));
    } catch (err) {
        return res.send(generateError({message: "Bus not found", err}));
    }
};

const getAll = async(req, res) => {
    try{
        const busses = await Bus.find({}).sort({ busId: -1 });
        return res.send(generateResponse({busses}));
    } catch(err) {
        return res.send(generateError({message: "Bus fetch error", err}));
    }
}

const get = async(req, res) => {
    try{
        const { id } = req.params;
        const bus = await Bus.findOne({
            _id: mongoose.Types.ObjectId(id)
        })
        return res.send(generateResponse({bus}));
    } catch(err) {
        return res.send(generateError({message: "Bus not found", err}));
    }
};

const postPassenger = async(req, res) => {
    try{
        const { id } = req.params;
        const secret = req.headers.secretcodearduino
        const { inPassanger, outPassanger } = req.body;
        if(secret.toString() !== process.env.ARDUINO_SECRET.toString()) throw new Error("No permission to post");
        let bus = await Bus.findOne({
            _id: mongoose.Types.ObjectId(id)
        })
        if(!bus) throw new Error("No bus");
        if(inPassanger === true && bus.taken + 1 <= bus.seats){
            bus = await Bus.updateOne({
                _id: mongoose.Types.ObjectId(id)
            }, {
                taken: bus.taken + 1
            });
        } else if (outPassanger === true && bus.taken - 1 >= 0) {
            bus = await Bus.updateOne({
                _id: mongoose.Types.ObjectId(id)
            }, {
                taken: bus.taken - 1
            });
        };
        bus = await Bus.findOne({
            _id: mongoose.Types.ObjectId(id)
        })
        return res.send(generateResponse({bus}));
    } catch(err) {
        return res.send(generateError({message: "Bus not found", err}));
    }
};

const postLocation = async(req, res) => {
    try{
        const { id } = req.params;
        const { lat, lng } = req.body;
        const bus = await Bus.updateOne({
            _id: mongoose.Types.ObjectId(id)
        }, {
            lat,
            lng
        });
        return res.send(generateResponse({bus}));
    } catch(err) {
        return res.send(generateError({message: "Bus not found", err}));
    }
};

const userController = {
    createBus,
    deleteBus,
    getAll,
    get,
    postPassenger,
    postLocation
};

export default userController;