import React from "react";
import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

export const Footer = () => {
	return (
		<div className="terms-text">
			<div className="container">
				<div className="wrapper">
					<Link href="/tos" className=" text-white">
						Terms of service
					</Link>
				</div>
			</div>
		</div>
	);
};
