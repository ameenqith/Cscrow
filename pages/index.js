import React, { useState, useEffect, useContext } from "react";
import { Button } from "../components/componentsindex";
//INTERNAL IMPORT

import images from "../img";
import Image from "next/image";
//IMPORTING CONTRCT DATA
import { EscrowContext } from "../Context/EscrowContext";
import axios from "axios";
import Head from "next/head";
import Faq from "../components/faq";
const coinmarketcap = process.env.NEXT_PUBLIC_COINMARKET_API;

const currencyObj = {
	usdt: {
		token_address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
		token: true,
	},
	matic: {
		// token_address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", // mumbai
		token_address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
		token: true,
	},
	weth: {
		token_address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
		token: true,
	},
	usdc: {
		token_address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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
				window.scrollTo({
					top: elementPos - offset,
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

	const handleCollaboratorChange = (e) => {
		setCollaborator(e.target.value);
		setCollaboratorError(""); // Clear the error message
	};

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
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
					setAmount(Number(response.data[selectedCurrency]) * Number(amountUSD));
				});
		} catch (error) {
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
	return (
		<div className="bg-purple-bg">
			<Head>
				<title>Make Scam Free Crypto Payments</title>{" "}
			</Head>
			<div
				className="container m-auto grid grid-cols-3 gap-1 lg:gap-20 lg:grid-cols-3 md:grid-cols-3 px-3"
				id="tab"
			>
				<a
					className="scrollto opacity-75 capitalize bg-theme-pruple  text-center text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
					href="#form"
				>
					send
				</a>
				<a
					className="scrollto opacity-75 capitalize bg-theme-pruple text-center text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
					href="#learn"
				>
					learn
				</a>
				<a
					className="scrollto opacity-75 capitalize bg-theme-pruple  text-center text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
					href="#earn"
				>
					earn
				</a>
			</div>
			<div className="flex justify-center px-2 w-200">
				<p className="text-xl lg:text-6xl mb-5 mt-10 font-bold">
					Make Scam Free Crypto Payments
				</p>
			</div>

			<div className="flex justify-center px-10 w-50">
				<p className="text-sm lg:text-xl mb-5 mt-2 italic text-justify">
					Decentralized 'fiverr' that holds your crypto until service is
					received to protect you from scams
				</p>
			</div>
			<div className="px-4 py-5" id="form">
				<div className="max-w-md bg-white mx-auto lg:p-4 bg-purple shadow-md rounded-md">
					<div className="flex justify-end">
						<Image
							className="flex object-cover object-right h-5 w-20"
							src={images.polygon}
							alt="NFT images"
							width={0}
							height={0}
						/>
					</div>
					<div className="mb-4 px-4 lg:px-0">
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
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
						<p className="text-red-500 text-xs mt-2">{titleError}</p>
					</div>

					<div className="mb-4 px-4 lg:px-0">
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
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
						<p className="text-red-500 text-xs mt-2">{collaboratorError}</p>
					</div>
					<div className="mb-4 px-4 lg:px-0">
						<label
							htmlFor="details"
							className="block text-lg font-medium text-black"
						>
							Token
						</label>
						<select
							value={currency}
							onChange={handleCurrencyChange}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
					<div className="flex mb-4 px-4 lg:px-0">
						<div className="grow w-50 mr-2">
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
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
							/>
							<p className="text-red-500 text-xs mt-2">{amountError}</p>
						</div>

						<div className="grow">
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
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								required
								// disabled={currency === "usdt"}
							/>
							<p className="text-red-500 text-xs mt-2">{amountUSDError}</p>
						</div>
					</div>

					<div className="mb-4 px-4 lg:px-0">
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
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
						<p className="text-red-500 text-xs mt-2">{detailsError}</p>
					</div>
					<div className="flex justify-center">
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

					<div className="flex justify-end">
						<p className="text-black italic  text-xs">2% service fee</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center" id="learn">
				<Image
					className="flex w-96 object-cover object-right l:w-auto l:h-auto lg:h-3/3 lg:w-3/4"
					src={images.sketch}
					alt="NFT images"
					width={{}}
					height={{}}
				/>
			</div>

			<Faq/>
		</div>
	);
};

export default Home;
