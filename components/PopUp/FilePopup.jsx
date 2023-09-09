import React, { useEffect, useState, useRef, useContext } from "react";
import { EscrowContext } from "../../Context/EscrowContext";

const FilePopup = ({ setShowPopUp, id, showPopUp }) => {
	const [isLoadingContracts, setIsLoadingContracts] = useState(false);

	const [selectedImages, setSelectedImages] = useState([]);
	const popupRef = useRef(null);
	const [collaboratorError, setCollaboratorError] = useState("");
	const [justification, setJustfication] = useState("");
	const [justificationError, setJustficationError] = useState("");
	const [currency, setCurrency] = useState("");
	const [currencyError, setCurrencyError] = useState("");
	const [file, setFile] = useState(null);
	const handleJustificationChange = (e) => {
		setJustfication(e.target.value);
		setJustficationError("");
	};
	const handleCurrencyChange = (e) => {
		setCurrency(e.target.value);
		setCurrencyError(""); // Clear the error message
	};

	const onSelectFile = (event) => {
		const selectedFiles = event.target.files;

		const selectedFilesArray = Array.from(selectedFiles);
		setFile(selectedFilesArray);
		console.log("selectedFilesArray", selectedFilesArray);
		const imagesArray = selectedFilesArray.map((file) => {
			return URL.createObjectURL(file);
		});

		setSelectedImages((previousImages) => previousImages.concat(imagesArray));
		setCollaboratorError("");

		// FOR BUG IN CHROME
		// event.target.value = "";
	};
	useEffect(() => {
		document.body.style.overflowY = "hidden";
		document.body.style.zIndex = 999;
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});

		const handleOutsideClick = (e) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(e.target) &&
				selectedImages.length === 0
			) {
				setShowPopUp([false]);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.body.style.overflowY = "scroll";
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [setShowPopUp]);

	const validateFieldLevel2 = () => {
		let isValid = true;

		if (justification === "") {
			setJustficationError("justification is required.");
			isValid = false;
		}
		if (currency === "") {
			setCurrencyError("proposal is required.");
			isValid = false;
		}
		return isValid;
	};
	console.log("image", selectedImages);

	return (
		<>
			<div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-popup-bg">
				<div
					ref={popupRef}
					className="bg-white flex flex-col items-center w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0 z-50 overflow-y-auto max-h-screen"
				>
					<div className="mb-4 px-4 lg:px-0 w-full">
						<label
							htmlFor="details"
							className="block text-lg font-medium text-black"
						>
							Proposal
						</label>

						<select
							value={currency}
							onChange={handleCurrencyChange}
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						>
							<option value="">select amount...</option>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="40">40</option>
							<option value="50">50</option>
							<option value="60">60</option>
							<option value="70">70</option>
							<option value="80">80</option>
							<option value="90">90</option>
						</select>
						<p className="text-red-500 text-xs mt-2">{currencyError}</p>
					</div>
					<div className="flex flex-col mb-5 w-full">
						<label className="block text-lg font-medium text-black pb-3">
							Justfication
						</label>
						<textarea
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-40"
							placeholder="Reason..."
							value={justification}
							onChange={handleJustificationChange}
						/>
						<p className="text-red-500 text-xs mt-2">{justificationError}</p>
					</div>
					<div className="mb-4 px-4 lg:px-0 w-full">
						<label
							htmlFor="details"
							className="block text-lg font-medium text-black"
						>
							Proof
						</label>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type="file"
							name="images"
							onChange={onSelectFile}
							multiple
							accept="image/*"
						/>
						<p className="text-red-500 text-xs mt-2">{collaboratorError}</p>
					</div>
					<div className="flex gap-2 flex-wrap justify-center my-2">
						{Array.isArray(selectedImages) &&
							selectedImages.map((image, index) => (
								<img
									key={index}
									src={image}
									height="100"
									width="100"
									alt={`upload-${index}`}
								/>
							))}
					</div>
					{isLoadingContracts ? (
						<div className="flex justify-center mt-4">
							<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					) : (
						<button
							onClick={() => {
								if (validateFieldLevel2()) {
									setIsLoadingContracts(true);
									showPopUp[1](id, justification, file).finally(() => {
										setIsLoadingContracts(false);
										setShowPopUp([false]);
									});
								}
							}}
							className="capitalize bg-theme-pruple text-center text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
						>
							Done
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default FilePopup;
