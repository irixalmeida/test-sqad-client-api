export interface AddressDTO {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

export const transformViaCepResponse = (data: any): AddressDTO => ({
  cep: data.cep.replace('-', ''),
  state: data.uf,
  city: data.localidade,
  neighborhood: data.bairro,
  street: data.logradouro,
});

export const transformBrasilApiResponse = (data: any): AddressDTO => ({
  cep: data.cep,
  state: data.state,
  city: data.city,
  neighborhood: data.neighborhood,
  street: data.street,
});

export const transformApiCepResponse = (data: any): AddressDTO => ({
  cep: data.code.replace('-', ''),
  state: data.state,
  city: data.city,
  neighborhood: data.district,
  street: data.address,
});
