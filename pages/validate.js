import React, { useEffect, useState, useContext } from "react";
import { EscrowContext } from "../Context/EscrowContext";
import { ContractInfoBox } from "../components/componentsindex.js";
import ContractInfoBoxAssign from "../components/ContractInfoBoxAssign/ContractInfoBoxAssign";
import Head from "next/head"
import { FaSearch } from "react-icons/fa";


const validate = () => {

    const {currentAccount, validations } = useContext(EscrowContext);
    const [contracts, setContracts] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const [loading, setLoading] = useState(true);

    useEffect(() => {
		if (currentAccount) {
			const data = validations().then((items) => {
                setContracts(items);
				setLoading(false);

              });
            // setContracts(data);
		}
	}, [currentAccount]);
  // const filteredContracts = contracts.filter(
	// 	(item) =>
	// 		item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
	// 		item.id.toString().includes((searchQuery.toLowerCase()).toString())
	// );
	const totalPages = Math.ceil(contracts.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const contractsForPage = contracts.reverse().slice(startIndex, endIndex);
      return (
      //   <div className="grid grid-cols-1 lg:px-10 lg:grid-cols-3">
      //       <Head>
			// 	<title>Validate Contract</title> {/* Set the title for the page */}
			// </Head>
      //       {contracts && contracts.map((item, index) => (
      //           <ContractInfoBoxAssign contract={item}/> 
      //       ))}
      //   </div>

      <>
      
      <div>
		
			{/* Centering container */}
			{loading ? (
				<>
				<Head>
						<title>validate contract is loading...</title> {/* Set the title for the page */}
					</Head>
				<div className="flex justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-blue-500"></div>
				</div>
				</>
			) : (
				<div className="grid grid-cols-1 lg:px-10 lg:grid-cols-3">
					<Head>
          <title>Validate Contract</title>  {/* Set the title for the page */}
					</Head>

					{contractsForPage.length === 0 ? (
						<p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[2rem] font-light text-zinc-400">No contracts found.</p>
					) : (
						contractsForPage.map((item, index) => (
							<ContractInfoBoxAssign contract={item}/> 
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
      </>

    )
  };

export default validate;