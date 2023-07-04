import { rest } from "msw";
import { config } from "../../src/config";
import { PriceRequestDto } from "@stakekit/api-hooks";
import { opportunities } from "./opportunities";

let txSubmitted = false;

const waitSec = (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));

export const handlers = [
  rest.options("*", (_req, res, ctx) => {
    return res(
      ctx.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      })
    );
  }),
  rest.get(`${config.apiUrl}v1/stake/opportunities`, (_req, res, ctx) => {
    return res(ctx.json(opportunities));
  }),
  rest.get(`${config.apiUrl}v1/stake/validators/*`, (_req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(
    `${config.apiUrl}v1/stake/6b7f626f-b57c-4991-904e-854be559a20e`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          id: "6b7f626f-b57c-4991-904e-854be559a20e",
          status: "CREATED",
          type: "STAKE",
          currentStepIndex: 0,
          amount: "0.1",
          tokenId: null,
          validatorAddress: null,
          transactions: [
            {
              id: "0b8ada3e-75c2-43ea-b496-19a5604f6de9",
              network: "avalanche-c",
              status: txSubmitted ? "CONFIRMED" : "WAITING_FOR_SIGNATURE",
              type: "STAKE",
              hash: txSubmitted ? "transaction_hash" : null,
              signedTransaction: null,
              unsignedTransaction:
                '{"data":"0x5bcb2fc6","to":"0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE","gasLimit":100000,"from":"0xCD9bFF7446FfC9570Ca3f303E4dc3419029fa72b","value":"0x016345785d8a0000","nonce":10,"type":2,"maxFeePerGas":"0x07ea8ed400","maxPriorityFeePerGas":"0x59682f00","chainId":43114}',
              stepIndex: 0,
              error: null,
              gasEstimate: {
                amount: "0.003550000000000000",
                gasLimit: "100000",
                token: {
                  name: "Avalanche C Chain",
                  symbol: "AVAX",
                  decimals: 18,
                  network: "avalanche-c",
                  coinGeckoId: "avalanche-2",
                  logoURI:
                    "https://raw.githubusercontent.com/steakwallet/assets/master/tokenicons/avax.png",
                },
              },
            },
          ],
        })
      );
    }
  ),
  rest.get(`${config.apiUrl}v1/transaction/gas/ethereum`, (_req, res, ctx) => {
    return res(
      ctx.json({
        customisable: true,
        modes: {
          denom: "gwei",
          values: [
            {
              name: "fast",
              value: "89.65",
              gasArgs: {
                denom: "gwei",
                type: 2,
                maxFeePerGas: "89.65",
                maxPriorityFeePerGas: "0.98",
              },
            },
            {
              name: "average",
              value: "88.98",
              gasArgs: {
                denom: "gwei",
                type: 2,
                maxFeePerGas: "88.98",
                maxPriorityFeePerGas: "0.31",
              },
            },
            {
              name: "slow",
              value: "88.84",
              gasArgs: {
                denom: "gwei",
                type: 2,
                maxFeePerGas: "88.84",
                maxPriorityFeePerGas: "0.17",
              },
            },
          ],
        },
      })
    );
  }),
  rest.get(
    `${config.apiUrl}v1/transaction/gas/avalanche-c`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          customisable: true,
          modes: {
            denom: "gwei",
            values: [
              {
                name: "slow",
                value: "29",
                gasArgs: {
                  denom: "wei",
                  type: 2,
                  maxFeePerGas: "28986515264",
                  maxPriorityFeePerGas: "1200000000",
                },
              },
              {
                name: "average",
                value: "36",
                gasArgs: {
                  denom: "wei",
                  type: 2,
                  maxFeePerGas: "36233144080",
                  maxPriorityFeePerGas: "1500000000",
                },
              },
              {
                name: "fast",
                value: "54",
                gasArgs: {
                  denom: "wei",
                  type: 2,
                  maxFeePerGas: "54349716120",
                  maxPriorityFeePerGas: "2250000000",
                },
              },
            ],
          },
        })
      );
    }
  ),
  rest.get(`${config.apiUrl}v1/stake/validators/*`, (_req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post(`${config.apiUrl}v1/token/prices`, async (req, res, ctx) => {
    const body: PriceRequestDto = await req.json();

    if (body.tokenList.some((t) => t.network === "avalanche-c")) {
      return res(
        ctx.json({
          "avalanche-c-undefined": {
            price: 16.84,
            price_24_h: 2.0529314659932427,
          },
        })
      );
    } else if (body.tokenList.some((t) => t.network === "ethereum")) {
      return res(
        ctx.json({
          "ethereum-undefined": {
            price: 1887.33,
            price_24_h: 1.9039819779887663,
          },
        })
      );
    }

    return res(ctx.json({}));
  }),
  rest.post(
    `${config.apiUrl}v1/transaction/0b8ada3e-75c2-43ea-b496-19a5604f6de9/submit_hash`,
    async (_req, res, ctx) => {
      txSubmitted = true;
      await waitSec(1);
      return res(ctx.status(200));
    }
  ),
  rest.post(`${config.apiUrl}v1/token/balances`, (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          amount: "2.671532599752370319",
          token: {
            network: "avalanche-c",
            name: "Avalanche C Chain",
            symbol: "AVAX",
            decimals: 18,
            coinGeckoId: "avalanche-2",
            logoURI:
              "https://raw.githubusercontent.com/steakwallet/assets/master/tokenicons/avax.png",
          },
        },
      ])
    );
  }),
  rest.get(`${config.apiUrl}v1/transaction/*/status`, (_req, res, ctx) => {
    return res(
      ctx.json({
        status: "CONFIRMED",
        url: "https://etherscan.io/",
      })
    );
  }),
  rest.post(`${config.apiUrl}v1/stake/enter`, (_req, res, ctx) => {
    return res(
      ctx.json({
        id: "6b7f626f-b57c-4991-904e-854be559a20e",
        status: "CREATED",
        type: "STAKE",
        currentStepIndex: 0,
        amount: "0.1",
        tokenId: null,
        validatorAddress: null,
        transactions: [
          {
            id: "0b8ada3e-75c2-43ea-b496-19a5604f6de9",
            network: "avalanche-c",
            status: "CREATED",
            type: "STAKE",
            hash: null,
            signedTransaction: null,
            unsignedTransaction: null,
            stepIndex: 0,
            error: null,
            gasEstimate: null,
          },
        ],
      })
    );
  }),
  rest.patch(
    `${config.apiUrl}v1/transaction/0b8ada3e-75c2-43ea-b496-19a5604f6de9`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          id: "0b8ada3e-75c2-43ea-b496-19a5604f6de9",
          network: "avalanche-c",
          status: "WAITING_FOR_SIGNATURE",
          type: "STAKE",
          hash: null,
          signedTransaction: null,
          unsignedTransaction:
            '{"data":"0x5bcb2fc6","to":"0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE","gasLimit":100000,"from":"0xCD9bFF7446FfC9570Ca3f303E4dc3419029fa72b","value":"0x016345785d8a0000","nonce":10,"type":2,"maxFeePerGas":"0x07ea8ed400","maxPriorityFeePerGas":"0x59682f00","chainId":43114}',
          stepIndex: 0,
          error: null,
          gasEstimate: {
            amount: "0.003550000000000000",
            gasLimit: "100000",
            token: {
              name: "Avalanche C Chain",
              symbol: "AVAX",
              decimals: 18,
              network: "avalanche-c",
              coinGeckoId: "avalanche-2",
              logoURI:
                "https://raw.githubusercontent.com/steakwallet/assets/master/tokenicons/avax.png",
            },
          },
        })
      );
    }
  ),
  rest.post("https://cloudflare-eth.com", async (req, res, ctx) => {
    const body = await req.json();

    switch (body.method) {
      case "eth_getBalance":
        return res(ctx.json({ jsonrpc: "2.0", result: "0x0", id: 0 }));
      case "eth_call":
        return res(
          ctx.json({
            jsonrpc: "2.0",
            result:
              "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000244e487b71000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000",
            id: 1,
          })
        );

      default:
        throw new Error("method not implemented: ", body.method);
    }
  }),
  rest.post(`https://api.avax.network/ext/bc/C/rpc`, (_req, res, ctx) => {
    return res(ctx.json({ jsonrpc: "2.0", result: "0x0", id: 0 }));
  }),
];
