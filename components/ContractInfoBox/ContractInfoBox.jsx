import React, { useContext, useState } from "react";
import { Button } from "../componentsindex";
import Image from "next/image";
import images from "../../img";
import { MdArrowRightAlt } from "react-icons/md";
import { EscrowContext } from "../../Context/EscrowContext";
import Popup from "../PopUp/Popup";

export const ContractInfoBox = ({contract, onRefresh, isSender}) => {
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
				className="bg-white rounded-lg shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0"
				key={contract.id}
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
					<p className="text-black flex text-sm">
						CscrowId: {contract.id}
					</p>
					<p className="text-black flex text-sm">
						Sender: {contract.assignor}
					</p>
					<p className="text-black text-sm">
						Receiver: {contract.assignee}
					</p>

					<p className="text-black text-sm">
						Details: {contract.details}
					</p>
					<p className="text-black text-sm">
						Total in Tokens: {contract.amount} Matic
					</p>
				</div>

				<div>
					{contract.status === 1 ? (
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
					) : contract.status === 2 ? (
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
					) : contract.status === 3 ? (
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
					) : contract.status === 4 ? (
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
					) : contract.status === 7 ? (
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
					) : contract.status === 5 ? (
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
						{(currentAccount === contract.assignor ||
							currentAccount === contract.assignee) &&
						contract.status === 4 ? (
							<>
								<p className="text-sm text-red-500 italic">
									Contract Cancelled
								</p>
							</>
						) : (currentAccount === contract.assignor ||
								currentAccount === contract.assignee) &&
						  contract.status === 7 ? (
							<>
								<p className="text-sm text-red-500 italic">
									Contract Withdrawal
								</p>
							</>
						) : (currentAccount === contract.assignor ||
								currentAccount === contract.assignee) &&
						  contract.status === 5 ? (
							<>
								<p className="text-sm text-red-500 italic">
									Contract Disputed, check dispute section
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
								{contract.status === 0 &&
									currentAccount === contract.assignor && isSender && (
										<>
											<Button
												btnName="Withdraw"
												handleClick={
													() => {
														setIsLoadingContracts(true);
														withdrawContract(contract.id).finally(
															() => {
																setIsLoadingContracts(false); // Stop loading contracts
																onRefresh()
															}
														);
													}
													// setShowPopUp(true)
												}
											/>
										</>
									)}
								{currentAccount === contract.assignee && !isSender &&
									contract.status === 0 && (
										<>
											<Button
												btnName="Accept"
												handleClick={() => {
													setIsLoadingContracts(true); // Start loading contracts
													acceptContract(contract.id).finally(() => {
														setIsLoadingContracts(false); // Stop loading contracts
														onRefresh()
													});
												}}
											/>
											<div className="ml-2">
												<Button
													btnName="Cancel"
													handleClick={() => {
														setIsLoadingContracts(true); // Start loading contracts
														cancelContract(contract.id).finally(() => {
															setIsLoadingContracts(false); // Stop loading contracts
															onRefresh()
														});
													}}
												/>
											</div>
										</>
									)}
								{currentAccount === contract.assignor && isSender &&
									contract.status === 1 && (
										<Button
											btnName="Cancel"
											handleClick={() => {
												setIsLoadingContracts(true); // Start loading contracts
												cancelContract(contract.id).finally(() => {
													setIsLoadingContracts(false); // Stop loading contracts
													onRefresh()
												});
											}}
										/>
									)}
								{currentAccount === contract.assignee && !isSender &&
									contract.status === 1 && (
										<>
											<Button
												btnName="Complete"
												handleClick={() => {
													setIsLoadingContracts(true); // Start loading contracts
													completeContract(contract.id).finally(() => {
														setIsLoadingContracts(false); // Stop loading contracts
														onRefresh()
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
								{currentAccount === contract.assignor && isSender &&
									contract.status === 2 && (
										<>
											<Button
												btnName="Approve"
												handleClick={() => {
													setIsLoadingContracts(true);
													approveContract(contract.id).finally(() => {
														setIsLoadingContracts(false); // Stop loading contracts
														onRefresh()
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
				<Popup setShowPopUp={setShowPopUp} escrowId={contract.id} />
			)}
		</>
	);
};

export default ContractInfoBox;
