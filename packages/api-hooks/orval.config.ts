import { defineConfig } from 'orval';
import path from 'path';
import camelCase from 'lodash/camelCase';

const apiPath = path.join(__dirname, 'src', 'api');

const schemasPath = path.join(apiPath, 'schemas');
const indexPath = path.join(apiPath, 'index.ts');
const apiClientPath = path.join(__dirname, 'src', 'api-client.ts');
const customQueryOptions = path.join(__dirname, 'src', 'query-options.ts');

export default defineConfig({
  api: {
    output: {
      mode: 'split',
      target: indexPath,
      schemas: schemasPath,
      client: 'react-query',
      prettier: true,
      clean: true,
      override: {
        operationName: (operation) =>
          camelCase(operation.operationId?.replace(/controller/i, '') ?? ''),
        mutator: {
          path: apiClientPath,
          name: 'api',
        },
        query: {
          queryOptions: {
            path: customQueryOptions,
            name: 'customQueryOptions',
          },
          mutationOptions: {
            path: customQueryOptions,
            name: 'customQueryOptions',
          },
        },
        operations: {
          TokenController_getTokenBalances: {
            query: {
              useQuery: true,
              queryOptions: {
                path: customQueryOptions,
                name: 'customQueryOptions',
              },
              mutationOptions: {
                path: customQueryOptions,
                name: 'customQueryOptions',
              },
            },
          },
          TokenController_getTokenPrices: {
            query: {
              useQuery: true,
              queryOptions: {
                path: customQueryOptions,
                name: 'customQueryOptions',
              },
              mutationOptions: {
                path: customQueryOptions,
                name: 'customQueryOptions',
              },
            },
          },
          StakeController_getMultipleIntegrationBalances: {
            query: {
              useQuery: true,
              queryOptions: {
                path: customQueryOptions,
                name: 'customQueryOptions',
              },
              mutationOptions: {
                path: customQueryOptions,
                name: 'customQueryOptions',
              },
            },
          },
        },
      },
    },
    input: {
      target: 'https://staging-api.stakek.it/api-docs-json',
    },
  },
});
