import {
	CREATE_NFT_REQUEST,
	CREATE_NFT_SUCCESS,
	CREATE_NFT_FAIL,
	GET_NFT_REQUEST,
	GET_NFT_SUCCESS,
	GET_NFT_FAIL
} from '../constants/nftConstants';

import axios from 'axios';

export const createNftAction = (nft) => async (dispatch) => {
	console.log('nft');
	try {
		dispatch({ type: CREATE_NFT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const { data } = await axios.post('http://localhost:4000/nft/create', nft, config);

		console.log(data);
		dispatch({
			type: CREATE_NFT_SUCCESS,
			payload: data
		});
	} catch (error) {
		dispatch({
			type: CREATE_NFT_FAIL,
			payload: error
		});
	}
};

export const getAllNft = () => async (dispatch) => {
	try {
        dispatch({type:GET_NFT_REQUEST})

        const {data} = await axios.get('http://localhost:4000/nfts');
        console.log("get all nft");
        console.log(data);
        
        dispatch({type:GET_NFT_SUCCESS,payload:data})

	} catch (error) {
        dispatch({
			type: GET_NFT_FAIL,
			payload: error
		});
    }
};
