import React, { useEffect, useState, useContext } from "react";
import { EscrowContext } from "../Context/EscrowContext";
import { ContractInfoBox } from "../components/componentsindex.js";
import Head from "next/head"
import images from "../img";
import { FaSearch } from "react-icons/fa";

const created = () => {
	const { currentAccount, getMyContractsAssignor,connectingWithSmartContract } = useContext(EscrowContext);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);
	const [contracts, setContracts] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	useEffect(() => {
		if (currentAccount) {
			const data = getMyContractsAssignor().then((items) => {
				setContracts(items);
				setLoading(false);
			});
			// setContracts(data);
		}
	}, [currentAccount]);



	  
		
	console.log(contracts);
	const filteredContracts = contracts.filter(
		(item) =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.id.toString().includes((searchQuery.toLowerCase()).toString())
	);
	const totalPages = Math.ceil(filteredContracts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const contractsForPage = filteredContracts.reverse().slice(startIndex, endIndex);
	return (
		<div>
			<div className="flex justify-center items-center my-5 md:mx-auto mx-5 relative md:w-1/3 w-full">
				<span className="absolute left-5 text-[1.4rem] text-zinc-400">
					<FaSearch />
				</span>
				<input type="text"
					placeholder="search...." className="py-5 pl-[4rem] w-full  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)} />

			</div>
			{/* Centering container */}
			{loading ? (
				<>
				<Head>
						<title>Sender contract is loading</title> {/* Set the title for the page */}
					</Head>
				<div className="flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-blue-500"></div>
				</div>

				</>
			) : (
				<div className="grid grid-cols-1 lg:px-10 lg:grid-cols-3">
					<Head>
						<title>Contract sender	</title> {/* Set the title for the page */}
					</Head>

					{contractsForPage.length === 0 ? (
						<p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[2rem] font-light text-zinc-400">No contracts found.</p>
					) : (
						contractsForPage.map((item, index) => (
							<ContractInfoBox key={index} contract={item} />
						))
					)}

				</div>
			)
			}
			{totalPages > 1 && (
				<div className="flex justify-center items-center mt-5">
					{currentPage > 1 && (
						<button
							className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
							onClick={() => setCurrentPage(currentPage - 1)}
						>
							Previous
						</button>
					)}

					{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
						<button
							key={pageNumber}
							className={`mx-1 px-2 py-1 border rounded ${currentPage === pageNumber
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-700'
								}`}
							onClick={() => setCurrentPage(pageNumber)}
						>
							{pageNumber}
						</button>
					))}

					{currentPage < totalPages && (
						<button
							className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
							onClick={() => setCurrentPage(currentPage + 1)}
						>
							Next
						</button>
					)}
				</div>
			)}
			
			
		</div>
	);
};

export default created;
