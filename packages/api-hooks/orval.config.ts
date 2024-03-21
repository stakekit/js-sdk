import { defineConfig } from 'orval';
import path from 'path';
import camelCase from 'lodash/camelCase';

const apiPath = path.join(__dirname, 'src', 'api');

const schemasPath = path.join(apiPath, 'schemas');
const indexPath = path.join(apiPath, 'index.ts');
const apiClientPath = path.join(__dirname, 'src', 'use-api-client.ts');

const getAsQueryOptions = () => ({
  query: {
    useQuery: true,
    shouldExportMutatorHooks: true,
  },
});

export default defineConfig({
  api: {
    output: {
      mode: 'split',
      target: indexPath,
      schemas: schemasPath,
      client: 'react-query',
      prettier: true,
      clean: true,
      mock: true,
      override: {
        header: false,
        operationName: (operation) =>
          camelCase(operation.operationId?.replace(/controller/i, '') ?? ''),
        mutator: {
          path: apiClientPath,
          name: 'useApi',
        },
        operations: {
          TokenController_getTokenBalances: getAsQueryOptions(),
          TokenController_tokenBalancesScan: getAsQueryOptions(),
          YieldController_yieldBalancesScan: getAsQueryOptions(),
          TokenController_getTokenPrices: getAsQueryOptions(),
          YieldController_getMultipleYieldBalances: getAsQueryOptions(),
          YieldController_getSingleYieldBalances: getAsQueryOptions(),
        },
      },
    },
    input: {
      target: 'https://staging-api.stakek.it/staking-docs-json',
    },
  },
});
