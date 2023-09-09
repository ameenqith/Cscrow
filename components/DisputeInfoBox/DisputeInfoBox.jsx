import React, { useContext, useState } from "react";
import { Button } from "../componentsindex";
import Image from "next/image";
import images from "../../img";
import { MdArrowRightAlt } from "react-icons/md";
import { EscrowContext } from "../../Context/EscrowContext";
import Popup from "../PopUp/Popup";
import FilePopup from "../PopUp/FilePopup";

const DisputeInfoBox = (dispute) => {
	const [isLoadingContracts, setIsLoadingContracts] = useState(false);

	const [showPopUp, setShowPopUp] = useState([false,null]);
	const {
		acceptDispute,
		currentAccount,
		addProofsForDisputeLevel2,
		createDisputeLevel2,
	} = useContext(EscrowContext);
	console.log(dispute);
	return (
		<>
			<div
				className=" bg-white rounded-lg shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0"
				key={dispute.dispute.id}
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
						{dispute.dispute.escrowTitle}
					</h2>
				</div>
				<div className="mb-4 flex flex-col">
					<p className="text-black flex text-sm">
						Dispute id: {dispute.dispute.id}
					</p>
					<p className="text-black flex text-sm">
						Cscrow id: {dispute.dispute.escrowId}
					</p>
					<p className="text-black flex text-sm">
						Sender: {dispute.dispute.assignor}
					</p>
					<p className="text-black text-sm">
						Reciever: {dispute.dispute.assignee}
					</p>

					<p className="text-black text-sm">
						Details: {dispute.dispute.escrowDescription}
					</p>
					<p className="text-black text-sm">
						Amount: {dispute.dispute.amount} Matic
					</p>
					<p className="text-black text-sm">
						Sender Disputed Amount: {dispute.dispute.disputedamount} Matic
					</p>
					<p className="text-black text-sm">
						Reciever Disputed Amount: {dispute.dispute.disputedamount} Matic
					</p>
					{dispute.dispute.assignorDetails !== "" ? (
						<p className="text-black text-sm">
							Sender Details: {dispute.dispute.assignorDetails}
						</p>
					) : (
						<p className="text-black text-sm">Assignor Details: Not Provided</p>
					)}

					{dispute.dispute.assigneeDetails !== "" ? (
						<p className="text-black text-sm">
							Receiver Details: {dispute.dispute.assigneeDetails}
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
							{dispute.dispute.escrowStatus === 5 &&
								dispute.dispute.status === 0 &&
								currentAccount.toLowerCase() === dispute.dispute.assignor && (
									<>
										<Button
											btnName="Accept"
											handleClick={() => {
												setIsLoadingContracts(true);

												acceptDispute(dispute.dispute.id).finally(() => {
													setIsLoadingContracts(false); // Stop loading contracts
												});
											}}
										/>
										<Button
											btnName="Create dispute"
											handleClick={() =>
												setShowPopUp([true, createDisputeLevel2])
											}
										/>
									</>
								)}
							{dispute.dispute.escrowStatus === 5 &&
								dispute.dispute.status === 0 &&
								currentAccount.toLowerCase() === dispute.dispute.assignee && (
									<p className="text-md text-red-500 itali">
										Wait for the other party for dispute
									</p>
								)}
							{dispute.dispute.escrowStatus === 5 &&
							dispute.dispute.status === 1 &&
							dispute.dispute.assigneeCreatedDispute &&
							currentAccount.toLowerCase() === dispute.dispute.assignee &&
							!dispute.dispute.validationStarted ? (
								<>
									<Button
										btnName="Upload Proofs"
										handleClick={() =>
											setShowPopUp([true, addProofsForDisputeLevel2])
										}
									/>
								</>
							) : dispute.dispute.validationStarted ? (
								<p className="text-md text-red-500 itali">
									Wait for validation from community
								</p>
							) : dispute.dispute.status === 1 ? (
								<>
									<p className="text-md text-red-500 itali">
										Wait for the other party to upload proofs
									</p>
								</>
							) : (
								<></>
							)}

							{dispute.dispute.escrowStatus === 7 && (
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
					id={dispute.dispute.id}
					showPopUp={showPopUp}
				/>
			)}
		</>
	);
};

export default DisputeInfoBox;
