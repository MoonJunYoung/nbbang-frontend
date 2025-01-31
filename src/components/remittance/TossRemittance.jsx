import React from 'react';
import BillingTossModal from '../modal/BillingTossModal';

const TossRemittance = ({ meetingName, tossModalOpen, setTossModalOpen }) => {
    return (
        <div
            onClick={() => setTossModalOpen(true)}
            className="bg-[#1849fd] border border-[#1849fd] relative w-[180px] h-[63px] rounded-[10px]"
        >
            <img
                className="absolute w-[45px] top-[8px] left-[20px]"
                alt="toss"
                src="/images/Toss.png"
            />
            <button className="pl-7 text-xs w-[170px] h-[37px] bg-[#1849fd] border border-[#1849fd] text-white rounded-[10px] font-semibold cursor-pointer">
                토스 입금 계좌
            </button>
            {meetingName &&
            meetingName.toss_deposit_information &&
            meetingName.toss_deposit_information.bank !== null ? (
                <div className="flex gap-1 justify-center items-center">
                    <p className="text-xs text-white font-bold">
                        {meetingName.toss_deposit_information.bank}
                    </p>
                    <p className="text-xs text-white">
                        {meetingName.toss_deposit_information.account_number}
                    </p>
                </div>
            ) : (
                <p className="font-bold text-xs text-white">등록하기</p>
            )}
            {tossModalOpen && (
                <BillingTossModal
                    setTossModalOpen={setTossModalOpen}
                    meetingName={meetingName}
                />
            )}
        </div>
    );
};

export default TossRemittance;
