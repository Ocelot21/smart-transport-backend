import mongoose, { Schema } from 'mongoose';

const BusSchema = new Schema(
  {
    busId: {
      type: String,
      unique: true
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    seats: {
      type: Number
    },
    taken: {
      type: Number,
      default: 0
    },
    route: {
      type: String,
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    broken: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Bus = mongoose.model(
  'Bus',
  BusSchema
);

export default Bus;