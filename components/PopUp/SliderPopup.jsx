import React, { useEffect, useState, useRef, useContext } from "react";
import { EscrowContext } from "../../Context/EscrowContext";
import styles from "./slider.module.css";
import images from "../../img";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTimes } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const PrevBtn = (props) => {
	const { className, onClick } = props;
	return (
		<div
			className={`${styles["slick-arrow"]} ${styles["slick-prev"]} ${className}`}
			onClick={onClick}
		>
			<AiOutlineArrowLeft style={{ zIndex: "3000", color: "red" }} />
		</div>
	);
};

const NextBtn = (props) => {
	const { className, onClick } = props;
	return (
		<div
			className={`${styles["slick-arrow"]} ${styles["slick-next"]} ${className} `}
			onClick={onClick}
		>
			<AiOutlineArrowRight />
		</div>
	);
};
const image = [
	"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
	"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
];
const SliderPopup = ({ setShowPopUp, validate, showPopUp }) => {
	const [reason, setReason] = useState("");
	const [currency, setCurrency] = useState("");
	const [justification, setJustfication] = useState("");
	const [level, setLevel] = useState("level_1");

	const [reasonError, setReasonError] = useState("");
	const [currencyError, setCurrencyError] = useState("");
	const [justificationError, setJustficationError] = useState("");
	const [isLoadingContracts, setIsLoadingContracts] = useState(false);
	const popupRef = useRef(null);
	const handleCurrencyChange = (e) => {
		setCurrency(e.target.value);
		setCurrencyError(""); // Clear the error message
	};
	const handleReasonChange = (e) => {
		setReason(e.target.value);
		setReasonError(""); // Clear the error message
	};
	const handleLevelChange = (e) => {
		setLevel(e.target.value);
	};
	const handleJustificationChange = (e) => {
		setJustfication(e.target.value);
		setJustficationError("");
	};

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		document.body.style.zIndex = 999;
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		const handleOutsideClick = (e) => {
			if (popupRef.current && !popupRef.current.contains(e.target)) {
				setShowPopUp(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.body.style.overflowY = "scroll";
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [setShowPopUp]);
	const validateFieldLevel1 = () => {
		let isValid = true;

		if (reason === "") {
			setReasonError("Reason is required.");
			isValid = false;
		}

		if (currency === "") {
			setCurrencyError("proposal is required.");
			isValid = false;
		}

		return isValid;
	};
	const setting = {
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		speed: 500,
		prevArrow: <PrevBtn />,
		nextArrow: <NextBtn />,
	};
	return (
		<>
			<div className="fixed top-0 left-0 bottom-0 right-0"></div>
			<div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-popup-bg z-[1000]">
				<span className="absolute right-5 top-5 text-[2rem] cursor-pointer">
					<FaTimes />
				</span>
				<div
					ref={popupRef}
					className="bg-white  w-full md:w-3/4 lg:w-3/4 rounded-lg shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0 z-50 overflow-y-auto overflow-x-clip max-h-screen"
				>
					<Slider {...setting}>
						{showPopUp[1] === "assignee"
							? (validate?.assigneeProfs || []).map((data, index) => (

									<img
										src={data}
										key={index}
										className="w-full md:h-[70vh] h-[50vh]"
										alt="vue images"
									/>
							  ))
							: (validate?.assignorProfs || []).map((data, index) => (
									<img
										src={data}
										key={index}
										className="w-full md:h-[70vh] h-[50vh]"
										alt="vue images"
									/>
							  ))}
					</Slider>
				</div>
			</div>
		</>
	);
};

export default SliderPopup;
