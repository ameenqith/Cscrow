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
const NavBar = () => {
	const [openSideMenu, setOpenSideMenu] = useState(false);
	const router = useRouter();
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
				<div className={Style.navbar_container}>
					<div className={Style.navbar_container_left}>
						<Link href="/" className="headerLink text-white">
							<div>
								<Image
									className="flex object-cover object-right h-20 w-30"
									src={images.logo}
									alt="logo"
									width={0}
									height={0}
								/>
							</div>
						</Link>
					</div>

					<div className={Style.navbar_container_right}>
						<div className={Style.navbar_container_right_help}>
							<Link
								href="/sender"
								className="headerLink text-white capitalize"
							>
								Sender
							</Link>
						</div>
						<div className={Style.navbar_container_right_help}>
							<Link
								href="/received"
								className="headerLink text-white capitalize"
							>
								Received
							</Link>
						</div>
						<div className={Style.navbar_container_right_help}>
							<Link
								href="/dispute"
								className="headerLink text-white capitalize"
							>
								Dispute
							</Link>
						</div>
						<div className={Style.navbar_container_right_help}>
							<Link
								href="/validate"
								className="headerLink text-white capitalize"
							>
								Validate
							</Link>
						</div>
						<div className={Style.navbar_container_right_help}>
							<Link
								href="/claim"
								className="headerLink text-white capitalize"
							>
								Claim
							</Link>
						</div>
						<div className={Style.navbar_container_right_help}>
							<a
								href="https://discord.gg/cscrow"
								className="headerLink text-white capitalize"
								rel="noopener noreferrer"
								target="_blank"
							>
								Discord
								{/* <Image
									className="h-10 w-10"
									src={images.discord}
									alt="NFT images"
									width={0}
									height={0}
								/> */}
							</a>
						</div>
						<div className={Style.navbar_container_right_help}>
							<a
								href="https://twitter.com/cscrowdotcom"
								className="headerLink text-white capitalize"
								rel="noopener noreferrer"
								target="_blank"
							>
								Twitter
								{/* <Image
									className="h-10 w-10"
									src={images.twitter}
									alt="NFT images"
									width={0}
									height={0}
								/> */}
							</a>
						</div>

						{/* CREATE BUTTON SECTION */}
						<div className={Style.navbar_container_right_button}>
							<Web3Button />
						</div>
					</div>
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
