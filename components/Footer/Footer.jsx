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
					<ul>
						<li>
							<a href="https://twitter.com/cscrowdotcom" target='_blank'><BsTwitter size={24}/></a>
						</li>
						<li>
							<a href="https://discord.gg/cscrow" target='_blank'><FaDiscord size={24}/></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
