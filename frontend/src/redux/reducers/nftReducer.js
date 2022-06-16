import { CREATE_NFT_REQUEST, CREATE_NFT_SUCCESS, CREATE_NFT_FAIL,
	GET_NFT_REQUEST,
	GET_NFT_SUCCESS,
	GET_NFT_FAIL
} from '../constants/nftConstants';


export const createNftReducer = (state={},action)=>{


    switch (action.type) {

        case CREATE_NFT_REQUEST:  
            return{
                success:false,
                loading:true,
                ...state
            }


        case CREATE_NFT_SUCCESS:  
            return{
                success:true,
                loading:false,
                nft:action.payload
            }
        
        case CREATE_NFT_FAIL:  
            return{
                success:false,
                loading:false,
                error:action.payload
            }

    
        default:
            return state;
    }
}

let getNftInitial =  {
    deadline:"",
    authorLink: "#",
    nftLink: "#",
    bidLink: "#",
    authorImg: "./img/author/author-10.jpg",
    previewImg: "./img/items/static-2.jpg",
    title: "Deep Sea Phantasy",
    price: "0.06 ETH",
    bid: "1/22",
    likes: 80
}


export const getAllNftReducer = (state={},action)=>{


    console.log(action.type);
    switch (action.type) {

        case GET_NFT_REQUEST:  
            return{
                success:false,
                loading:true,
                ...state
            }


        case GET_NFT_SUCCESS:  

        console.log("get All nft reducer");
        console.log(action.payload);
            return{
                success:true,
                loading:false,
                nfts:action.payload.nft
            }
        
        case GET_NFT_FAIL:  
            return{
                success:false,
                loading:true,
                error:action.payload
            }

    
        default:
            return state;
    }
}