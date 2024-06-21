import axios from "axios";
import cache from "../utils/cache";
import clientRepository from "../repositories/clientRepository";
import { ClientPayload, Client } from "../interfaces/clientInterface";
import {
  AddressDTO,
  transformViaCepResponse,
  transformBrasilApiResponse,
  transformApiCepResponse,
} from "../utils/addressDTO";

class ClientService {
  private async fetchAddress(cep: string): Promise<AddressDTO> {
    const cachedAddress = cache.get<AddressDTO>(cep);
    if (cachedAddress) {
      return cachedAddress;
    }

    const apis = [
      `https://viacep.com.br/ws/${cep}/json/`,
      `https://apicep.com/api-de-consulta/${cep.replace(/\D/g, "")}.json`,
      `https://brasilapi.com.br/api/cep/v1/${cep}`,
    ];

    for (const api of apis) {
      try {
        const response = await axios.get(api);
        const data = response.data;
        let address: AddressDTO;

        if (api.includes("viacep.com.br")) {
          address = transformViaCepResponse(data);
        } else if (api.includes("brasilapi.com.br")) {
          address = transformBrasilApiResponse(data);
        } else if (api.includes("apicep.com")) {
          address = transformApiCepResponse(data);
        } else {
          continue;
        }

        if (address) {
          cache.set(cep, address);
          return address;
        }
      } catch (error) {
        console.error(`Error fetching address from ${api}:`, error);
      }
    }

    throw new Error("CEP não encontrado");
  }

  async create(client: ClientPayload) {
    const address = await this.fetchAddress(client.cep);
    const payload: Client = {
      ...client,
      address,
    };

    console.log("payload", JSON.stringify(payload, null, 2));
    return await clientRepository.create(payload);
  }

  async findAll(page: number, limit: number) {
    const clients = await clientRepository.findAll(page, limit);
    const count = await clientRepository.count();
    return {
      count,
      previous:
        page > 1 ? `/api/v1/clients?page=${page - 1}&limit=${limit}` : null,
      next:
        page * limit < count
          ? `/api/v1/clients?page=${page + 1}&limit=${limit}`
          : null,
      results: clients,
    };
  }

  async findById(id: string) {
    return await clientRepository.findById(id);
  }

  async findByName(name: string, page: number, limit: number) {
    return await clientRepository.findByName(name, page, limit);
  }

  async deleteById(id: string) {
    return await clientRepository.deleteById(id);
  }
}

export default new ClientService();
