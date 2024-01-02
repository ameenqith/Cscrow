import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from "../components/componentsindex";
//INTERNAL IMPORT

import images from "../img";
import Image from "next/image";
//IMPORTING CONTRCT DATA
import { EscrowContext } from "../Context/EscrowContext";
import axios from "axios";
import Head from "next/head";
import Faq from "../components/faq";
import {toast} from "react-toastify";
import Link from "next/link";
import JoinAmbasadorPopup from "../components/PopUp/JoinAmbasadorPopup";
const coinmarketcap = process.env.NEXT_PUBLIC_COINMARKET_API;

export const currencyObj = {
	usdt: {
		token_address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
		// token_address: "0x2F7b97837F2D14bA2eD3a4B2282e259126A9b848", mumbai
		token: true,
	},
	matic: {
		// token_address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", // mumbai
		// token_address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",// ERC20
		token_address: "0x0000000000000000000000000000000000001010",
		token: false,
	},
	// weth: {
	// 	token_address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
	// 	token: true,
	// },
	usdc: {
		token_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		// token_address: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97", mumai
		token: true,
	},
};
const Home = () => {

	if (typeof window !== "undefined") {
		(function () {
			const select = (el, all = false) => {
				el = el.trim();
				if (all) {
					return [...document.querySelectorAll(el)];
				} else {
					return document.querySelector(el);
				}
			};

			/**
			 * Easy event listener function
			 */
			const on = (type, el, listener, all = false) => {
				let selectEl = select(el, all);
				if (selectEl) {
					if (all) {
						selectEl.forEach((e) => e.addEventListener(type, listener));
					} else {
						selectEl.addEventListener(type, listener);
					}
				}
			};

			/**
			 * Easy on scroll event listener
			 */
			const onscroll = (el, listener) => {
				el.addEventListener("scroll", listener);
			};

			/**
			 * Navbar links active state on scroll
			 */
			let navbarlinks = select("#navbar .scrollto", true);
			const navbarlinksActive = () => {
				let position = window.scrollY + 200;
				navbarlinks.forEach((navbarlink) => {
					if (!navbarlink.hash) return;
					let section = select(navbarlink.hash);
					if (!section) return;
					if (
						position >= section.offsetTop &&
						position <= section.offsetTop + section.offsetHeight
					) {
						navbarlink.classList.add("active");
					} else {
						navbarlink.classList.remove("active");
					}
				});
			};
			window.addEventListener("load", navbarlinksActive);
			onscroll(document, navbarlinksActive);

			/**
			 * Scrolls to an element with header offset
			 */
			const scrollto = (el) => {
				let header = select("#tab");
				let offset = header.offsetHeight;

				let elementPos = select(el).offsetTop;
				console.log(elementPos);
				console.log(offset);
				window.scrollTo({
					top: elementPos + 100,
					behavior: "smooth",
				});
			};

			/**
			 * Toggle .header-scrolled class to #header when page is scrolled
			 */
			let selectHeader = select("#header");
			if (selectHeader) {
				const headerScrolled = () => {
					if (window.scrollY > 100) {
						selectHeader.classList.add("header-scrolled");
					} else {
						selectHeader.classList.remove("header-scrolled");
					}
				};
				window.addEventListener("load", headerScrolled);
				onscroll(document, headerScrolled);
			}

			/**
			 * Back to top button
			 */
			let backtotop = select(".back-to-top");
			if (backtotop) {
				const toggleBacktotop = () => {
					if (window.scrollY > 100) {
						backtotop.classList.add("active");
					} else {
						backtotop.classList.remove("active");
					}
				};
				window.addEventListener("load", toggleBacktotop);
				onscroll(document, toggleBacktotop);
			}

			/**
			 * Mobile nav toggle
			 */
			on("click", ".mobile-nav-toggle", function (e) {
				select("#navbar").classList.toggle("navbar-mobile");
				this.classList.toggle("bi-list");
				this.classList.toggle("bi-x");
			});

			/**
			 * Mobile nav dropdowns activate
			 */
			on(
				"click",
				".navbar .dropdown > a",
				function (e) {
					if (select("#navbar").classList.contains("navbar-mobile")) {
						e.preventDefault();
						this.nextElementSibling.classList.toggle("dropdown-active");
					}
				},
				true
			);

			/**
			 * Scrool with ofset on links with a class name .scrollto
			 */
			on(
				"click",
				".scrollto",
				function (e) {
					if (select(this.hash)) {
						e.preventDefault();

						let navbar = select("#tab");
						//   if (navbar.classList.contains('navbar-mobile')) {
						// 	navbar.classList.remove('navbar-mobile')
						// 	let navbarToggle = select('.mobile-nav-toggle')
						// 	navbarToggle.classList.toggle('bi-list')
						// 	navbarToggle.classList.toggle('bi-x')
						//   }
						scrollto(this.hash);
					}
				},
				true
			);

			/**
			 * Scroll with ofset on page load with hash links in the url
			 */
			window.addEventListener("load", () => {
				if (window.location.hash) {
					if (select(window.location.hash)) {
						scrollto(window.location.hash);
					}
				}
			});
		})();
	}

	const { createContract, currentAccount } = useContext(EscrowContext);
	const [collaborator, setCollaborator] = useState("");
	const [amount, setAmount] = useState("");
	const [amountUSD, setAmountUSD] = useState("");
	const [title, setTitle] = useState("");
	const [details, setdetails] = useState("");
	const [currency, setCurrency] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const [collaboratorError, setCollaboratorError] = useState("");
	const [amountError, setAmountError] = useState("");
	const [error, setError] = useState("");
	const [amountUSDError, setAmountUSDError] = useState("");
	const [titleError, setTitleError] = useState("");
	const [detailsError, setDetailsError] = useState("");
	const [currencyError, setCurrencyError] = useState("");
	const [currencyDetail, setCurrencyDetail] = useState(null);
	const Homevideo = useRef(null)
	const Homevideobutton = useRef(null)
	const [show, setShow] = useState(false);

	const handleCollaboratorChange = (e) => {
		setCollaborator(e.target.value);
		setCollaboratorError(""); // Clear the error message
	};

	const handleAmountChange = (e) => {
		setAmount(e.target.value.toFixed(6));
		setAmountError(""); // Clear the error message
	};

	const handleAmountUSDChange = (e) => {
		setAmountUSD(e.target.value);
		setAmountUSDError(""); // Clear the error message
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
		setTitleError(""); // Clear the error message
	};

	const handleDetailsChange = (e) => {
		setdetails(e.target.value);
		setDetailsError(""); // Clear the error message
	};
	const handleCurrencyChange = (e) => {
		const selectedCurrencyKey = e.target.value;
		setCurrency(selectedCurrencyKey);
		setCurrencyDetail(currencyObj[selectedCurrencyKey]);
		setCurrencyError(""); // Clear the error message
		setAmount('');
		setAmountUSD('');
	};

	const convertFromUSD = async () => {
		try {
			const selectedCurrency = currency.toUpperCase();
			await axios
				.get(
					`https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=${selectedCurrency}`,
					{
						headers: { Authorization: coinmarketcap },
					}
				)
				.then((response) => {
					setAmount((Number(response.data[selectedCurrency]) * Number(amountUSD)).toFixed(6));
				});
		} catch (error) {
			toast.error(error, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			console.log(error);
		}
	};

	const validateFields = () => {
		let isValid = true;

		if (collaborator === "") {
			setCollaboratorError("Collaborator is required.");
			isValid = false;
		} else if (collaborator.length < 42) {
			setCollaboratorError(
				"Collaborator address must be at least 42 characters."
			);
			isValid = false;
		}

		if (amount === "") {
			setAmountError("Amount is required.");
			isValid = false;
		} else if (Number(amount) <= 0) {
			setAmountError("Please enter a positive amount.");
			isValid = false;
		}

		if (currency === "") {
			setCurrencyError("Currency is required.");
			// setAmountUSDError('please select currency')
			isValid = false;
		}

		if (title === "") {
			setTitleError("Title is required.");
			isValid = false;
		}

		if (details === "") {
			setDetailsError("Details are required.");
			isValid = false;
		}

		return isValid;
	};
	useEffect(() => {
		if (amountUSD !== "") {
			convertFromUSD();
		} else {
			setAmount("");
		}
	}, [amountUSD]);

	console.log({Homevideo});

	return (
		<div className="bg-purple-bg relative z-[60]">
			<Head>
				<title>Make Scam Free Crypto Payments</title>{" "}
			</Head>
			
			<div className="main-buttons" id="tab">
				<div className="container">
					<div className="flex justify-center">
						<a href="#form" className="scrollto text-center text-white">send</a>
						<a href="#learn" className="scrollto text-center text-white">learn</a>
						<a href="#earn" className="scrollto text-center text-white">earn</a>
					</div>
				</div>
			</div>

			<div className="video-section">
				<div className="container">
					<div className="section-title text-center">
						<h2>Send & Receive Scam Free Crypto Payments!</h2>
					</div>
					<div className="video-block">
						 <button ref={Homevideobutton}  onClick={(e)=>
						    {
									Homevideobutton.current.style.display = "none";
									Homevideo?.current.play()

						 	}} type="button" className="play-button">
							<Image
								src={images.playButton}
								alt="Play Button"
							/>
						</button> 
						

						<video ref={Homevideo} class="lazy" type="video/mp4" loop>
  							<source src='/videos/Crypto_Transactions_Video.mp4'  />
						</video>
					</div>
				</div>
			</div>

			<div className="boxes-with-icon-text">
				<div className="container">
					<div className="wrapper flex gap-[55px] justify-between">
						<div className="box">
							<div className="icon-block">
								<Image
									src={images.transactions}
									alt="Transactions Icon"
								/>
							</div>
							<div className="text-block">
								<h3>300+</h3>
								<h6>Transactions</h6>
							</div>
						</div>
						<div className="box">
							<div className="icon-block">
								<Image
									src={images.ambassadorsWaitlist}
									alt="Ambassadors Waitlist Icon"
								/>
							</div>
							<div className="text-block">
								<h3>200+</h3>
								<h6>Ambassadors in waitlist</h6>
							</div>
						</div>
						<div className="box">
							<div className="icon-block">
								<Image
									src={images.projectsWaitlist}
									alt="Projects Waitlist Icon"
								/>
							</div>
							<div className="text-block">
								<h3>20+</h3>
								<h6>DAO & Projects in waitlist</h6>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="form-section-wrapper" id="form">
				<div className="container">
					<div className="wrapper">
						<div className="form-block">
							<div className="white-box">
								<div className="flex justify-end">
									<Image
										className="flex object-cover object-right h-5 w-20"
										src={images.polygon}
										alt="NFT images"
										width={0}
										height={0}
									/>
								</div>
								<div className="form-field-block">
									<label
										htmlFor="title"
										className="block text-lg font-medium text-black"
									>
										Title
									</label>
									<input
										type="text"
										id="title"
										name="title"
										value={title}
										onChange={handleTitleChange}
										required
									/>
									<p className="text-red-500 text-xs mt-2">{titleError}</p>
								</div>
								<div className="form-field-block">
									<label
										htmlFor="collaborator"
										className="block text-lg font-medium text-black"
									>
										Receiver
									</label>
									<input
										type="text"
										id="collaborator"
										value={collaborator}
										onChange={handleCollaboratorChange}
										required
									/>
									<p className="text-red-500 text-xs mt-2">{collaboratorError}</p>
								</div>
								<div className="form-field-block">
									<label
										htmlFor="details"
										className="block text-lg font-medium text-black"
									>
										Token
									</label>
									<select
										value={currency}
										onChange={handleCurrencyChange}
										required
									>
										<option value="">select token</option>
										{Object.keys(currencyObj).map((currencyKey) => (
											<option
												key={currencyKey}
												value={currencyKey}
												// className="uppercase"
											>
												{currencyKey.toUpperCase()}
											</option>
										))}
									</select>
									<p className="text-red-500 text-xs mt-2">{currencyError}</p>
								</div>
								<div className="form-field-block">
									<div className="field-block">
										<label
											htmlFor="amount"
											className="block text-lg font-medium text-black mr-2"
										>
											Total in Tokens
										</label>
										<input
											type="number"
											id="amount"
											value={amount}
											onChange={handleAmountChange}
											required
										/>
										<p className="text-red-500 text-xs mt-2">{amountError}</p>
									</div>
									<div className="field-block">
										<label
											htmlFor="amountUSD"
											className="block text-lg font-medium text-black"
										>
											Total in USD
										</label>
										<input
											type="number"
											id="amountUSD"
											value={amountUSD}
											onChange={handleAmountUSDChange}
											required
										/>
										<p className="text-red-500 text-xs mt-2">{amountUSDError}</p>
									</div>
								</div>
								<div className="form-field-block">
									<label
										htmlFor="details"
										className="block text-lg font-medium text-black"
									>
										Details
									</label>
									<textarea
										type="text"
										id="details"
										value={details}
										onChange={handleDetailsChange}
										required
									/>
									<p className="text-red-500 text-xs mt-2">{detailsError}</p>
								</div>
								<div className="form-submit-block flex justify-center">
									{isLoading ? (
										<div className="flex justify-center mt-4">
											<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
										</div>
									) : (
										<Button
											btnName="Create Contract"
											handleClick={() => {
												if (validateFields()) {
													setIsLoading(true); // Start loading
													createContract(
														title,
														collaborator,
														String(amount),
														details,
														currencyDetail.token,
														currencyDetail.token_address
													)
														.finally(() => {
														setIsLoading(false); // Stop loading
														setTitle("");
														setCollaborator("");
														setCurrency("");
														setdetails("");
														setAmount("");
														setAmountUSD("");
													});
												}
											}}
										/>
									)}
									<p className="text-red-500 text-xs mt-2">{error}</p>
								</div>
								<div className="service-text flex justify-end">
									<p>2% service fee</p>
								</div>
							</div>
						</div>
						<div className="sponserd-block">
							<Image
								className="for-desktop"
								src={images.gasSponserdDesktop}
								alt="Gas Sponserd Image"
							/>
							<div className="sponserd-text">
								<h2>gas <span>sponsored</span></h2>
								<p>Enjoy limited-time, gas-sponsored transactions and experience safety in a scam-filled space!</p>
								<Link href="#" className="btn">
									<Image
										src={images.walletWhite}
										alt="Wallet Icon"
									/>Get started
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="comming-soon-section">
				<div className="container">
					<div className="commin-soon-box">
						<h2>Coming soon</h2>
						<ul>
							<li>
								<span className="text">Telegram</span>
								<span className="icon">
									<Image
										src={images.TelegramLogo}
										alt="Telegram Icon"
									/>
								</span>
							</li>
							<li>
								<span className="text">Discord</span>
								<span className="icon">
									<Image
										src={images.DiscordLogo}
										alt="Discord Icon"
									/>
								</span>
							</li>
							<li>
								<span className="text">Web Integrations</span>
								<span className="icon">
									<Image
										src={images.WebIntegrationsLogo}
										alt="WebIntegrations Icon"
									/>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			
			<div className="register-buttons">
				<div className="container">
					<div className="wrapper">
						<Link href="https://docs.google.com/forms/d/e/1FAIpQLScCOl0M1K0uFX8tp0gLNlojPfkcgxKRtZLXowxr0bNiSBCWbA/viewform" className="btn" target="_blank">Register for pre-sale!</Link>
						{show && <JoinAmbasadorPopup show={show} setShow={setShow}/>}
						<button type="button" onClick={() => setShow(true)} className="btn">Join as an ambassador!</button>
						<Link href="https://docs.google.com/forms/d/e/1FAIpQLSejJVI60B1409zR1cmmMx1lE7ZtBVAPwpnwsU_uYvbIatVOsQ/viewform" className="btn" target="_blank">Enquire for your community!</Link>
					</div>
				</div>
			</div>

			<div className="how-to-use" id="learn">
				<div className="container">
					<div className="section-title text-center">
						<h2>How to use</h2>
					</div>
					<div className="flex justify-center">
						<Image
							src={images.sketch}
							alt="NFT images"
							width={{}}
							height={{}}
						/>
					</div>
				</div>
			</div>

			<Faq />
		</div>
	);
};

export default Home;
