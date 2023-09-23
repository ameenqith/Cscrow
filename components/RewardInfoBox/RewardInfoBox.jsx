import React, {useContext, useState} from "react";
import {Button} from "../componentsindex";
import {EscrowContext} from "../../Context/EscrowContext";

export const RewardInfoBox = ({reward, onRefresh}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        claimReward
    } = useContext(EscrowContext);
    return (
        <>
            <div
                className=" bg-white rounded-lg opacity-70 shadow-lg p-6 mb-6 lg:ml-4 lg:mr-0">
                <div className="flex justify-center">
                    <h2 className="text-2xl text-black font-semibold mb-4">
                        Reward
                    </h2>
                </div>
                <div className="mb-4">
                    <p className="text-black flex text-sm">
                        Amount: {reward.amount}
                    </p>
                </div>
                <div>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="flex">
                        {isLoading ? (
                            <div className="flex justify-center mt-4">
                                <div
                                    className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <>
                                <Button
                                    btnName="Claim"
                                    disabled={!reward.amount}
                                    handleClick={
                                        () => {
                                            {
                                                setIsLoading(true);
                                                claimReward(reward.pid).finally(
                                                    () => {
                                                        setIsLoading(false);
                                                        onRefresh()
                                                    }
                                                );
                                            }

                                        }
                                    }
                                />
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default RewardInfoBox;
