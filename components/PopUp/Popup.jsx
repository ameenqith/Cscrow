import React, { useEffect, useState, useRef, useContext } from "react";
import { EscrowContext } from "../../Context/EscrowContext";

const Popup = ({ setShowPopUp, escrowId, setIsLoadingContracts }) => {
  const [reason, setReason] = useState("");
  const [currency, setCurrency] = useState("");
  const [justification, setJustfication] = useState("");
  const [level, setLevel] = useState("level_1");

  const [reasonError, setReasonError] = useState("");
  const [currencyError, setCurrencyError] = useState("");
  const [justificationError, setJustficationError] = useState("");
  const [isLoadingContracts2, setIsLoadingContracts2] = useState(false);

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
  const {
    createDispureLevel1
  } = useContext(EscrowContext);
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

  return (
    <>
      <div className="fixed top-0 left-0 bottom-0 right-0 "></div>
      <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-popup-bg">
        <div
          ref={popupRef}
          className="bg-white flex flex-col items-center w-full md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0 z-50 overflow-y-auto max-h-screen"
        >
          {/* <div className="mb-4 px-4 lg:px-0 w-full">
            <label
              htmlFor="details"
              className="block text-lg font-medium text-black"
            >
              select level
            </label>
            <select
              value={level}
              onChange={handleLevelChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="level_1">level 1</option>
              <option value="level_2">levl 2</option>
            </select>
          </div> */}

          <>
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
                Give Reason
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-40"
                placeholder="Reason..."
                value={reason}
                onChange={handleReasonChange}
              />
              <p className="text-red-500 text-xs mt-2">{reasonError}</p>
            </div>
            <div className="mb-4 px-4 lg:px-0 w-full">

            </div>
            <div className="flex gap-2">
              {
                isLoadingContracts2 ? (
                  <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (validateFieldLevel1()) {
                          // setShowPopUp(false);
                          setIsLoadingContracts(true);
                          setIsLoadingContracts2(true);

                          createDispureLevel1(escrowId, currency, reason).finally(() => {
                            setIsLoadingContracts(false);
                            setIsLoadingContracts2(false);
                            setShowPopUp(false)// Stop loading contracts
                          });
                        }
                      }}
                      className="capitalize bg-theme-pruple text-center text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
                    >
                      Dispute
                    </button>
                    <button
                      onClick={() => {
                        setShowPopUp(false);

                      }}
                      className="capitalize bg-theme-pruple text-center text-white px-4 py-2 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:bg-theme-pruple"
                    >
                      cancel
                    </button>
                  </>
                )
              }

            </div>

          </>


        </div>
      </div>
    </>
  );
};

export default Popup;
