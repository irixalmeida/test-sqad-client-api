import mongoose, { Schema } from "mongoose";

const AddressSchema: Schema = new Schema({
  cep: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: { type: String, required: true },
  street: { type: String, required: true },
});

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Por favor, forneça um email válido"],
  },
  phone: { type: String, required: true },
  address: { type: AddressSchema, required: true },
});

export default mongoose.model("Client", ClientSchema);
