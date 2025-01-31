import React, { useState, useEffect } from 'react';
import Header from '@/components/simpleSettlement/Header';
import MeetingDetailsInput from '@/components/simpleSettlement/MeetingDetailsInput';
import MemberCount from '@/components/SimpleSettlement/MemberCount';
import { useParams } from 'react-router-dom';
import TossRemittance from '@/components/remittance/TossRemittance';
import KakaoRemittance from '@/components/remittance/KakaoRemittance';
import KakaoShare from '@/components/share/KakaoShare';
import BillingResultShare from '@/components/share/BillingResultShare';
import { PatchSimpleSettlementData, getSimpleSettlementData } from '@/api/api';
import SimpleSettlementResult from '@/components/simpleSettlement/SimpleSettlementResult';

const SimpleSettlement = () => {
    const { meetingId } = useParams();
    const [patchMeetingData, setPatchMeetingData] = useState({
        name: '',
        date: new Date(),
        simple_price: '',
        simple_member_count: 0,
    });
    const [meetingData, setMeetingData] = useState(null);
    const [tossModalOpen, setTossModalOpen] = useState(false);
    const [kakaoModalOpen, setKakaoModalOpen] = useState(false);
    const [toastPopUp, setToastPopUp] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleMeetingDate = (date) => {
        setPatchMeetingData({ ...patchMeetingData, date: date });
        setCalendarOpen(false);
    };

    const handleMemberCount = (count) => {
        setPatchMeetingData({
            ...patchMeetingData,
            simple_member_count: count,
        });
    };

    const handleSimpleSettlement = async () => {
        try {
            await PatchSimpleSettlementData(meetingId, patchMeetingData);
            handleGetSimpleSettlement();
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetSimpleSettlement = async () => {
        try {
            const response = await getSimpleSettlementData(meetingId);
            setPatchMeetingData({
                name: response.data.name,
                simple_price: response.data.simple_price,
                simple_member_count:
                    response.data.simple_member_count === null
                        ? 0
                        : response.data.simple_member_count,
                date: response.data.date,
            });
            setMeetingData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!kakaoModalOpen && !tossModalOpen) {
            handleGetSimpleSettlement();
        }
    }, [kakaoModalOpen, tossModalOpen]);

    return (
        <>
            <Header
                meetingDate={patchMeetingData.date}
                handleMeetingDate={handleMeetingDate}
                calendarOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
            />
            <MeetingDetailsInput
                meetingData={patchMeetingData}
                setMeetingData={setPatchMeetingData}
            />
            <MemberCount
                value={patchMeetingData.simple_member_count}
                handleMemberCount={handleMemberCount}
            />
            <section className="px-6 mt-5">
                <button
                    onClick={handleSimpleSettlement}
                    className="w-full py-2 bg-main-blue text-lg font-bold text-white rounded-md"
                >
                    완료
                </button>
            </section>
            <p className="mt-8 text-gray-400 font-bold text-sm">
                간편 정산 결과를 확인해 볼까요?
            </p>
            <SimpleSettlementResult meetingData={meetingData} />
            <div className="text-center mt-8 p-3 bg-blue-50 rounded-lg mx-6">
                <span className="text-xs font-bold text-[#3182f6]">
                    한 번만 설정하면, 언제든 클릭 한 번으로 돈이 바로
                    들어와요!👇🏻
                </span>
            </div>
            <section className="flex flex-col justify-center items-center gap-5 px-6 mt-6">
                <TossRemittance
                    meetingName={meetingData}
                    tossModalOpen={tossModalOpen}
                    setTossModalOpen={setTossModalOpen}
                />
                <KakaoRemittance
                    meetingName={meetingData}
                    kakaoModalOpen={kakaoModalOpen}
                    setKakaoModalOpen={setKakaoModalOpen}
                />
            </section>
            <section className="flex justify-center items-center gap-5 py-10">
                <KakaoShare meetingName={meetingData} />
                <BillingResultShare meetingName={meetingData} />
            </section>
        </>
    );
};

export default SimpleSettlement;
