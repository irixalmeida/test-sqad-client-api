export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Client API',
    version: '1.0.0',
    description: 'API for managing clients',
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
  ],
  components: {
    schemas: {
      Address: {
        type: 'object',
        required: ['cep', 'state', 'city', 'neighborhood', 'street'],
        properties: {
          cep: {
            type: 'string',
            description: 'The postal code of the address',
          },
          state: {
            type: 'string',
            description: 'The state of the address',
          },
          city: {
            type: 'string',
            description: 'The city of the address',
          },
          neighborhood: {
            type: 'string',
            description: 'The neighborhood of the address',
          },
          street: {
            type: 'string',
            description: 'The street of the address',
          },
        },
      },
      ClientRequest: {
        type: 'object',
        required: ['name', 'email', 'phone', 'address'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the client',
          },
          email: {
            type: 'string',
            description: 'The email of the client',
          },
          phone: {
            type: 'string',
            description: 'The phone number of the client',
          },
          address: {
            $ref: '#/components/schemas/Address',
          },
        },
      },
      ClientResponse: {
        type: 'object',
        required: ['id', 'name', 'email', 'phone', 'address'],
        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the client',
          },
          name: {
            type: 'string',
            description: 'The name of the client',
          },
          email: {
            type: 'string',
            description: 'The email of the client',
          },
          phone: {
            type: 'string',
            description: 'The phone number of the client',
          },
          address: {
            $ref: '#/components/schemas/Address',
          },
        },
      },
    },
  },
  paths: {
    '/api/v1/clients': {
      post: {
        summary: 'Create a new client',
        tags: ['Clients'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ClientRequest',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'The client was successfully created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ClientResponse',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
          },
        },
      },
      get: {
        summary: 'Get a list of clients',
        tags: ['Clients'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              default: 1,
            },
            description: 'The page number',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              default: 10,
            },
            description: 'The number of items per page',
          },
        ],
        responses: {
          200: {
            description: 'The list of clients',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'integer',
                      description: 'The total number of clients',
                    },
                    clients: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/ClientResponse',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
    '/api/v1/clients/{id}': {
      get: {
        summary: 'Get a client by id',
        tags: ['Clients'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The client id',
          },
        ],
        responses: {
          200: {
            description: 'The client description by id',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ClientResponse',
                },
              },
            },
          },
          404: {
            description: 'The client was not found',
          },
        },
      },
      delete: {
        summary: 'Delete a client by id',
        tags: ['Clients'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The client id',
          },
        ],
        responses: {
          200: {
            description: 'The client was deleted',
          },
          404: {
            description: 'The client was not found',
          },
        },
      },
    },
    '/api/v1/clients/search': {
      get: {
        summary: 'Search for clients by name',
        tags: ['Clients'],
        parameters: [
          {
            in: 'query',
            name: 'name',
            schema: {
              type: 'string',
            },
            description: 'The name to search for',
          },
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              default: 1,
            },
            description: 'The page number',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              default: 10,
            },
            description: 'The number of items per page',
          },
        ],
        responses: {
          200: {
            description: 'The list of clients',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ClientResponse',
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
  },
};
