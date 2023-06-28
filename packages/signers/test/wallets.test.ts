import { getTerraWallet, ImportableWallets } from '../src';
import { resolvers } from './wallets';

describe('address derivation', () => {
  describe('evm', () => {
    const mnemonic =
      'rapid win level head man snack indicate luggage square census antique great';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['0xabE300d8c52be198Ad9af3a4dc1b62dfF8C51CbC'],
      ],
      [ImportableWallets.Omni, ['0x06b2a94be479a5bDEd9E61A1cc7079214C2f1F06']],
      [
        ImportableWallets.MetaMask,
        [
          '0x06b2a94be479a5bDEd9E61A1cc7079214C2f1F06',
          '0xD7502BD9b9871251E869156AC25a27E0Af41dF87',
          '0x2222336eC22f0EbF60F474cd27B277864a064Cdd',
          '0x04F184f060C22362D414147454E87F3F9607Ee39',
          '0x1Eb3c5C622EB7C68387853e9d75c3c89E9FEf9E1',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          '0xF0f94F3c4FcBD32Abc2cf819DE0CB027582c13d3',
          '0x022497F49f96a4d2B37f4cE0E142f7d9f0f8465f',
          '0x5F5a4Ec9b226411EaF111b35844c3B300eA8742c',
          '0x593D40b8b2A152b8e04E0D6DDa424E026ff8dd05',
          '0xe01bc19B4E2C00556D7B7Ba79E25bc6a4BDD2eaD',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          '0x3623A3448D37f15c1A7489f43Fca1D5fC843F122',
          '0xEd72C3a66C8E0E6563e1Bb621e384492cD359500',
          '0x1a596b047c14571d58865F34AB77558088f8d4d3',
          '0x411a3f1e5aF9735574Ca9A49964D94C9fBA868d9',
          '0xDC2697Ab6e82032dc0363b0bAfA20414F33eAaD1',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.evm({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);
        }
      });
    }
  });

  describe('cosmos', () => {
    const mnemonic =
      'elite now wine fabric hybrid fury top reject decorate wife silent material';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['cosmos17szgglaazza8qdrzlg9qk4aqtftea9ymgdj0cz'],
      ],
      [
        ImportableWallets.Omni,
        ['cosmos17szgglaazza8qdrzlg9qk4aqtftea9ymgdj0cz'],
      ],
      [
        ImportableWallets.MetaMask,
        [
          'cosmos1uedcanc79c02xcm3yvvgh2dfsek682lhdj7sat',
          'cosmos13xrugzvhuczd8krymdzw63m4m4usx7d3qt4h98',
          'cosmos1jp3k2ypwqmaks0pa9n4c0qywqk2ja6qjz2r3cp',
          'cosmos1ccytgx3ydmk587wrcv8e6wv54wj5s9rdgyh3a5',
          'cosmos1gx46vhhzhxn3sw3n7jf2ntp35gs9wzmmz8lesl',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          'cosmos17szgglaazza8qdrzlg9qk4aqtftea9ymgdj0cz',
          'cosmos1y48xwzjnq7n8etux8hdv8twuj3l4v2vsmdh70n',
          'cosmos1w6fluqtkn7uj8a0z4emmnhwkjsu0gkmq6l2w8t',
          'cosmos1suj4wca563net0xlgft2f83w98ypey87vqpdy3',
          'cosmos176q6mtne4w2uphhwn3pv33n6djm7eudkwh6zrd',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          'cosmos1mc4728wu32u4xgv9vvyn97kdl9cr8f8rx3xgph',
          'cosmos1p25dkgrdzdqh0yvwaqkltsc5unhnulrxhgtdvx',
          'cosmos1rgxxue8wwdvdekskrehsqtme600e6prwcssus6',
          'cosmos17cfvxwhvwxvljn7d5dwg747c8kqpjmqkdwz0x8',
          'cosmos1927ex3eeaf7zd00mjph5vrzrlnfmaz5a6adctp',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.cosmos('cosmos', {
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);

          const luna = await resolvers.cosmos('terra', {
            mnemonic,
            walletType,
            index: i,
          });
          const anc = await getTerraWallet({ mnemonic, walletType, index: i });
          expect(luna).toStrictEqual(anc.accAddress);
        }
      });
    }
  });

  describe('solana', () => {
    const mnemonic =
      'session afraid inform pet smart animal orient twice civil leaf all boat';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['EAdFkm9aVd9JhoZNEk3oQe6KAQyEVREBHZTcYSMh5Msp'],
      ],
      [
        ImportableWallets.Omni,
        ['EAdFkm9aVd9JhoZNEk3oQe6KAQyEVREBHZTcYSMh5Msp'],
      ],
      [
        ImportableWallets.MetaMask,
        [
          '5CtoZza6etVUnY4djMH8noeF18yfRf83SuTDdozCQHMN',
          '4CrdExxyW6fGAJhEdtBYZjLZZSNvJqNbzzBefV8LSLLA',
          '2qBtA2HyxSK2etH9TGeJCz6CvDLtpx2nKxKSu8dyDHfi',
          '7jmLN8AYK9JQNTQbEMTfLGGYHC7sYJRZxFYEQ1E8Z3kv',
          'F3JpbvCEKA5tv54qS4ehD1rWPHAAnBB2wbHXttef4Q7Z',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          '5Wrgvj7GCCiDztPodbCXxUW3dBSAWanaUJDN5YVqgH5g',
          '52KZESMRmVU25g2MziWJF4YpAQTgtsaydPnrMnyqfEin',
          'E1hVGECCkfhrgkRkPV28gxNK1cDvvYBbvsHEuHksvYJQ',
          'Gw7MthhvfS53e3bgEJNr9ZVEYQ5onLfPR8BjrLqtMEZW',
          '5YUCC14ywcaXmyNz5x7DADeXx25Ug9xg52SRm7ZSg44Y',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          '9mzU2JZJANjWebjQwh21rtQk5jx9Ag2qeXApyQKYwZ5T',
          '4KGsPqstfxe79GqXm5BM2Ee9j9P7tH3Fi36qMYkYmZMg',
          '4bmB3xiu5kAnw4D4Zz4xrWATbJAsVedA75ToxwKPvnKz',
          '5kNDSpwkqSU8kbu88JWNHbRBLE7SAGVEBTswBePmzMYW',
          '6V9F2D74BDMAJDLBoah8fDGCN8vSojvYzxWUffYPEuzq',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.solana({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);
        }
      });
    }
  });

  describe('near', () => {
    const mnemonic =
      'female reduce blur cute cute crash eye wish banana abandon then photo';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['cd3fdfc62a5dd222531bef10027a91d049fc6c39113ca937f119a1002ddb21c1'],
      ],
      [
        ImportableWallets.Omni,
        ['cd3fdfc62a5dd222531bef10027a91d049fc6c39113ca937f119a1002ddb21c1'],
      ],
      [
        ImportableWallets.MetaMask,
        [
          '14f93186d409e47d3fd633dada4d13b4c271ddf0237ed37a0e3c91ec106687c5',
          'ab359a68183286adbdc2c412c24553ce59054b2c510a0884565c138f926c8de7',
          '61173f133e7c0bfb781e058a6bbced993c051c43b556d161a6503ce7d5f07396',
          'f13358448885ee74e0c10eafafa950266ea74f87f5e2c706b7b6798e8cbd3ec9',
          'fd2b2895b5e7a73087689594220e66cfd707d481ee0f34ff7c4e650cd6ad102f',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          '354195e799da5c9cc2e2bc96f1950e2b0de98cba610881c3444a09351bfd33de',
          'cc3f1fb01855ecee3f0a2744000b54a96cb4014fcc83bbb257effa1e020c3505',
          'd8e8e8c4a8b32252719563d581c82268996c52131ee53eb25ed5625eea115c54',
          'e37466a194ae11ecc93b6f2aa505b7905ca9dea687ac3b3cc725d3c7f37735a9',
          'fa2e14f8bd291fd756ced854813c2697307f10884671d150719db22b6392ad58',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          '65e732854bf414e9221e203854541920b50f4f2522c5c69e94caed33ca488a18',
          '8c0376c3790234cdcbfa7515471168bf4e5545918f70769084321668758dbbdf',
          'c3a5800623efa4a94f8b47e95d31ede6b8592f508d0f5c220039563c6441ab56',
          '07afee596f615918e612c35233def02e4e7f91c0711b8a889829cce4e2fa96e5',
          '854b67f6a155496372641b18ea3f0c40fc329f7fbbaa797c47091af67121c57e',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.near({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);
        }
      });
    }
  });

  describe('tezos', () => {
    const mnemonic =
      'cover cinnamon dash later plate object hurry police damage loop inflict desert';

    const tests: [ImportableWallets, string[]][] = [
      [ImportableWallets.Steakwallet, ['tz1ccyzQY9gL3JjYWedKxdhE3k83c63DMSoR']],
      [ImportableWallets.Omni, ['tz1ccyzQY9gL3JjYWedKxdhE3k83c63DMSoR']],
      [
        ImportableWallets.MetaMask,
        [
          'tz1YGrkms1bKyGJpyf6uHFTRJEBdF9EsfAno',
          'tz1XNQTBbijAyeBhx5qp3eTf8whziek9aKua',
          'tz1PSrz4gr3Y4TrTYQ1W2DzLd3mD7dcD1sob',
          'tz1bsJ4YCZrd2FvwkL5buFF994sS4FkYx8qF',
          'tz1YRjD5rA5CuVRA1wJu1iSq9oo6Z5fi2XwY',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          'tz1hnVGuXYPfkhr7JZsvcgM6VkJ2yjm4BatK',
          'tz1LnJWua6swBJr92YnjGN83ryfoSKMDvo9H',
          'tz1ReiL4xMyPQXgnDd3Gpvgk9z3R4CxL4rpw',
          'tz1asuU6hU5su56qudukZnN1yJQwVK6HNSn7',
          'tz1NhLVGpUf67yEqAGxG3os7E1Yat2SrJEiC',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          'tz1X8N7bpK4rddGNw2HfeQU94sVuJxE6K8AZ',
          'tz1ecwZGJfTtYiu9iXxLVB9h9pp8HfhhGR4V',
          'tz1XKWzsAFptevoGu4aEp2jsjarkZ9Xddo7B',
          'tz1dgjLioAoEzkfkStUjSDvaoS1svXwzP2Ja',
          'tz1ZH5a3LcLGh6bFZzb92BEPk9agCfLoX4XM',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.tezos({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);
        }
      });
    }
  });

  describe('binance', () => {
    const mnemonic =
      'cover cinnamon dash later plate object hurry police damage loop inflict desert';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['29a7be2dba3d963380be0a63d6bcfad6fae542936c26200e3d4c6ff15784af51'],
      ],
      [
        ImportableWallets.Omni,
        ['29a7be2dba3d963380be0a63d6bcfad6fae542936c26200e3d4c6ff15784af51'],
      ],
      [
        ImportableWallets.MetaMask,
        [
          '5b95c2195cbfe5a4a3f786a91da9a7a5d5c2fd197e5b762d3ed6ca1e20629f0a',
          '5e4f66e2a13d70bea0b340b531cb0bad64ca47e92e20bd58137ea2f3609e0a51',
          '951407a81c9a09ddd34d1bda30aad37b15760b3e98a98fa7927f8b870337bc39',
          'f95eb5001c9c7568041177ba27fa64bc914a7d2e68df36c49de56f3e294c658a',
          '4bbeab8fe60a945ed3feccc5969dcd2b1d07df494a2dcc706ac2de14cf160a1a',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          '620d70b70c3af639727401da1aee825ab0a663ac44ee3f3e6b9da5c556a398af',
          'eb6b7d043575aef531ad913bbe0e3ebdbb7f7a2e8ed11863c91acbda9856f2dd',
          '6db673dfaeb2f3837e1c6464e9c932f0fdc29bca7436a90f2aab463c318e52be',
          '3a26559e3bd540d8ed7ace6c6b71c03e4a4c301a6ba0067638e16bf0aa52c7de',
          '9e1cf8b6efb935699360c09894bd29effd3297fa5009ea4b42a201b71b454453',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          'b30308776508ebd11f969ffee3a1710581fdaab1ef79dd9462d90228cecd4646',
          'e95dd1766aabe9db86c34f9630ba3d111faf50269488e79aaeee38ee4b928d55',
          '7b137ea94d86b0bdcf0e4494ffd41052a1fccce90094582d5dfb9296bdb8360b',
          'd2063d334abcf4836c646e1455661ab8d85a5ab09c07bf25f1d4df10fbf678ba',
          'f7369d48fbad6e319595afe9cd01ea3c978b09f62f841d58194b1d911d38b6f0',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.binanceChain({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);
        }
      });
    }
  });

  describe('avalanche', () => {
    const mnemonic =
      'cover cinnamon dash later plate object hurry police damage loop inflict desert';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['C-avax186e3hg9ssxdnu3jwhsqjf64t657r6r8pdg3778'],
      ],
      [
        ImportableWallets.Omni,
        ['C-avax1v95k0trv8a5j54p9pazkngdqf084nemuy3vt4v'],
      ],
      [
        ImportableWallets.MetaMask,
        [
          'C-avax1v95k0trv8a5j54p9pazkngdqf084nemuy3vt4v',
          'C-avax1gvddhpaaujjztwl77hk28fjsmkcujvkjpck7dt',
          'C-avax1davp50sgas2s6gsdg5lzxg43l8nwmcmmataqcy',
          'C-avax14dntfl30s2sy4kspgp5acn8ql69gwt6l2jqnst',
          'C-avax1h2knsnrp8ecz98u3vuar5d78s8sjqvm28563e5',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          'C-avax1run3w97jhs94s8qfwedgl2q65t0nykxshu8zyq',
          'C-avax16g58ll7uvjen3p00a4cr7lwdv8mwc9j22lj8mz',
          'C-avax13rygw9updtmyapweqjdpad48cewdptcw49fafy',
          'C-avax1uzysjkyq9c8wpfnurnv60gyy7ajclh9ruzu3zj',
          'C-avax1y7hzxkwwua7w5s2m43szwpe5rx8xg3atzqpl7w',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          'C-avax1fku49k2v636kzz283xl35sqjarlma098u296jt',
          'C-avax1jnml53alzuy9e39xmnepwxm2kc67ag5r9wxg4t',
          'C-avax1gsc9lwtv43xp72hhvxdhjs2f9e23xwpl09hu3n',
          'C-avax1zpshhpep0qpf9mw52ud92n78gxzhx46dx2zfl2',
          'C-avax1rgrgdzh8z8tqde0akmrtv4axwd2l7fuuag93hh',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.avalanche({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet.cAddressBech).toEqual(expected[i]);
        }
      });
    }
  });

  describe('celo', () => {
    const mnemonic =
      'cover cinnamon dash later plate object hurry police damage loop inflict desert';

    const tests: [ImportableWallets, string[]][] = [
      [
        ImportableWallets.Steakwallet,
        ['0x8d605d5427E4855E366fe76d4625dc8681Ca7cc2'],
      ],
      [ImportableWallets.Omni, ['0xcF0F975dF7204EBa700699250c23bEb839B92bb0']],
      [
        ImportableWallets.MetaMask,
        [
          '0xcF0F975dF7204EBa700699250c23bEb839B92bb0',
          '0xD9eAF0b35786A3F2cC6C4C27eE29Ee33Cd2F00c8',
          '0x853087f819091bAce27137eD3B0119884c41B365',
          '0xa80147f5A672b776578B8e500cC5919686A6d70E',
          '0xA9171bA35F839240d7D18414C76A03292a4d199F',
        ],
      ],
      [
        ImportableWallets.Keplr,
        [
          '0xaeE91A9C66A7A80638FcA66E0d82c0E785866791',
          '0xc084DeEdED83D38c952449B1b23F62bb7De5124E',
          '0xF36c4341c2F63035Bd658DcFC86136F6D7F52f52',
          '0x0cbAed39268d41216986Dc69E853B3B4187417B7',
          '0x10BC9A7CAaf51f651648CD0EE1869228eeBA9A78',
        ],
      ],
      [
        ImportableWallets.Phantom,
        [
          '0x01B4ECcDFaFdA6aC231DAE8840638f77D7935ada',
          '0xAc325675359C8F6dF470e1Eef51A37649b27F6b6',
          '0xEC6C21eca067e0C6EE6d0DD309d792664c3a17D2',
          '0x97378103Ea77cba12aF43489fd7EB224Ca795C38',
          '0x7c98CCFd3cD2725a3fa8B468d8272831C5663194',
        ],
      ],
    ];

    for (const [walletType, expected] of tests) {
      it(walletType, async () => {
        for (let i = 0; i < expected.length; i++) {
          const wallet = await resolvers.celo({
            mnemonic,
            walletType,
            index: i,
          });
          expect(wallet).toEqual(expected[i]);
        }
      });
    }
  });
});
