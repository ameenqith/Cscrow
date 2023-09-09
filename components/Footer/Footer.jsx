import React from "react";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="text-center">
			<Link href="/tos" className=" text-white">
				Terms of service
			</Link>
		</div>
	);
};
