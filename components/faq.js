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
    <div className='faq-section' id="faq">
        <div className="container">
            {/* 1 question */}
            <div className={`q-title flex justify-between items-center cursor-pointer`} onClick={() => {setProblemFirst(!problemFirst)}}>
                <p className='queryText'>For Sender</p>
                {problemFirst ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemFirst && (
                    <div className="q-content transition duration-200 mt-0">
                    <p>Concerned about making upfront payments only to be left hanging by
                        your service provider? Utilize our CSCROW smart contracts to
                        safeguard your agreement, receive the service, and then make payment
                        based on the quality of the service rendered.</p>
                    <ul>
                        <li>Log in using your Polygon Network wallet.</li>
                        <li>Fill in the necessary details and generate the contract.</li>
                    </ul>
                    <p>Once created, access the "Sent" page to track your contract's status
                        and progress.</p>
                </div>
            )}
            {/* 2 question */}
            <div 
                className={`q-title flex justify-between items-center cursor-pointer`}
                onClick={() => {setProblemSecond(!problemSecond)}}
            >
                <p className='queryText'>For Receivers</p>
                {problemSecond ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemSecond && (
                    <div className="q-content transition duration-200 mt-0">
                        <p>Tired of putting in honest and hard work, only to be ignored byfounders? Request payment via CSCROW and commence your service once
                            you've received the fully funded contract. If the founder unfairly
                            denies payment, you have the option to present your side of the
                            story in our decentralized court.</p>
                        <ul>
                        <li>Log in using your Polygon Network wallet.</li>
                        <li>Navigate to the "Received" page.</li>
                        <li>Review contracts sent by the Sender.</li>
                        <li>Evaluate the contract and begin your work.</li>
                    </ul>
                </div>
            )}
            {/* 3 question */}
            <div
                className={`q-title flex justify-between items-center cursor-pointer`}
                onClick={() => {setProblemThird(!problemThird)}}
            >
                <p className='queryText'>What is a Level 1 dispute and how does it work?</p>
                {problemThird ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemThird && (
                    <div className="q-content transition duration-200 mt-0">
                        <p>A Level 1 dispute arises when both the sender and receiver agree to
                            alter the contract sum. They mutually decide to release a portion of
                            the agreed sum instead of the entire amount.
                        </p>
                        <ul>
                        <li>Either the Sender or Receiver cancels the contract.</li>
                        <li>The canceling party proposes the percentage of the original
                            contract to be released.</li>
                        <li>The other party accepts the proposal.</li>
                        <li>In the event of rejection, the dispute escalates to a Level 2
                            dispute.</li>
                        </ul>
                </div>
            )}
            {/* 4 question */}
            <div 
                className={`q-title flex justify-between items-center cursor-pointer`}
                onClick={() => {setProblemFourth(!problemFourth)}}
            >
                <p className='queryText'>	What is a Level 2 dispute and how does it work?</p>
                {problemFourth ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemFourth && (
                <div className="q-content transition duration-200 mt-0">
                        <p>
                            A Level 2 dispute occurs when there's no mutual agreement between
                            the sender and receiver. This leads both parties to present their
                            cases with evidence to the community for voting.
                        </p>
                        <ul>
                        <li>If no agreement is reached in a Level 1 dispute, the case escalates to Level 2.</li>
                        <li>Both parties provide three items: the reason, proposal, and evidence.</li>
                        </ul>
                </div>
            )}
            {/*  5 question */}
            <div
                className={`q-title flex justify-between items-center cursor-pointer`}
                onClick={() => {setProblemFifth(!problemFifth)}}
            >
                <p className='queryText'>How long does the voting last?</p>
                {problemFifth ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemFifth && (
                <div className="q-content transition duration-200 mt-0">
                    <p>Voting lasts for 24 hours. Afterward, funds are automatically released based on the winning proposal.</p>
                </div>
            )}
            {/*6  question */}
            <div
                className={`q-title flex justify-between items-center cursor-pointer`}
                onClick={() => {setProblemSixth(!problemSixth)}}
            >
                <p className='queryText'>	What happens in case of a draw?</p>
                {problemSixth ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemSixth && (
                <div className="q-content transition duration-200 mt-0">
                    <p>A tiebreaker vote will take place to determine the winner. The funds will will be released as per winning proposal.</p>
                </div>
            )}

            {/* 7 question */}
            <div
                className={`q-title flex justify-between items-center cursor-pointer`}
                onClick={() => {setProblemSeventh(!problemSeventh)}}
            >
                <p className='queryText'>What is the Judge to Earn feature?</p>
                {problemSeventh ? <ChevronUpIcon className="upDownIcon"/> :<ChevronDownIcon className="upDownIcon"/>}
            </div>
            {problemSeventh && (
                <div className="q-content transition duration-200 mt-0">
                    <p>The Judge to Earn feature is designed to reward the CSCROW community
                            for their contributions to the fair and prompt resolution of
                            disputes within our decentralized platform.</p>
                    <ul>
                        <li>The first 10 voters will each earn 1% of the contract's value.</li>
                        <li>All validators, including the initial 10 voters, will receive
                            token rewards stored on the blockchain upon launch.</li>
                    </ul>
                </div>
            )}
        </div>
    </div>
  )
}

export default Faq