import ClientModel from "../models/clientModel";
import { Client } from "../interfaces/clientInterface";

class ClientRepository {
  async create(client: Client) {
    return await ClientModel.create(client);
  }

  async findAll(page: number, limit: number) {
    return await ClientModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select("id name");
  }

  async count() {
    return await ClientModel.countDocuments();
  }

  async findById(id: string) {
    return await ClientModel.findById(id);
  }

  async findByName(name: string, page: number, limit: number) {
    return await ClientModel.find({ name: new RegExp(name, "i") })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async deleteById(id: string) {
    return await ClientModel.findByIdAndDelete(id);
  }
}

export default new ClientRepository();
