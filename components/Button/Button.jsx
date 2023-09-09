import React from "react";

//INTERNAL IMPORT
import Style from "./Button.module.css";

const Button = ({ btnName, handleClick, icon, classStyle }) => {
	return (
		<div className={Style.box}>
			<button
				className="bg-theme-pruple text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
				onClick={() => handleClick()}
			>
				{icon} {btnName}
			</button>
		</div>
	);
};

export default Button;
