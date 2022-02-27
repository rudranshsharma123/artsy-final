import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../navbar/navbar";
import { connect } from "../../redux/actions";
import Pin from "./pin";
import "./styles.css";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import DesoApi from "../../deso/api/desoApi";
import TPin from "./testingpin";

function Discover(props) {
	const dispatch = useDispatch();
	const deso = useSelector((state) => state.deso);
	const [images, setImages] = useState([{}]);
	// console.log(deso);
	useEffect(() => {
		if (deso.publicKey === "" || deso.publicKey === null) {
			dispatch(connect());
		}
	}, []);

	// console.log(deso);
	const getNfts = async (user) => {
		const desoApi = new DesoApi();
		const nfts = await desoApi.getNfts(user);
		console.log(nfts);
		const keys = Object.keys(nfts.NFTsMap);
		console.log(keys);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const nft = nfts.NFTsMap[key];
			const postBody = nft.PostEntryResponse.Body;
			// console.log(postBody);
			const postImage = nft.PostEntryResponse.ImageURLs;
			const poster = nft.PostEntryResponse.ProfileEntryResponse.Username;
			let actualImage = "";
			if (postImage) {
				actualImage = postImage[0];
			}
			console.log(nft, postBody, postImage);
			setImages((prev) => {
				return [
					...prev,
					{
						name: poster,
						title: postBody,
						url: actualImage,
						created_at: "2022-02-20T23:30:01.000Z",
					},
				];
			});
		}
		console.log(images);
	};
	// const ismages = [
	// 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	// 	"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
	// 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	// 	"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
	// 	"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
	// 	"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
	// 	"https://vinusimages.co/wp-content/uploads/2018/10/EG7A2390.jpgA_.jpg",
	// 	"https://media.istockphoto.com/photos/freedom-chains-that-transform-into-birds-charge-concept-picture-id1322104312?b=1&k=20&m=1322104312&s=170667a&w=0&h=VQyPkFkMKmo0e4ixjhiOLjiRs_ZiyKR_4SAsagQQdkk=",
	// ];

	useEffect(() => {
		if (!deso.publicKey) {
		} else {
			getNfts(deso.publicKey);
		}
	}, [deso.publicKey]);
	const arr = ["small", "medium", "large"];
	return (
		<>
			<Navbar />

			<div className="mainContainer">
				{images &&
					images.map((data, key) => (
						<TPin
							key={data.id}
							pinSize={arr[key % 3]}
							imgSrc={data.url}
							name={data.title}
							link={data}
						/>
					))}
			</div>
			<iframe
				title="desoidentity"
				id="identity"
				frameBorder="0"
				src="https://identity.deso.org/embed?v=2"
				style={{
					height: "100vh",
					width: "100vw",
					display: "none",
					position: "fixed",
					zIndex: 1000,
					left: 0,
					top: 0,
				}}></iframe>
		</>
	);
}

export default Discover;

{
	/* <Pin pinSize="small" image={images[0]} />
				<Pin pinSize="medium" image={images[1]} />
				<Pin pinSize="large" image={images[6]} />
				<Pin pinSize="large" image={images[0]} />
				<Pin pinSize="small" image={images[0]} />
				<Pin pinSize="small" image={images[0]} /> */
}


