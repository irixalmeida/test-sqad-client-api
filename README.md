# Client API

## Descrição

API para gerenciamento de clientes, incluindo cadastro, listagem, busca, exibição e exclusão de clientes. A API integra-se com serviços de consulta de endereços e utiliza cache para otimizar as consultas de CEP.

## Tecnologias

- Node.js
- TypeScript
- Express
- MongoDB
- Docker
- Jest
- Joi (validação de entradas)

## Requisitos

- Docker e Docker Compose
- Node.js (v16 ou superior)
- Yarn

## Configuração

### 1. Clonar o Repositório

Clone o repositório para o seu ambiente local:

```sh
git clone https://github.com/irixalmeida/test-sqad-client-api.git client-api
cd client-api
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente conforme necessário:

```sh
cp .env.example .env
```

### 3. Construir e Executar com Docker

Utilize o Docker Compose para construir e executar a aplicação e o banco de dados MongoDB:

```sh
docker-compose up --build
```

A aplicação estará disponível em `http://localhost:8080`.

### 4. Executar a Aplicação em Modo de Desenvolvimento

Se preferir executar a aplicação em modo de desenvolvimento sem Docker, siga estas etapas:

1. Instale as dependências:

   ```sh
   yarn install
   ```

2. Execute a aplicação em modo de desenvolvimento:

   ```sh
   yarn dev
   ```

### 5. Executar Testes

Para executar os testes unitários, utilize o comando:

```sh
yarn test
```

Os testes utilizam `mongodb-memory-server` para criar um banco de dados MongoDB em memória, e `nock` para interceptar e simular as chamadas HTTP às APIs externas.

## Endpoints

### Cadastro de um Cliente

- **URL**: `/api/v1/clients/`
- **Método**: `POST`
- **Request**:

```json
{
  "name": "João",
  "email": "joao@autovist.com.br",
  "phone": "11999887766",
  "cep": "01001000"
}
```

- **Response**:

```json
{
  "id": "bd981cab-d315-4486-85c7-c6af24c475f9",
  "name": "João",
  "email": "joao@autovist.com.br",
  "phone": "11999887766",
  "address": {
    "cep": "01001000",
    "street": "Praça da Sé",
    "neighborhood": "Sé",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

### Listagem de Clientes

- **URL**: `/api/v1/clients`
- **Método**: `GET`
- **Response**:

```json
{
  "count": 10,
  "previous": null,
  "next": "http://localhost:8080/api/v1/clients?page=2&limit=10",
  "results": [
    {
      "id": "bd981cab-d315-4486-85c7-c6af24c475f9",
      "name": "João"
    },
    {
      "id": "e486af2c-e5da-4a9b-916e-55a41d26e22d",
      "name": "Maria"
    }
  ]
}
```

### Detalhes de um Cliente

- **URL**: `/api/v1/clients/{id}`
- **Método**: `GET`
- **Response**:

```json
{
  "id": "bd981cab-d315-4486-85c7-c6af24c475f9",
  "name": "João",
  "email": "joao@autovist.com.br",
  "phone": "11999887766",
  "address": {
    "cep": "01001000",
    "street": "Praça da Sé",
    "neighborhood": "Sé",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

### Exclusão de um Cliente

- **URL**: `/api/v1/clients/{id}`
- **Método**: `DELETE`
- **Response**:

```json
{
  "message": "Client deleted successfully"
}
```

## Funcionamento do Cache

A aplicação utiliza um sistema de cache para otimizar as consultas de CEP. Quando um CEP é consultado pela primeira vez, o resultado é armazenado em cache por 1 hora. Nas próximas consultas para o mesmo CEP, o resultado é retornado diretamente do cache, reduzindo a latência e o número de chamadas às APIs de terceiros.

### Implementação do Cache

O cache é implementado utilizando a biblioteca `node-cache`. A configuração do cache está no arquivo `utils/cache.ts`:

```typescript
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // TTL de 1 hora

export default cache;
```

### Uso do Cache no Serviço de Cliente

No serviço de cliente, o cache é utilizado da seguinte forma:

```typescript
import cache from '../utils/cache';

class ClientService {
  private async fetchAddress(cep: string): Promise<AddressDTO> {
    const cachedAddress = cache.get<AddressDTO>(cep);
    if (cachedAddress) {
      return cachedAddress;
    }

    const address = ...;

    // Armazena o endereço no cache
    cache.set(cep, address);
    return address;
  }
}
```

## Validação das Entradas

Utilizamos `joi` para validar as entradas nas rotas. O middleware de validação está definido em `middlewares/validate.ts` e os esquemas de validação estão em `validations/clientValidation.ts`.

### Middleware de Validação

#### `middlewares/validate.ts`

```typescript
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validate = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

export default validate;
```

### Esquemas de Validação

#### `validations/clientValidation.ts`

```typescript
import Joi from "joi";

export const createClientSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  phone: Joi.string()
    .pattern(/^\d{10,20}$/)
    .required(),
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .required(),
});

export const updateClientSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  email: Joi.string().email().max(255).optional(),
  phone: Joi.string()
    .pattern(/^\d{10,20}$/)
    .optional(),
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .optional(),
});
```

## Estrutura de Pastas

A estrutura de pastas do projeto é a seguinte:

```
src/
│
├── controllers/
│   └── clientController.ts
│
├── models/
│   └── clientModel.ts
│
├── repositories/
│   └── clientRepository.ts
│
├── services/
│   └── clientService.ts
│
├── utils/
│   ├── cache.ts
│   └── addressDTO.ts
│
├── routes/
│   └── clientRoutes.ts
│
├── interfaces/
│   └── clientInterface.ts
│
├── middlewares/
│   └── validate.ts
│
├── validations/
│   └── clientValidation.ts
│
├── app.ts
└── server.ts
```

## Contribuição

Se você deseja contribuir para este projeto, por favor, siga as diretrizes de contribuição e envie um pull request. Toda ajuda é bem-vinda!

## Licença

Este projeto está licenciado sob a licença MIT.
