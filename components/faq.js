import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline"
import React, { useState } from "react";
import {motion} from 'framer-motion'
import Link from "next/link";

function Faq() {
    const [problemFirst, setProblemFirst] = useState(false);
    const [problemSecond, setProblemSecond] = useState(false);
    const [problemThird, setProblemThird] = useState(false);
    const [problemFourth, setProblemFourth] = useState(false);
    const [problemFifth, setProblemFifth] = useState(false);
    const [problemSixth, setProblemSixth] = useState(false);
    const [problemSeventh, setProblemSeventh] = useState(false);
  return (
    <motion.section
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        transition={{duration:1.5}} 
        viewport={{once: true}} 
        className='flex flex-col w-screen justify-start md:justify-center items-center mt-16 lg:mt-0 mb-32 px-6 md:pr-32 snap-center'>
        <h1 className="text-[25.6px] md:text-4xl text-white font-['Bowlby_One'] md:pb-5 text-center" id="faq">FAQ's</h1>
        <div className="my-8 space-y-6 text-sm md:text-lg md:w-[70vw] md:flex md:flex-col md:justify-center md:items-center">
                {/* 1 question */}
                <div 
                    className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemFirst && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                    onClick={() => {setProblemFirst(!problemFirst)}}
                >
                    <p className='queryText'>For Sender</p>
                    {problemFirst ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
                </div>
                {problemFirst && (
                     <motion.div 
                        initial={{ opacity: .3 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl pt-0 pb-4 px-6 transition duration-200 mt-0"
                    >
                          <>
                              <div className="text-white">
                                  Concerned about making upfront payments only to be left hanging by
                                  your service provider? Utilize our CSCROW smart contracts to
                                  safeguard your agreement, receive the service, and then make payment
                                  based on the quality of the service rendered.{" "}
                              </div>
                              <br></br>
                              <div className="text-white">
                                  • Log in using your Polygon Network wallet.{" "}
                              </div>
                              <div className="text-white">
                                  • Fill in the necessary details and generate the contract.{" "}
                              </div>
                              <div className="text-white">
                                  Once created, access the "Sent" page to track your contract's status
                                  and progress.{" "}
                              </div>
                    </>
                    </motion.div>
                )}
                <div 
                    className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemSecond && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                    onClick={() => {setProblemSecond(!problemSecond)}}
                >
                    <p className='queryText'>For Receivers</p>
                    {problemSecond ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
                </div>
                {problemSecond && (
                     <motion.div 
                        initial={{ opacity: .3 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl py-4 px-6 items-start transition duration-200 mt-0"
                    >
                         <div className="text-white">
                             Tired of putting in honest and hard work, only to be ignored by
                             founders? Request payment via CSCROW and commence your service once
                             you've received the fully funded contract. If the founder unfairly
                             denies payment, you have the option to present your side of the
                             story in our decentralized court.
                         </div>
                         <br></br>
                         <div className="text-white">
                             • Log in using your Polygon Network wallet.{" "}
                         </div>
                         <div className="text-white">• Navigate to the "Received" page.</div>
                         <div className="text-white">• Review contracts sent by the Sender.</div>
                         <div className="text-white">
                             • Evaluate the contract and begin your work.
                         </div>
                    </motion.div>
                )}
                <div
                    className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemThird && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                    onClick={() => {setProblemThird(!problemThird)}}
                >
                    <p className='queryText'>What is a Level 1 dispute and how does it work?</p>
                    {problemThird ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
                </div>
                {problemThird && (
                     <motion.div 
                        initial={{ opacity: .3 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl py-4 px-6 items-start transition duration-200 mt-0"
                    >
                         <div className="text-white">
                             A Level 1 dispute arises when both the sender and receiver agree to
                             alter the contract sum. They mutually decide to release a portion of
                             the agreed sum instead of the entire amount.
                         </div>
                         <br></br>
                         <div className="text-white">
                             • Either the Sender or Receiver cancels the contract.{" "}
                         </div>
                         <div className="text-white">
                             • The canceling party proposes the percentage of the original
                             contract to be released.
                         </div>
                         <div className="text-white">• The other party accepts the proposal.</div>
                         <div className="text-white">
                             • In the event of rejection, the dispute escalates to a Level 2
                             dispute.
                         </div>
                    </motion.div>
                )}
                {/* 4 question */}
                <div 
                    className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemFourth && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                    onClick={() => {setProblemFourth(!problemFourth)}}
                >
                    <p className='queryText'>	What is a Level 2 dispute and how does it work?</p>
                    {problemFourth ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
                </div>
                {problemFourth && (
                     <motion.div 
                        initial={{ opacity: .3 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl py-4 px-6 items-start transition duration-200 mt-0"
                    >
                         <div className="text-white">
                             A Level 2 dispute occurs when there's no mutual agreement between
                             the sender and receiver. This leads both parties to present their
                             cases with evidence to the community for voting.
                         </div>
                         <br></br>
                         <div className="text-white">
                             • If no agreement is reached in a Level 1 dispute, the case
                             escalates to Level 2.{" "}
                         </div>
                         <div className="text-white">
                             • Both parties provide three items: the reason, proposal, and
                             evidence.
                         </div>
                    </motion.div>
                )}


            {/*  5 question */}
            <div
                className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemFifth && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                onClick={() => {setProblemFifth(!problemFifth)}}
            >
                <p className='queryText'>How long does the voting last?</p>
                {problemFifth ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemFifth && (
                <motion.div
                    initial={{ opacity: .3 }}
                    animate={{ opacity: 1 }}
                    className="flex  flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl pt-0 pb-4 px-6 transition duration-200 mt-0"
                >
                    <>
                        <div className="text-white">
                            Voting lasts for 24 hours. Afterward, funds are automatically
                            released based on the winning proposal.
                        </div>
                    </>
                </motion.div>
            )}
            {/*6  question */}
            <div
                className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemSixth && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                onClick={() => {setProblemSixth(!problemSixth)}}
            >
                <p className='queryText'>	What happens in case of a draw?</p>
                {problemSixth ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemSixth && (
                <motion.div
                    initial={{ opacity: .3 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl pt-0 pb-4 px-6 transition duration-200 mt-0"
                >
                    <>
                        <div className="text-white">
                            A tiebreaker vote will take place to determine the winner. The funds
                            will will be released as per winning proposal.
                        </div>
                    </>
                </motion.div>
            )}

            {/* 7 question */}
            <div
                className={`flex justify-between md:w-[70vw] lg:w-[50vw] border border-slate-500 ${problemSeventh && "border-purple-600"} hover:border-purple-600 rounded-2xl py-4 px-6 items-center cursor-pointer hover:opacity-70 transition duration-200 shadow-md hover:shadow-slate-500 hover:scale-105`}
                onClick={() => {setProblemSeventh(!problemSeventh)}}
            >
                <p className='queryText'>What is the Judge to Earn feature?</p>
                {problemSeventh ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemSeventh && (
                <motion.div
                    initial={{ opacity: .3 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-start align-start md:w-[70vw] lg:w-[50vw] border-b border-purple-500 rounded-xl pt-0 pb-4 px-6 transition duration-200 mt-0"
                >
                    <>
                        <div className="text-white">
                            The Judge to Earn feature is designed to reward the CSCROW community
                            for their contributions to the fair and prompt resolution of
                            disputes within our decentralized platform.
                        </div>
                        <br></br>
                        <div className="text-white">
                            •The first 10 voters will each earn 1% of the contract's value.{" "}
                        </div>
                        <div className="text-white">
                            • All validators, including the initial 10 voters, will receive
                            token rewards stored on the blockchain upon launch.
                        </div>
                    </>
                </motion.div>
            )}
            </div>


    </motion.section>
  )
}

export default Faq