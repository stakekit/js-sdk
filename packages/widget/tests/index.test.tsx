import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vitest,
} from "vitest";
import { MockConnector } from "wagmi/connectors/mock";
import userEvent from "@testing-library/user-event";
import { render, waitFor, within } from "./utils/test-utils";
import { SKApp } from "../src/App";
import { server } from "./mocks/server";
import { getWagmiConfig } from "./utils/wagmi-utils";
import { createWalletClient, custom } from "viem";
import { avalanche } from "viem/chains";
import { config } from "../src/config";

describe("<SKApp />", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("Should render initial page correctly", () => {
    const { queryByText, queryByTestId, unmount } = render(
      <SKApp apiKey={config.apiKey} />
    );

    expect(queryByText("StakeKit")).toBeInTheDocument();
    expect(queryByText("StakeKKit")).not.toBeInTheDocument();
    expect(queryByTestId("number-input")).toBeInTheDocument();
    expect(queryByText("Connect Wallet")).toBeInTheDocument();

    unmount();
  });

  it("Selecting yield opportunity works as expected", async () => {
    const { getByTestId, getByText, unmount } = render(
      <SKApp apiKey={config.apiKey} />
    );

    await waitFor(() => getByTestId("select-opportunity")?.click());
    await waitFor(() =>
      expect(getByTestId("select-modal__search-input")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(getByTestId("select-modal__title")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(getByTestId("select-modal__container")).toBeInTheDocument()
    );

    const selectContainer = getByTestId("select-modal__container");

    await waitFor(() =>
      expect(within(selectContainer).getByText("Stake")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        within(selectContainer).getByText("Liquid stake")
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(
        within(selectContainer).getByTestId(
          "select-opportunity__item_avalanche-avax-liquid-staking-2"
        )
      ).toBeInTheDocument()
    );

    within(selectContainer)
      .getByTestId("select-opportunity__item_avalanche-avax-liquid-staking-2")
      .click();

    await waitFor(() => {
      const trigger = getByTestId("select-opportunity");

      return expect(within(trigger).getByText("AVAX")).toBeInTheDocument();
    });

    await waitFor(() =>
      expect(getByText("Connect Wallet")).toBeInTheDocument()
    );

    getByText("Connect Wallet").click();

    await waitFor(() =>
      expect(getByText("Connect a Wallet")).toBeInTheDocument()
    );

    unmount();
  });

  it("Should work correctly with connected account", async () => {
    const account = "0xA77598A90FEB39432A547e4693e8d493425D6B74";

    const requestFn = vitest.fn(async ({ method }: any) => {
      switch (method) {
        case "eth_sendTransaction":
          return "transaction_hash";

        default:
          break;
      }

      throw new Error("unhandled method");
    });

    const provider = {
      on: (message: string, listener: (...args: any[]) => null) => {
        if (message === "accountsChanged") {
          listener([account]);
        }
      },
      removeListener: () => null,
      request: requestFn,
    };

    const { queryByText, getByTestId, getByText } = render(
      <SKApp apiKey={config.apiKey} />,
      {
        wrapperProps: {
          wagmiConfig: getWagmiConfig({
            getMockConnector: (chains) =>
              new MockConnector({
                chains,
                options: {
                  chainId: avalanche.id,
                  walletClient: createWalletClient({
                    account,
                    chain: avalanche,
                    transport: custom(provider),
                  }),
                  flags: {
                    isAuthorized: true,
                  },
                },
              }),
          }),
        },
      }
    );

    await waitFor(() => expect(queryByText("0xA7…6B74")).toBeInTheDocument());

    await waitFor(() => getByTestId("select-opportunity")?.click());

    const selectContainer = getByTestId("select-modal__container");

    within(selectContainer)
      .getByTestId("select-opportunity__item_avalanche-avax-liquid-staking-2")
      .click();

    await waitFor(() => {
      const trigger = getByTestId("select-opportunity");

      return expect(within(trigger).getByText("AVAX")).toBeInTheDocument();
    });

    const user = userEvent.setup();

    await user.click(getByTestId("number-input"));
    await user.keyboard("0.1");

    expect(getByTestId("number-input")).toHaveValue(0.1);

    expect(getByText("Review")).toBeInTheDocument();

    expect(
      within(getByTestId("estimated-reward__percent")).getByText("7.20%")
    ).toBeInTheDocument();
    expect(
      within(getByTestId("estimated-reward__yearly")).getByText("0.0072 AVAX")
    ).toBeInTheDocument();
    expect(
      within(getByTestId("estimated-reward__monthly")).getByText("0.0006 AVAX")
    ).toBeInTheDocument();

    await user.click(getByText("Review"));

    await waitFor(() => getByTestId("estimated_gas_fee"), { timeout: 3000 });

    expect(getByText("Liquid stake")).toBeInTheDocument();

    expect(
      within(getByTestId("estimated_gas_fee")).getByText(
        "0.0035500 AVAX ($0.059782)"
      )
    ).toBeInTheDocument();

    expect(getByText("Confirm")).toBeInTheDocument();

    await user.click(getByText("Confirm"));

    await waitFor(() => expect(getByText("Follow Steps")).toBeInTheDocument());

    expect(requestFn).toHaveBeenCalledTimes(1);
    expect(requestFn).toHaveBeenCalledWith({
      method: "eth_sendTransaction",
      params: expect.anything(),
    });

    await waitFor(
      () =>
        expect(getByText("Successfully staked 0.1 AVAX")).toBeInTheDocument(),
      { timeout: 3000 }
    );
    expect(getByText("View transaction")).toBeInTheDocument();
  });
});
