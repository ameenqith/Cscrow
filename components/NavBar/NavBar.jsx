import React, { useState, useEffect, useContext } from "react";

//----IMPORT ICON

import Link from "next/link";
import { useRouter } from "next/router";
import { Web3Button } from "@web3modal/react";
//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { SideBar } from "./index";
import { CgMenuRight } from "react-icons/cg";
import Image from "next/image";
import images from "../../img";
//IMPORT FROM SMART CONTRACT
import { EscrowContext } from "../../Context/EscrowContext";
import {BsInstagram, BsTwitter} from "react-icons/bs";
import {FaDiscord, FaTiktok} from "react-icons/fa";

function useScrollDirection() {
	const [scrollDirection, setScrollDirection] = useState(null);

	useEffect(() => {
		let lastScrollY = window.pageYOffset;

		const updateScrollDirection = () => {
			const scrollY = window.pageYOffset;
			const direction = scrollY > lastScrollY ? "down" : "up";
			if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
				setScrollDirection(direction);
			}
			lastScrollY = scrollY > 0 ? scrollY : 0;
		};
		window.addEventListener("scroll", updateScrollDirection); // add event listener
		return () => {
			window.removeEventListener("scroll", updateScrollDirection); // clean up
		}
	}, [scrollDirection]);

	return scrollDirection;
};
const NavBar = () => {

	const scrollDirection = useScrollDirection();


	const [openSideMenu, setOpenSideMenu] = useState(false);
	const router = useRouter();
	const activePage = router.pathname;
	//SMART CONTRACT SECTION
	const { currentAccount, connectWallet, disconnectWallet } =
		useContext(EscrowContext);

	const openSideBar = () => {
		if (!openSideMenu) {
			setOpenSideMenu(true);
		} else {
			setOpenSideMenu(false);
		}
	};

	return (
		<div>
			<div className={Style.navbar}>
				<div
					className={Style.navbar_container}>
				<header
					className={`flex ${scrollDirection==="down" ? 'justify-center bg-[rgba(49,49,49,.582)] p-5 rounded-b-xl' : 'justify-between p-10'} items-center mx-w-7xl mx-auto fixed w-full z-50`}
				>
					{ scrollDirection !== "down" ?
						<>
							<div className={"flex mt-10 cursor-pointer my-auto"}>
								<Link href='/'>
									{/*<div className="text-center">*/}
										<div className="flex">
											{/*<div className=" mr-[2px]">*/}
																<Image
																	className=""
																	src={images.logo}
																	alt="logo"
																	width={120}
																	height={20}/>
											{/*</div>*/}
										</div>
									{/*</div>*/}
								</Link>
							</div>
							<div className={"flex mt-10 items-center cursor-pointer md:space-x-2 lg:space-x-5 text-white font-['Poppins']"}>
								<Link href="/" legacyBehavior>
									<h3
										className={activePage==='/' ? 'activeMenuItem' : 'menuItem'}
									>
										Home
									</h3>
								</Link>
								<Link href="/sent" legacyBehavior>
									<h3
										className={activePage==='/sent' ? 'activeMenuItem' : 'menuItem'}
									>
										Sent
									</h3>
								</Link>

								<Link href="/received" legacyBehavior>
									<h3 className="inline-block md:hidden text-base text-white bg-purple-500 shadow-lg shadow-purple-500/50 px-4 py-1 rounded-full cursor-pointer">
										Received
									</h3>
								</Link>

								<Link href="/dispute" legacyBehavior>
									<h3
										className={activePage==='/dispute' ? 'activeMenuItem' : 'menuItem'}
									>
										Dispute
									</h3>
								</Link>

								<Link href="/validate" legacyBehavior>
									<h3
										className={activePage==='/validate' ? 'activeMenuItem' : 'menuItem'}
									>
										Validate
									</h3>
								</Link>

								<Link href="/claim" legacyBehavior>
									<h3
										className={activePage==='/claim' ? 'activeMenuItem' : 'menuItem'}
									>
										Claim
									</h3>
								</Link>
										<div className={Style.navbar_container_right_button}>
											<Web3Button />
										</div>
							</div>
						</>
						:
						<>
							<div className="flex justify-center items-center space-x-16 text-white font-['Poppins']">
								<a href="https://twitter.com/cscrowdotcom" target='_blank'>
									<div className="cursor-pointer rounded-lg transition duration-300 ease-in-out hover:opacity-50 ">
										<BsTwitter size={24}/>
									</div>

								</a>
								<a href="https://discord.gg/cscrow"  target='_blank'>
									<div className="cursor-pointer rounded-lg transition duration-300 ease-in-out hover:opacity-50 ">
										<FaDiscord size={24}/>
									</div>
								</a>
							</div>
						</>
					}


				</header>
				</div>
				<div className={Style.navbar_container_right_menuBtn}>
					<div>
						<div>
							<Link href="/">
								<Image
									className=" object-cover object-right"
									src={images.logo}
									alt="logo"
									width={100}
									height={100}
								/>
							</Link>
						</div>
					</div>

					<div></div>
					<div>
						<CgMenuRight
							className={Style.menuIcon}
							onClick={() => openSideBar()}
						/>
					</div>
				</div>
				{openSideMenu && (
					<div className={Style.sideBar}>
						<SideBar
							setOpenSideMenu={setOpenSideMenu}
							currentAccount={currentAccount}
							connectWallet={connectWallet}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default NavBar;
