import React, { useEffect, useState,useRef } from 'react';
import Clock from './Clock';
import styled from 'styled-components';
// import { mintNFT } from '../../core/nft/interact';
const Outer = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	overflow: hidden;
	border-radius: 8px;
`;

function NftCard({ nft, index }) {
	//
	const [ image, setImage ] = useState();
    const blobRef = useRef();

	const getImage = async (url) => {
		// return  await axios.get(``);

		try {
			const responce = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'image/jpeg'
				}
			});

			const blob = await responce.blob();
            blobRef.current = blob;
			return [ URL.createObjectURL(blob), null ];
		} catch (error) {
			console.error(`get:get error occured ${error}`);
			return [ null, error ];
		}
	};

	const [ state, setState ] = useState({
		height: 0
	});


    const blogToUrl = (blob,callBack)=>{
        var reader = new FileReader();
        reader.onloadend = () => {
          var base64data = reader.result;                
              console.log(base64data);
              callBack(base64data)
        }
        reader.readAsDataURL(blob);
    }

	async function mintNft(url, name, desc, price) {

        blogToUrl(blobRef.current,async function(res){
            
            // console.log(await mintNFT(url, name, desc,parseInt(price)));
        
        })

	
	}

	useEffect(
		() => {
			async function fetchData() {
				const [ responce, error ] = await getImage(`http://localhost:4000/nft/image/${nft.image}`);
				if (error) {
					console.log(error);
				} else {
					// console.log('got responce', responce);
					setImage(responce);
				}
			}
			fetchData();
		},
		[ nft ]
	);

	function onImgLoad({ target: img }) {
		let currentHeight = state.height;
		if (currentHeight < img.offsetHeight) {
			setState({
				height: img.offsetHeight
			});
		}
	}

	return (
		<div>
			<div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
				<div className="nft__item">
					{nft.deadline && (
						<div className="de_countdown">
							<Clock deadline={nft.deadline} />
						</div>
					)}
					<div className="author_list_pp">
						<span onClick={() => window.open('#', '_self')}>
							<img className="lazy" src={'./img/author/author-8.jpg'} alt="" />
							<i className="fa fa-check" />
						</span>
					</div>
					<div className="nft__item_wrap" style={{ height: `${state.height}px` }}>
						<Outer>
							<span>
								<img onLoad={onImgLoad} src={image} className="lazy nft__item_preview" alt="" />
							</span>
						</Outer>
					</div>
					<div className="nft__item_info">
						<span onClick={() => window.open('#', '_self')}>
							<h4>{nft.title}</h4>
						</span>
						<div className="nft__item_price">
							{nft.price}
							<span>{nft.bid}</span>
						</div>
						<div className="nft__item_action">
							<span onClick={() => window.open(nft.bidLink, '_self')}>Mint NFT</span>
							<span onClick={() => mintNft(image, nft.title, 'My New NFT', nft.price)}>Mint NFT</span>
						</div>
						<div className="nft__item_like">
							<i className="fa fa-heart" />
							<span>{nft.likes}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NftCard;
