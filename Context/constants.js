import escrow from "./EscrowABI.json";
import rewardPool from "./RewardPoolABI.json";
import token from "./token.json";
// mainnet address
export const escrowAddress = "0x8eF2Fdc40155519FEF17Df0f031DaFcd9DEF639d";
// testnet addreses
// export const escrowAddress = "0x121541c1B8Efd1C117dDAfbA6137dd0644698b98";
// export const escrowAddress = "0x3d622efc3e7ee621e7cc24d36f81682c5021afeb";

// "0xB23A6A3a053C2bfab042b0Adc2c27b6384C31279";
export const escrowABI = escrow.abi;

// mock token testnet
export const usdtABI = token.abi;
export const usdtAddress = "0x4ED8fFc1Dd1dc6569c8285b0C7a1C93933B8826f";

// 0x63B6730942e89b869a2da0883dBAD12c441Ee323 reciever address
// 0x1b9A400B28A93dAc10EDBd5861F888533b22D408


// mainnet address
export const rewardPoolAddress = "0xd8e4c9673aA0F9183b03A449bB3aB737842D498D";
// testnet addreses
// export const rewardPoolAddress = "0x151AbD7deFEDEC50958385Bc6a2c097Cac2D00eB";
// export const rewardPoolAddress = "0xd3661399d5cc2c0e175fd697268065b07c7a6c42";
export const rewardPoolABI = rewardPool.abi;
