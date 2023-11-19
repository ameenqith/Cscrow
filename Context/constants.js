import escrow from "./EscrowABI.json";
import rewardPool from "./RewardPoolABI.json";
import matic from "./maticAbi.json";
import usdt from "./usdtAbi.json";
import weth from "./wethAbi.json";
import usdc from "./usdcAbi.json";
// mainnet address
export const escrowAddress = "0x8eF2Fdc40155519FEF17Df0f031DaFcd9DEF639d";
//mumbai
// export const escrowAddress = "0xBE638e8ff72dF306696DDB0aec163B1e5AFff0fC";
export const escrowABI = escrow.abi;
//mumbai
export const rewardPoolAddress = "0xd8e4c9673aA0F9183b03A449bB3aB737842D498D";
// export const rewardPoolAddress = "0xE0781d77c9D8Fbae68A45f32271119aA93a60b4E"; // mumbai
export const rewardPoolABI = rewardPool.abi;

export const tokenABI = {
    // '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889': matic, // mumbai
    // '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270': matic,
    // '0x2F7b97837F2D14bA2eD3a4B2282e259126A9b848': usdt, // 0x2F7b97837F2D14bA2eD3a4B2282e259126A9b848 mumbai
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': usdt, // 0x2F7b97837F2D14bA2eD3a4B2282e259126A9b848 mumbai
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': weth,
    // '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97': usdc // 0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97 mumbai
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': usdc // 0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97 mumbai
}