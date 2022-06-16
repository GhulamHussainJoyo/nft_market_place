import React, { Component } from 'react';
import Clock from '../components/Clock';
import Footer from '../components/footer';
import { createNftAction } from '../../redux/actions/nftActions';
import { mintNFT1 } from '../../core/nft/interact';
import { connect } from 'react-redux';

class CreateNft extends Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			files: [],
			title: '',
			description: '',
			price: 0,
			royality: 0,
			urls: []
		};
	}

	convertToUrl(file, callBack) {
		let fileToLoad = file;
		let srcData = '';

		let fileReader = new FileReader();
		fileReader.onload = function(fileLoadedEvent) {
			srcData = fileLoadedEvent.target.result;
			callBack(srcData);
		};
		fileReader.readAsDataURL(fileToLoad);
	}
	onChange(e) {
		var files = e.target.files;
		var filesArr = Array.prototype.slice.call(files);
		document.getElementById('file_name').style.display = 'none';
		this.setState({ files: [ ...this.state.files, ...filesArr ] });
	}
	onSubmit() {
	
		const title = this.state.title;
		const desc = this.state.description;
		const price = this.state.price;
		const royality = this.state.royality;



	
		this.convertToUrl(this.state.files[0], async function(result) {
			console.log(await mintNFT1(result, title, desc,price));
		});
	}

	render() {
		return (
			<div>
				<section className="jumbotron breadcumb no-bg">
					<div className="mainbreadcumb">
						<div className="container">
							<div className="row m-10-hor">
								<div className="col-12">
									<h1 className="text-center">Create</h1>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="container">
					<div className="row">
						<div className="col-lg-7 offset-lg-1 mb-5">
							<form id="form-create-item" className="form-border" action="#">
								<div className="field-set">
									<h5>Upload file</h5>

									<div className="d-create-file">
										<p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
										{this.state.files.map((x) => (
											<p key="{index}">PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}</p>
										))}
										<div className="browse">
											<input type="button" id="get_file" className="btn-main" value="Browse" />
											<input id="upload_file" type="file" onChange={this.onChange} />
										</div>
									</div>

									<div className="spacer-single" />

									<h5>Title</h5>
									<input
										type="text"
										name="item_title"
										id="item_title"
										className="form-control"
										placeholder="e.g. 'Crypto Funk"
										onChange={(e) => this.setState({ title: e.target.value })}
									/>

									<div className="spacer-10" />

									<h5>Description</h5>
									<textarea
										data-autoresize
										name="item_desc"
										id="item_desc"
										className="form-control"
										placeholder="e.g. 'This is very limited item'"
										onChange={(e) => this.setState({ description: e.target.value })}
									/>

									<div className="spacer-10" />

									<h5>Price</h5>
									<input
										type="text"
										name="item_price"
										id="item_price"
										className="form-control"
										placeholder="enter price for one item (ETH)"
										onChange={(e) => this.setState({ price: e.target.value })}
									/>

									<div className="spacer-10" />

									<h5>Royalties</h5>
									<input
										type="text"
										name="item_royalties"
										id="item_royalties"
										className="form-control"
										placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
										onChange={(e) => this.setState({ royality: e.target.value })}
									/>

									<div className="spacer-10" />

									<input
										type="button"
										id="submit"
										className="btn-main"
										value="Create Item"
										onClick={this.onSubmit}
									/>
								</div>
							</form>
						</div>

						<div className="col-lg-3 col-sm-6 col-xs-12">
							<h5>Preview item</h5>
							<div className="nft__item m-0">
								<div className="de_countdown">
									<Clock deadline="December, 30, 2021" />
								</div>
								<div className="author_list_pp">
									<span>
										<img className="lazy" src="./img/author/author-1.jpg" alt="" />
										<i className="fa fa-check" />
									</span>
								</div>
								<div className="nft__item_wrap">
									<span>
										<img
											src="./img/collections/coll-item-3.jpg"
											id="get_file_2"
											className="lazy nft__item_preview"
											alt=""
										/>
									</span>
								</div>
								<div className="nft__item_info">
									<span>
										<h4>Pinky Ocean</h4>
									</span>
									<div className="nft__item_price">
										0.08 ETH<span>1/20</span>
									</div>
									<div className="nft__item_action">
										<span>Place a bid</span>
									</div>
									<div className="nft__item_like">
										<i className="fa fa-heart" />
										<span>50</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	nft: state.nft
});

const mapDispatchToProps = () => ({
	createNftAction
});

export default connect(mapStateToProps, mapDispatchToProps())(CreateNft);
