import { InputGroup } from 'react-bootstrap';
import { pinJSONToIPFS } from './pinata.js';
require('dotenv').config();
// const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const alchemyKey = `https://eth-ropsten.alchemyapi.io/v2/4X-X1f7-NZpVdHtNVl8pHCBX06ce0iIC`;
const contractABI = require('./contractAbi.json');
const contractAddress = '0x63928aa2f63e02805BBc4cFfAe03F506C02387DA';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);
const {mintNFT }  = require('./interact2')
const { ethers, BigNumber } = require('ethers');

export const connectWallet = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: 'eth_requestAccounts'
			});
			const obj = {
				status: 'Metamask successfuly connected.',
				address: addressArray[0]
			};
			return obj;
		} catch (err) {
			return {
				address: '',
				status: 'Something went wrong: ' + err.message
			};
		}
	} else {
		return {
			address: '',
			status: (
				<span>
					<p>
						{' '}
						🦊{' '}
						<a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your browser.
						</a>
					</p>
				</span>
			)
		};
	}
};

export const getCurrentWalletConnected = async () => {
	if (window.ethereum) {
		try {
			const addressArray = await window.ethereum.request({
				method: 'eth_accounts'
			});
			if (addressArray.length > 0) {
				return {
					address: addressArray[0],
					status: 'Fill in the text-field above.'
				};
			} else {
				return {
					address: '',
					status: '🦊 Connect to Metamask using the top right button.'
				};
			}
		} catch (err) {
			return {
				address: '',
				status: 'Something went wrong: ' + err.message
			};
		}
	} else {
		return {
			address: '',
			status: (
				<span>
					<p>
						{' '}
						🦊{' '}
						<a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
							You must install Metamask, a virtual Ethereum wallet, in your browser.
						</a>
					</p>
				</span>
			)
		};
	}
};

export const mintNFT1 = async (url, name, description, price) => {
	if (url.trim() === '' || name.trim() === '' || description.trim() === '') {
		return {
			success: false,
			status: 'Please make sure all fields are completed before minting.'
		};
	}

	if (window.ethereum) {
		//make metadata
		const metadata = {};
		metadata.name = name;
		metadata.image = url;
		metadata.description = description;

		const pinataResponse = await pinJSONToIPFS(metadata);

		if (!pinataResponse.success) {
			return {
				success: false,
				status: 'Something went wrong while uploading your tokenURI.'
			};
		}
		const tokenURI = pinataResponse.pinataUrl;

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
		// console.log(window.ethereum.selectedAddress)

		const tx = await contract.mintNFT(window.ethereum.selectedAddress, tokenURI, price);

		const transactionParameters = {
			to: contractAddress, // Required except during contract publications.
			from: window.ethereum.selectedAddress, // must match user's active address.
			data: await tx
		};

		try {
			const txHash = await window.ethereum.request({
				method: 'eth_sendTransaction',
				params: [ transactionParameters ]
			});
			return {
				success: true,
				status: 'Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' + txHash
			};
		} catch (error) {
			return {
				success: false,
				status: 'Something went wrong: ' + error.message
			};
		}
	}
};

export const mintNFT2 = async (url, name, description, price) => {
	if (url.trim() === '' || name.trim() === '' || description.trim() === '') {
		return {
			success: false,
			status: 'Please make sure all fields are completed before minting.'
		};
	}

	//make metadata
	const metadata = {};
	metadata.name = name;
	metadata.image = url;
	metadata.description = description;

	const pinataResponse = await pinJSONToIPFS(metadata);
	// console.log(pinataResponse);
	if (!pinataResponse.success) {
		return {
			success: false,
			status: 'Something went wrong while uploading your tokenURI.'
		};
	}
	const tokenURI = pinataResponse.pinataUrl;

	console.log(tokenURI);

	window.contract = await new web3.eth.Contract(contractABI.abi, contractAddress);
	// console.log(window.contract)

	const transactionParameters = {
		to: contractAddress, // Required except during contract publications.
		from: window.ethereum.selectedAddress, // must match user's active address.
		data: window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI, parseInt(price)).encodeABI()
	};

	try {
		const txHash = await window.ethereum.request({
			method: 'eth_sendTransaction',
			params: [ transactionParameters ]
		});
		return {
			success: true,
			status: 'Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' + txHash
		};
	} catch (error) {
		return {
			success: false,
			status: 'Something went wrong: ' + error.message
		};
	}
};
