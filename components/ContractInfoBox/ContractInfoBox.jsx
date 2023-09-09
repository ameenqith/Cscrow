import React, { useContext, useState } from "react";
import { Button } from "../componentsindex";
import Image from "next/image";
import images from "../../img";
import { MdArrowRightAlt } from "react-icons/md";
import { EscrowContext } from "../../Context/EscrowContext";
import Popup from "../PopUp/Popup";

export const ContractInfoBox = (contract) => {
	const [isLoadingContracts, setIsLoadingContracts] = useState(false);
	const [showPopUp, setShowPopUp] = useState(false);

	const {
		acceptContract,
		currentAccount,
		fundContract,
		completeContract,
		approveContract,
		cancelContract,
		withdrawContract,
	} = useContext(EscrowContext);
	return (
		<>
			<div
				className=" bg-white rounded-lg opacity-70 shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0"
				key={contract.contract.id}
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
						{contract.contract.title}
					</h2>
				</div>

				<div className="mb-4">
					<p className="text-black flex text-sm">
						CscrowId: {contract.contract.id}
					</p>
					<p className="text-black flex text-sm">
						Sender: {contract.contract.assignor}
					</p>
					<p className="text-black text-sm">
						Receiver: {contract.contract.assignee}
					</p>

					<p className="text-black text-sm">
						Details: {contract.contract.details}
					</p>
					<p className="text-black text-sm">
						Total in Tokens: {contract.contract.amount} Matic
					</p>
				</div>

				<div>
					{contract.contract.status === 1 ? (
						<div className="flex justify-center italic font-semibold border border-black">
							<span className="text-black text-xs lg:text-sm">Created</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-green-500 text-xs lg:text-sm">
								Accepted
							</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Completed</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Approved</span>
						</div>
					) : contract.contract.status === 2 ? (
						<div className="flex justify-center italic font-semibold border border-black">
							<span className="text-black text-xs lg:text-sm">Created</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Accepted</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>

							<span className="text-green-500 text-xs lg:text-sm">
								Completed
							</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Approved</span>
						</div>
					) : contract.contract.status === 3 ? (
						<div className="flex justify-center italic font-semibold border border-black px-20">
							<span className="text-black text-xs lg:text-sm">Created</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Accepted</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>

							<span className="text-black text-xs lg:text-sm">Completed</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-green-500 text-xs lg:text-sm">
								Approved
							</span>
						</div>
					) : contract.contract.status === 4 ? (
						<div className="flex justify-center italic font-semibold border border-black">
							<span className="text-black text-xs lg:text-sm">Created</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Accepted</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>

							<span className="text-black text-xs lg:text-sm">Completed</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-red-500 text-xs lg:text-sm">Cancelled</span>
						</div>
					) : contract.contract.status === 7 ? (
						<div className="flex justify-center italic font-semibold border border-black">
							<span className="text-black text-xs lg:text-sm">Created</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Accepted</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>

							<span className="text-black text-xs lg:text-sm">Completed</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-red-500 text-xs lg:text-sm">Withdraw</span>
						</div>
					) : contract.contract.status === 5 ? (
						<div className="flex justify-center italic font-semibold border border-black">
							<span className="text-black text-xs lg:text-sm">Created</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Accepted</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>

							<span className="text-black text-xs lg:text-sm">Completed</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-red-500 text-xs lg:text-sm">Disputed</span>
						</div>
					) : (
						<div className="flex justify-center italic font-semibold border border-black">
							<span className=" text-green-500 text-xs lg:text-sm">
								Created
							</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Accepted</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>

							<span className="text-black text-xs lg:text-sm">Completed</span>
							<span className="text-black">
								<MdArrowRightAlt className="mt-0 lg:mt-1" />
							</span>
							<span className="text-black text-xs lg:text-sm">Approved</span>
						</div>
					)}
				</div>
				<div className="flex justify-center mt-5">
					<div className="flex">
						{(currentAccount === contract.contract.assignor ||
							currentAccount === contract.contract.assignee) &&
						contract.contract.status === 4 ? (
							<>
								<p className="text-sm text-red-500 italic">
									Contract Cancelled
								</p>
							</>
						) : (currentAccount === contract.contract.assignor ||
								currentAccount === contract.contract.assignee) &&
						  contract.contract.status === 7 ? (
							<>
								<p className="text-sm text-red-500 italic">
									Contract Withdrawal
								</p>
							</>
						) : (currentAccount === contract.contract.assignor ||
								currentAccount === contract.contract.assignee) &&
						  contract.contract.status === 5 ? (
							<>
								<p className="text-sm text-red-500 italic">
									Contract Dispuuted, check dispute section
								</p>
							</>
						) : (
							""
						)}

						{isLoadingContracts ? (
							<div className="flex justify-center mt-4">
								<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
							</div>
						) : (
							<>
								{contract.contract.status === 0 &&
									currentAccount === contract.contract.assignor && (
										<>
											<Button
												btnName="Withdraw"
												handleClick={
													() => {
														setIsLoadingContracts(true);
														withdrawContract(contract.contract.id).finally(
															() => {
																setIsLoadingContracts(false); // Stop loading contracts
															}
														);
													}
													// setShowPopUp(true)
												}
											/>
										</>
									)}
								{currentAccount === contract.contract.assignee &&
									contract.contract.status === 0 && (
										<>
											<Button
												btnName="Accept"
												handleClick={() => {
													setIsLoadingContracts(true); // Start loading contracts
													acceptContract(contract.contract.id).finally(() => {
														setIsLoadingContracts(false); // Stop loading contracts
													});
												}}
											/>
											<div className="ml-2">
												<Button
													btnName="Cancel"
													handleClick={() => {
														setIsLoadingContracts(true); // Start loading contracts
														cancelContract(contract.contract.id).finally(() => {
															setIsLoadingContracts(false); // Stop loading contracts
														});
													}}
												/>
											</div>
										</>
									)}
								{currentAccount === contract.contract.assignor &&
									contract.contract.status === 1 && (
										<Button
											btnName="Cancel"
											handleClick={() => {
												setIsLoadingContracts(true); // Start loading contracts
												cancelContract(contract.contract.id).finally(() => {
													setIsLoadingContracts(false); // Stop loading contracts
												});
											}}
										/>
									)}
								{currentAccount === contract.contract.assignee &&
									contract.contract.status === 1 && (
										<>
											<Button
												btnName="Complete"
												handleClick={() => {
													setIsLoadingContracts(true); // Start loading contracts
													completeContract(contract.contract.id).finally(() => {
														setIsLoadingContracts(false); // Stop loading contracts
													});
												}}
											/>
											<div className="ml-2">
												<Button
													btnName="Cancel"
													handleClick={() => {
														setShowPopUp(true);
													}}
												/>
											</div>
										</>
									)}
								{currentAccount === contract.contract.assignor &&
									contract.contract.status === 2 && (
										<>
											<Button
												btnName="Approve"
												handleClick={() => {
													setIsLoadingContracts(true);
													approveContract(contract.contract.id).finally(() => {
														setIsLoadingContracts(false); // Stop loading contracts
													});
												}}
											/>

											<div className="ml-2">
												<Button
													btnName="Cancel"
													handleClick={() => {
														setShowPopUp(true);
													}}
												/>
											</div>
										</>
									)}
							</>
						)}
					</div>
				</div>
				<div className="flex justify-end">
					<p className="text-black italic  text-xs">2% service fee</p>
				</div>
			</div>
			{showPopUp && (
				<Popup setShowPopUp={setShowPopUp} escrowId={contract.contract.id} />
			)}
		</>
	);
};

export default ContractInfoBox;
