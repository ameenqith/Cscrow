import React, {useEffect, useState} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import {create as ipfsHttpClient} from "ipfs-http-client";
//INTERNAL  IMPORT
import {
	escrowABI,
	escrowAddress,
	rewardPoolABI,
	rewardPoolAddress, tokenABI,
} from "./constants";
import {useWeb3Modal} from "@web3modal/react";
import {useAccount} from "wagmi";
import {toast} from "react-toastify";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY;
const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
	"base64"
)}`;


const client = ipfsHttpClient({
	host: "infura-ipfs.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

// start reward pool contract
const fetchRewardContract = async (signerOrProvider) => {
	return new ethers.Contract(rewardPoolAddress, rewardPoolABI, signerOrProvider);
};

const fetchTokenContract = async (signerOrProvider, token) => {
	const tokenAbis = tokenABI;
	return new ethers.Contract(token, tokenAbis[token], signerOrProvider);
};

const connectingWithRewardContract = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		return await fetchRewardContract(signer);
	} catch (error) {
		console.log("Something went wrong while connecting with contract", error);
	}
};

// end

//---FETCHING SMART CONTRACT
const fetchContract = async (signerOrProvider) => {
	return new ethers.Contract(escrowAddress, escrowABI, signerOrProvider);
};

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = await fetchContract(signer);
		return contract;
	} catch (error) {
		console.log("Something went wrong while connecting with contract", error);
	}
};
const connectingWithTokenContract = async (token) => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = await fetchTokenContract(signer, token);
		return contract;
	} catch (error) {
		console.log("Something went wrong while connecting with contract", error);
	}
};

export const EscrowContext = React.createContext();

export const EscrowProvider = ({ children }) => {
	//------USESTAT
	const [error, setError] = useState("");
	const [openError, setOpenError] = useState(false);
	const [currentAccount, setCurrentAccount] = useState("");
	const [accountBalance, setAccountBalance] = useState("");
	const { open, close } = useWeb3Modal();
	const { address, isConnected } = useAccount();

	//---CHECK IF WALLET IS CONNECTD
	const checkIfWalletConnected = async () => {
		try {
			if (isConnected) {
				setCurrentAccount(address.toLowerCase());
			}
			else{
				setCurrentAccount("");
			}
		} catch (error) {
			setError("Something wrong while connecting to wallet");
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
	}, [address]);

	useEffect(() => {
		if (!currentAccount) return;
	}, [currentAccount]);

	//---CONNET WALLET FUNCTION
	const connectWallet = async () => {
		try {
			await open();
		} catch (error) {
			setError("Error while connecting to wallet");
		}
	};

	
	// Rewards POOL calls
	// function pendingERC20(uint256 _pid, address _user)
	const rewardClaims = async (userAddress) => {
		try {
			const contract = await connectingWithRewardContract();
			let poolLength = await contract.poolLength();
			const claims = [];
			for(let i = 0; i < poolLength.toNumber(); i++){
				await contract.pendingERC20(i, userAddress)
					.then((amount) => {
						const formattedAmount =	ethers.utils.formatEther(amount)
					if(!formattedAmount || formattedAmount === '0.0') {
						return;
					}
					claims.push({pid: i, amount: formattedAmount});
				});
			}
			return claims;
		} catch (error) {
			return [];
		}
	}
	const pendingERC20 = async (pid, userAddress) => {
		try {
			const contract = await connectingWithRewardContract();
			const amount = await contract.pendingERC20(pid, userAddress);
			return ethers.utils.formatEther(amount);
		} catch (error) {
			return 0;
		}
	}
	// function claim(uint256 _pid) public {
	const claimReward = async (pid) => {
		try {
			const contract = await connectingWithRewardContract();
			const trx = await contract.claim(pid);
			return await trx.wait();
		} catch (error) {
		console.log(error);
		}
	}

	const getPoolLength = async () => {
		try {
			const contract = await connectingWithRewardContract();
			const trx = await contract.poolLength();
			return trx.toNumber()
		} catch (error) {
			return 0
		}
	}
	const getPoolInfo = async () => {
		try {
			const contract = await connectingWithRewardContract();
			const trx = await contract.poolInfo();
		} catch (error) {
			console.log(error);
		}
	}

	const isUSDToken = (tokenAddress) => {
		return ["0xc2132D05D31c914a87C6611C10748AEb04B58e8F", '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'].includes(tokenAddress);
		// return ["0x2F7b97837F2D14bA2eD3a4B2282e259126A9b848", '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97'].includes(tokenAddress); mumbai test
	}

	// end Rewards POOL calls

	const createContract = async (
		title,
		collaborator,
		amount,
		details,
		token,
		tokenAddress
	) => {
		try {
			const bigNum = isUSDToken(token ? tokenAddress : '') ? ethers.utils.parseUnits(amount.toString(), 6): ethers.utils.parseEther(amount.toString());
			if(token) {
				const tokenContract = await connectingWithTokenContract(tokenAddress);
				const trxApprove = await tokenContract.approve(escrowAddress,
					bigNum)
				await trxApprove.wait();
			}
			const contract = await connectingWithSmartContract();
			const trx = await contract.createContract(
				collaborator.toLowerCase(),
				bigNum,
				details,
				title,
				token,
				tokenAddress,
				{
					value: (bigNum),
				}
			);
			const res = await trx.wait();
		} catch (error) {
				toast.error(error?.error?.message ?? 'Something wrong', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			// return error;
		}
	};

	const withdrawContract = async (id) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.withdrawContract(id);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const getOwner = async () => {
		try {
			const contract = await connectingWithSmartContract();
			const ownerAddr =  await contract.owner();
			return ownerAddr.toLowerCase();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const notAcceptContract = async (id) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.notAcceptContract(id);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const acceptContract = async (id) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.acceptContract(id);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const approveContract = async (id) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.approveContract(id);
			await trx.wait();
		} catch (error) {
			console.log();
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const completeContract = async (id) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.completeContract(id);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const getTotalEscrows = async () => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract();
				const trx = await contract.totalEscrows();
			}
		} catch (error) {
			setError("Error while fetching listed NFTs");
		}
	};

	const getMyContractsAssignee = async () => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract();
				const myContracts = await contract.getMyContracts(currentAccount);
				if(!myContracts?.length) {
					return [];
				}
				let data = [];
				for (let i = 0; i < myContracts.length; i++) {
					let number = Number(myContracts[i]);
					const escrow = await contract.escrows(number);
					if (escrow.assignee.toLowerCase() === currentAccount && !data.map(d => d.id).includes(Number(escrow.id))) {
						data.push({
							id: Number(escrow.id),
							title: escrow.title,
							assignor: escrow.assignor.toLowerCase(),
							assignee: escrow.assignee.toLowerCase(),
							details: escrow.details,
							status: escrow.status,
							amount: isUSDToken(escrow.tokenAddress) ? ethers.utils.formatUnits(escrow.amount, 6) : Number(ethers.utils.formatEther(escrow.amount)),
							token: escrow.token,
							tokenAddress: escrow.tokenAddress.toLowerCase(),
						});
					}
				}
				return data;
			}
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const getMyContractsAssignor = async () => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract();
				const myContracts = await contract.getMyContracts(currentAccount);
				let data = [];
				for (let i = 0; i < myContracts.length; i++) {
					let number = Number(myContracts[i]);
					const escrow = await contract.escrows(number);
					if (escrow.assignor.toLowerCase() === currentAccount && !data.map(d => d.id).includes(Number(escrow.id))) {
						data.push({
							id: Number(escrow.id),
							title: escrow.title,
							assignor: escrow.assignor.toLowerCase(),
							assignee: escrow.assignee.toLowerCase(),
							details: escrow.details,
							status: escrow.status,
							amount: isUSDToken(escrow.tokenAddress) ? ethers.utils.formatUnits(escrow.amount, 6) : Number(ethers.utils.formatEther(escrow.amount)),
							token: escrow.token,
							tokenAddress: escrow.tokenAddress.toLowerCase(),
						});
					}
				}
				return data;
			}
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const createDispureLevel1 = async (id, percentage, details) => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract();
				const escrow = await contract.escrows(id);
				// const amount = (Number(escrow.amount) * Number(percentage)) / 100;
				// const bigNum = (isUSDToken(escrow.token ? escrow.tokenAddress : '') ? ethers.utils.parseUnits(amount.toString(), 6): ethers.utils.parseEther(amount.toString()))
				const trx = await contract.createDisputeLevel1(id, Number(percentage), details);
				await trx.wait();
			}
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const acceptDispute = async (id) => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract();
				const trx = await contract.acceptDispute(Number(id));
				await trx.wait();
			}
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const getDisputes = async () => {
		try {
			const contract = await connectingWithSmartContract();
			const totalDisputes = await contract.totalDisputes();

			let data = [];
			for (let i = 0; i < totalDisputes; i++) {
				const dispute = await contract.disputes(i);
				const escrow = await contract.escrows(Number(dispute.escrowId));
				if (
					currentAccount === dispute.assignor.toLowerCase() ||
					currentAccount === dispute.assignee.toLowerCase()
				) {
					const disputeInfo ={
						id: Number(i),
						escrowId: Number(dispute.escrowId),
						escrowStatus: Number(escrow.status),
						escrowTitle: escrow.title,
						escrowDescription: escrow.details,
						amount: isUSDToken(escrow.tokenAddress) ? ethers.utils.formatUnits(escrow.amount, 6) : Number(ethers.utils.formatEther(escrow.amount)),
						assignor: dispute.assignor.toLowerCase(),
						assignee: dispute.assignee.toLowerCase(),
						disputedamount: Number(ethers.utils.formatEther(dispute.amount ?? 0)),
						amountDisputedAssignor: Number(dispute.amountDisputedAssignor ?? 0),
						amountDisputedAssignee: Number(dispute.amountDisputedAssignee ?? 0),
						assignorDetails: dispute.assignorDetails,
						assigneeDetails: dispute.assigneeDetails,
						validatorId: Number(dispute.validatorId),
						status: dispute.disputeLevel,
						assigneeCreatedDispute: dispute.assigneeCreatedDispute,
						validationStarted: dispute.validationStarted,
						tokenAddress: escrow.token ? escrow.tokenAddress.toLowerCase(): '',
						token: escrow.token,
					};
					data.push(disputeInfo);
				}
			}
			return data;
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const createDisputeLevel2 = async (id,amount, details, imagesPath, tokenAddress) => {
		try {
			const contract = await connectingWithSmartContract();
			let ipfsImages = await uploadImages(imagesPath);
			// const bigNum = (isUSDToken(tokenAddress) ? ethers.utils.parseUnits(amount.toString(), 6): ethers.utils.parseEther(amount.toString()))
			const trx = await contract.createDisputeLevel2(id, Number(amount), details, ipfsImages);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const uploadImages = async (imagesPath) => {
		try {
			let ipfsImages = [];
			for (let i = 0; i < imagesPath.length; i++) {
				const file = imagesPath[i];
				const added = await client.add(file);
				ipfsImages.push(`${subdomain}${added.path}`);
			}
			return ipfsImages;
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const addProofsForDisputeLevel2 = async (id, amount, details, imagesPath, tokenAddress) => {
		try {
			const contract = await connectingWithSmartContract();
			let ipfsImages = await uploadImages(imagesPath);
			// const bigNum = (isUSDToken(tokenAddress) ? ethers.utils.parseUnits(amount.toString(), 6): ethers.utils.parseEther(amount.toString()))
			const trx = await contract.addProofsForDisputeLevel2(
				id,
				Number(amount),
				details,
				ipfsImages
			);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const validations = async () => {
		try {
			const contract = await connectingWithSmartContract();
			const totalValidators = await contract.totalValidators();
			let data = [];
			for (let i = 0; i < totalValidators; i++) {
				const validator = await contract.validators(i);
				const dispute = await contract.disputes(validator.disputeId);
				const escrow = await contract.escrows(dispute.escrowId);
				const proofs = await contract.getProofs(validator.disputeId);
				if(escrow.status >= 5 && escrow.status < 7) {
				data.push({
					validatorId: Number(i),
					disputeId: Number(validator.disputeId),
					votesForAssignor: Number(validator.votesForAssignor),
					votesForAssignee: Number(validator.votesForAssignee),
					assignorWon: validator.assignorWon,
					assigneeWon: validator.assigneeWon,
					draw: validator.draw,
					nextChance: validator.nextChance,
					validationCreateTime: Number(validator.validationCreateTime),
					assignorProfs: proofs[0],
					assigneeProfs: proofs[1],
					assignorDetails: dispute.assignorDetails,
					assigneeDetails: dispute.assigneeDetails,
					sameAccount: dispute.assignee.toLowerCase() === dispute.assignor.toLowerCase(),
					assignorAddress: escrow.assignee,
					assigneeAddress: escrow.assignor,
					assigneeAmount: Number(dispute.amountDisputedAssignee ?? 0),
					assignorAmount: Number(dispute.amountDisputedAssignor ?? 0),
				});
				}
			}
			return data;
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const runResolveDispute = async (id) => {
		try {
			// console.log(id);
			// const KEY = process.env.NEXT_PUBLIC_KEY;
			// const rpc = process.env.NEXT_PUBLIC_RPC;
			// const provider = new ethers.providers.JsonRpcProvider(rpc);
			// const wallet = new ethers.Wallet(KEY, provider);
			// const contract = new ethers.Contract(escrowAddress, escrowABI, wallet);
			const contract = await connectingWithSmartContract();
			const trx = await contract.resolveDispute(id);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const vote = async (id, voteForAssignor) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.validate(id, voteForAssignor);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const cancelContract = async (id) => {
		try {
			const contract = await connectingWithSmartContract();
			const trx = await contract.notAcceptContract(id);
			await trx.wait();
		} catch (error) {
			toast.error(error?.error?.message ?? 'Something wrong', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
		}
	};
	return (
		<EscrowContext.Provider
			value={{
				connectingWithSmartContract,
				// checkIfWalletConnected,
				connectWallet,
				getMyContractsAssignee,
				getMyContractsAssignor,
				getTotalEscrows,
				acceptContract,
				completeContract,
				approveContract,
				currentAccount,
				createDispureLevel1,
				getDisputes,
				setOpenError,
				openError,
				error,
				accountBalance,
				createContract,
				notAcceptContract,
				withdrawContract,
				cancelContract,
				acceptDispute,
				createDisputeLevel2,
				addProofsForDisputeLevel2,
				validations,
				vote,
				runResolveDispute,
				claimReward,
				pendingERC20,
				getPoolInfo,
				getPoolLength,
				getOwner,
				rewardClaims,
			}}
		>
			{children}
		</EscrowContext.Provider>
	);
};
