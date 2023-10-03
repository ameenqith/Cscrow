import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";

import { Web3Button } from "@web3modal/react";
const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
	const router = useRouter();

	const closeSideBar = () => {
		setOpenSideMenu(false);
	};

	return (
		<div className={Style.sideBar}>
			<GrClose
				className={Style.sideBar_closeBtn}
				onClick={() => closeSideBar()}
			/>

			<div className={Style.sideBar_box}>
				<div className="flex">
					<Web3Button />
				</div>
			</div>
			<div className={Style.sideBar_menu}>
				<div className={Style.sideBar_menu_box} onClick={() => closeSideBar()}>
					<Link href="/sender">sent</Link>
				</div>
				<div className={Style.sideBar_menu_box} onClick={() => closeSideBar()}>
					<Link href="/received">received</Link>
				</div>
				<div className={Style.sideBar_menu_box} onClick={() => closeSideBar()}>
					<Link href="/validate">validate</Link>
				</div>
				<div className={Style.sideBar_menu_box} onClick={() => closeSideBar()}>
					<Link href="/dispute">disputes</Link>
				</div>
				<div className={Style.sideBar_menu_box} onClick={() => closeSideBar()}>
					<Link href="https://discord.gg/cscrow">Discord</Link>
				</div>
				<div className={Style.sideBar_menu_box} onClick={() => closeSideBar()}>
					<Link href="https://twitter.com/cscrowdotcom">Twitter</Link>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
