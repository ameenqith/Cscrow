import React, { useContext, useEffect, useState } from "react";
import { Button } from "../componentsindex";
import Image from "next/image";
import images from "../../img";
import { MdArrowRightAlt } from "react-icons/md";
import { EscrowContext } from "../../Context/EscrowContext";
import Popup from "../PopUp/Popup";
import { logger } from "ethers";
import SliderPopup from "../PopUp/SliderPopup";

export const ContractInfoBoxAssign = ({contract, onRefresh}) => {
	const startDate = new Date(contract.validationCreateTime * 1000);
	const endTime = new Date(startDate);
	const { runResolveDispute, vote } = useContext(EscrowContext);
	const [showPopUp, setShowPopUp] = useState([false, "assignee"]);
	const [isLoadingContracts, setIsLoadingContracts] = useState(false);

	endTime.setHours(endTime.getHours() + 24);
	// endTime.setSeconds(endTime.getSeconds() + 5);

	const targetTimestamp = startDate.toISOString();

	localStorage.setItem("targetTimestamp", targetTimestamp);

	const calculateRemainingTime = (targetTimestamp) => {
		const currentTime = new Date();
		const remainingTime = endTime - currentTime;
		const hours = Math.floor(remainingTime / 3600000);
		const minutes = Math.floor((remainingTime % 3600000) / 60000);
		const seconds = Math.floor((remainingTime % 60000) / 1000);
		if (hours < 0 && minutes < 0 && seconds < 0) {
			return { hours: 0, minutes: 0, seconds: 0 };
		}

		return { hours, minutes, seconds };
	};

	const initialTargetTimestamp = localStorage.getItem("targetTimestamp");
	const [remainingTime, setRemainingTime] = useState(
		calculateRemainingTime(targetTimestamp)
	);

	useEffect(() => {
		if (initialTargetTimestamp) {
			const interval = setInterval(() => {
				const updatedRemainingTime = calculateRemainingTime(
					initialTargetTimestamp
				);
				setRemainingTime(updatedRemainingTime);

				console.log(
					"Remaining time:",
					updatedRemainingTime.hours,
					updatedRemainingTime.minutes,
					updatedRemainingTime.seconds
				);

				if (
					updatedRemainingTime.hours <= 0 &&
					updatedRemainingTime.minutes <= 0 &&
					updatedRemainingTime.seconds <= 0
				) {
					console.log("Countdown reached zero");
					clearInterval(interval); // Clear the interval once the countdown is complete
					runResolveDispute(contract.disputeId);
				}
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [initialTargetTimestamp]);

	return (
		<>
			<div
				className=" bg-white rounded-lg opacity-70 shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0"
				key={contract.validatorId}
			>
				<div className="flex justify-end">
					<Image
						className="flex object-cover object-right h-5 w-20"
						src={images.polygon}
						alt="NFT images"
						width={0}
						height={0}
					/>
				</div>
				<div className="flex justify-center">
					<h2 className="text-2xl text-black font-semibold mb-4">
						{contract.title}
					</h2>
				</div>

				<div className="mb-4">
					<p className="text-black text-sm capitalize">
						Case Id: {contract.validatorId}
					</p>
					<p className="text-black text-sm capitalize">
						Sender Details: {contract.assignorDetails}
					</p>
					<p className="text-black text-sm capitalize">
						Reciever Details: {contract.assigneeDetails}
					</p>
					<p className="text-black text-sm capitalize">
						Sender proof:{" "}
						{contract.assignorProfs.length > 0 ? (
							<span
								onClick={() => {
									setShowPopUp([true, "assignor"]);
								}}
								className="hover:underline text-fuchsia-500 font-bold cursor-pointer text-green-5 capitalize"
							>
								see proof
							</span>
						) : (
							<span className="hover:underline text-red-500 font-bold cursor-pointer text-green-5 capitalize">
								no proofs provided
							</span>
						)}
					</p>
					<p className="text-black text-sm capitalize">
						Reciever proof:{" "}
						{contract.assigneeProfs.length > 0 ? (
							<span
								onClick={() => {
									setShowPopUp([true, "assignee"]);
								}}
								className="hover:underline text-fuchsia-500 font-bold cursor-pointer text-green-5 capitalize"
							>
								see proof
							</span>
						) : (
							<span className="hover:underline text-red-500 font-bold cursor-pointer text-green-5 capitalize">
								no proofs provided
							</span>
						)}
					</p>
					{/* <p className="text-black text-sm capitalize">
						Timer : {getMonth} {getDate},{getYear} {ctime}
					</p> */}
					{remainingTime.hours > 0 ||
					remainingTime.minutes > 0 ||
					remainingTime.seconds > 0 ? (
						<p className=" flex justify-center items-center  text-black text-sm capitalize pt-5">
							<span className="flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 w-9/12 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
								<div className="flex flex-col">
									<span>{remainingTime.hours}</span>
									<span className="text-sm ">hour</span>
								</div>
								<span>:</span>
								<div className="flex flex-col">
									<span>{remainingTime.minutes}</span>
									<span className="text-sm ">min</span>
								</div>
								<span>:</span>
								<div className="flex flex-col">
									<span>{remainingTime.seconds}</span>
									<span className="text-sm ">sec</span>
								</div>
							</span>
						</p>
					) : (
						<>
							<p className="text-red-500 text-center pt-5">Time is completed</p>
						</>
					)}
				</div>

				{isLoadingContracts ? (
					<div className="flex justify-center mt-4">
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
					</div>
				) : (
					<>
						{remainingTime.hours > 0 ||
						remainingTime.minutes > 0 ||
						remainingTime.seconds > 0 ? (
							<div className="flex justify-around my-5">
								<Button
									btnName="Assignee"
									handleClick={() => {
										setIsLoadingContracts(true);
										vote(contract.validatorId, 1).finally(() => {
											setIsLoadingContracts(false); // Stop loading contracts
											onRefresh()
										});
									}}
								/>
								<Button
									btnName="Assignor"
									handleClick={() => {
										setIsLoadingContracts(true);

										vote(contract.validatorId, 0).finally(() => {
											setIsLoadingContracts(false); // Stop loading contracts
											onRefresh()
										});
									}}
								/>
							</div>
						) : null}
					</>
				)}

				<div className="flex justify-end">
					<p className="text-black italic  text-xs">2% service fee</p>
				</div>
			</div>

			{showPopUp[0] && (
				<SliderPopup
					setShowPopUp={setShowPopUp}
					validate={contract}
					showPopUp={showPopUp}
				/>
			)}
		</>
	);
};

export default ContractInfoBoxAssign;
