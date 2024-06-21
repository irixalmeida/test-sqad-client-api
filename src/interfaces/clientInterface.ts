export interface Address {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export interface ClientPayload {
  name: string;
  email: string;
  phone: string;
  cep: string;
}

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}
