import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';
// import Clock from './Clock';
// import { connect } from 'react-redux';
import { getAllNft } from '../../redux/actions/nftActions';
import { useDispatch, useSelector } from 'react-redux';
import NftCard from './nftCard'

const Outer = styled.div`
	display: flex;
	justify-content: center;
	align-content: center;
	align-items: center;
	overflow: hidden;
	border-radius: 8px;
`;

function ColumnZero() {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		nfts: this.dummyData,
	// 		height: 0
	// 	};
	// 	this.onImgLoad = this.onImgLoad.bind(this);

	//     this.props.getAllNft()
	//     console.log(this.props.nfts);
	// }

	const dispatch = useDispatch();
	const { loading, success, nfts } = useSelector((state) => state.nfts);
	console.log(nfts);

	const [ state, setState ] = useState({
		height: 0
	});

	function onImgLoad({ target: img }) {
		let currentHeight = state.height;
		if (currentHeight < img.offsetHeight) {
			setState({
				height: img.offsetHeight
			});
		}
	}

	useEffect(
		() => {
			dispatch(getAllNft());
		},
		[ dispatch ]
	);



	
	return (
		<div className="row">
			{success &&
				!loading &&
				nfts &&
				nfts.map((nft, index) => (
					<NftCard nft={nft} index={index}/>
				))}
		</div>
	);
}

export default ColumnZero;
