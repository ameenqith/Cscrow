import React, {useContext, useEffect, useState} from "react";
import { Button } from "../componentsindex";
import Image from "next/image";
import images from "../../img";
import { MdArrowRightAlt } from "react-icons/md";
import { EscrowContext } from "../../Context/EscrowContext";
import Popup from "../PopUp/Popup";
import FilePopup from "../PopUp/FilePopup";
import {currencyObj} from "../../pages";

const DisputeInfoBox = ({dispute, onRefresh}) => {
	const [isLoadingContracts, setIsLoadingContracts] = useState(false);
	const currencyObjTokens = Object.keys(currencyObj).reduce((acc, key) => {
		if (currencyObj[key].token) {
			acc[currencyObj[key].token_address.toLowerCase()] = key.toUpperCase();
		}
		return acc;
	}, {});
	const [showPopUp, setShowPopUp] = useState([false,null]);
	const {
		acceptDispute,
		currentAccount,
		addProofsForDisputeLevel2,
		createDisputeLevel2,
	} = useContext(EscrowContext);


	return (
		<>
			<div
				className=" bg-white rounded-lg shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0"
				key={dispute.id}
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
						{dispute.escrowTitle}
					</h2>
				</div>
				<div className="mb-4 flex flex-col">
					<p className="text-black flex text-sm">
						Dispute id: {dispute.id}
					</p>
					<p className="text-black flex text-sm">
						Cscrow id: {dispute.escrowId}
					</p>
					<p className="text-black flex text-sm">
						Sender: {dispute.assignor}
					</p>
					<p className="text-black text-sm">
						Reciever: {dispute.assignee}
					</p>

					<p className="text-black text-sm">
						Details: {dispute.escrowDescription}
					</p>
					<p className="text-black text-sm">
						Amount: {dispute.amount} {dispute.token ? currencyObjTokens[dispute.tokenAddress]: 'Matic'}
					</p>
					<p className="text-black text-sm">
						{/*Sender Disputed Amount: {dispute.disputedamount} Matic*/}
						Sender Disputed: {dispute.amountDisputedAssignor} %
					</p>
					<p className="text-black text-sm">
						{/*Receiver Disputed Amount: {dispute.disputedamount} Matic*/}
						Receiver Disputed: {dispute.amountDisputedAssignee} %
					</p>
					{dispute.assignorDetails !== "" ? (
						<p className="text-black text-sm">
							Sender Details: {dispute.assignorDetails}
						</p>
					) : (
						<p className="text-black text-sm">Receiver Details: Not Provided</p>
					)}

					{dispute.assigneeDetails !== "" ? (
						<p className="text-black text-sm">
							Receiver Details: {dispute.assigneeDetails}
						</p>
					) : (
						<p className="text-black text-sm">Assignee Details: Not Provided</p>
					)}
				</div>
				<div className="flex justify-center gap-2">
					{isLoadingContracts ? (
						<div className="flex justify-center mt-4">
							<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					) : (
						<>
							{dispute.escrowStatus === 5 &&
								dispute.status === 0 &&
								((dispute.assigneeCreatedDispute && currentAccount.toLowerCase() === dispute.assignor) ||
								(!dispute.assigneeCreatedDispute && currentAccount.toLowerCase() === dispute.assignee))
								 && (
									<>
										<Button
											btnName="Accept"
											handleClick={() => {
												setIsLoadingContracts(true);
												acceptDispute(dispute.id).finally(() => {
													setIsLoadingContracts(false); // Stop loading contracts
													onRefresh()
												});
											}}
										/>
										<Button
											btnName="Create dispute level 2"
											handleClick={() =>
												setShowPopUp([true, createDisputeLevel2])
											}
										/>
									</>
								)}
							{dispute.escrowStatus === 5 &&
								dispute.status === 0 && (
								(dispute.assigneeCreatedDispute && currentAccount.toLowerCase() === dispute.assignee) ||
								(!dispute.assigneeCreatedDispute && currentAccount.toLowerCase() === dispute.assignor))
								&& (
									<p className="text-md text-red-500 itali">
										Wait for the other party for dispute
									</p>
								)}
							{dispute.escrowStatus === 5 &&
							dispute.status === 1 &&
							// dispute.assigneeCreatedDispute &&
							// currentAccount.toLowerCase() === dispute.assignee &&
							((dispute.assigneeCreatedDispute && currentAccount.toLowerCase() === dispute.assignee) ||
								(!dispute.assigneeCreatedDispute && currentAccount.toLowerCase() === dispute.assignor)) &&
							!dispute.validationStarted ? (
								<>
									<Button
										btnName="Upload Proofs"
										handleClick={() =>
											setShowPopUp([true, addProofsForDisputeLevel2])
										}
									/>
								</>
							) : dispute.validationStarted ? (
								<p className="text-md text-red-500 itali">
									Wait for validation from community
								</p>
							) : dispute.status === 1 ? (
								<>
									<p className="text-md text-red-500 itali">
										Wait for the other party to upload proofs
									</p>
								</>
							) : (
								<></>
							)}

							{dispute.escrowStatus === 7 && (
								<>
									<p className="text-md text-red-500 italic">
										Dispute resolved
									</p>
								</>
							)}
						</>
					)}
				</div>
			</div>
			{showPopUp[0] && (
				<FilePopup
					setShowPopUp={setShowPopUp}
					id={dispute.id}
					showPopUp={showPopUp}
					onRefresh={onRefresh}
					tokenAddress={dispute.tokenAddress}
				/>
			)}
		</>
	);
};

export default DisputeInfoBox;
