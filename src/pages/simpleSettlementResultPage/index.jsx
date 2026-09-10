import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBillingResultPage } from '@/api/api';
import LoadingSpinner from '@/components/common/LodingSpinner';
import SlideCheckbox from '@/components/common/SlideCheckBox';
import ToastPopUp from '@/components/common/ToastPopUp';
import { ImageGallery } from '@/components/Modal/ImageModal';
import RemittanceQRSection from '@/components/remittance/RemittanceQRSection';

const SettlementDetail = ({ label, value, unit }) => (
    <div className="flex items-center justify-between">
        <p className="text-gray-400 font-bold">{label}</p>
        <div className="flex items-center justify-center gap-2">
            <p className="text-gray-500 font-bold">
                {value} {unit}
            </p>
            <img className="w-3" src="/images/right_arrow.png" alt="arrow" />
        </div>
    </div>
);

const SimpleSettlementResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const [openToast, setOpenToast] = useState(false);
    const meeting = searchParams.get('simple-meeting');
    const [meetingResultData, setMeetingResultData] = useState(null);
    const [tipCheck, setTipCheck] = useState(false);
    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    const isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleGetData = async () => {
        try {
            const responseGetData = await getBillingResultPage(meeting);
            setMeetingResultData(responseGetData.data.meeting);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('ko-KR').format(amount);
    };

    if (!meetingResultData) {
        return <LoadingSpinner />;
    }

    const {
        simple_price,
        simple_member_count,
        simple_member_amount,
        toss_deposit_link,
        tipped_toss_deposit_link,
        simple_tipped_member_amount,
        tipped_deposit_copy_text,
        deposit_copy_text,
        kakao_deposit_link,
        tipped_kakao_deposit_link,
    } = meetingResultData;

    if (
        simple_price === null ||
        simple_member_count === null ||
        simple_member_amount === null
    ) {
        return (
            <div className="text-center text-gray-500">
                정산 금액이 없습니다.
            </div>
        );
    }

    const DepositInformationCopy = async (text) => {
        await navigator.clipboard.writeText(text);
        if (isApple) {
            setOpenToast(true);
        }
    };

    const activeKakaoLink = tipCheck
        ? tipped_kakao_deposit_link
        : kakao_deposit_link;
    const activeTossLink = tipCheck
        ? tipped_toss_deposit_link
        : toss_deposit_link;
    const activeDepositCopyText = tipCheck
        ? tipped_deposit_copy_text
        : deposit_copy_text;
    const canRemit = simple_member_amount > 0;

    return (
        <div className="relative flex flex-col items-center h-screen">
            <img
                onClick={() => navigate('/')}
                src="/images/beck.png"
                alt="뒤로가기"
                className="w-5 z-10 absolute left-0 m-5"
            />
            <div className="h-full flex items-center">
                <ul className="font-bold text-gray-700">
                    <li className="text-2xl">
                        <strong className="text-sky-500">총무</strong>님에게
                    </li>
                    <li className="text-2xl">
                        {formatAmount(simple_member_amount)}원을
                    </li>
                    <li className="text-2xl pb-5">보내주세요</li>
                    {meetingResultData.images ? (
                        <ImageGallery images={meetingResultData.images} />
                    ) : (
                        ''
                    )}
                </ul>
            </div>
            <div className="w-full px-10">
                <div className="flex flex-col gap-4 mb-10">
                    <SettlementDetail
                        label="총 사용 금액"
                        value={formatAmount(simple_price)}
                        unit="원"
                    />
                    <SettlementDetail
                        label="총 인원"
                        value={simple_member_count}
                        unit="명"
                    />
                    <SettlementDetail
                        label="정산 금액"
                        value={
                            tipCheck
                                ? formatAmount(simple_tipped_member_amount)
                                : formatAmount(simple_member_amount)
                        }
                        unit="원"
                    />
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-400 font-bold">
                            십원단위 올림해서 보내기
                        </span>
                        <SlideCheckbox
                            type="checkbox"
                            checked={tipCheck}
                            onChange={() => setTipCheck(!tipCheck)}
                        />
                    </div>
                    {deposit_copy_text && (
                        <div
                            className="flex items-center justify-between gap-2 py-1 cursor-pointer"
                            onClick={() =>
                                DepositInformationCopy(activeDepositCopyText)
                            }
                        >
                            <span className="text-gray-400 font-bold">
                                계좌&금액 복사하기
                            </span>
                            <img
                                className="w-5"
                                src="/images/copy.png"
                                alt="copy"
                            />
                        </div>
                    )}
                </div>
                {canRemit && (activeKakaoLink || activeTossLink) && (
                    <RemittanceQRSection
                        variant="simple"
                        isMobile={isMobile}
                        kakaoLink={activeKakaoLink}
                        tossLink={activeTossLink}
                    />
                )}
                {openToast && (
                    <ToastPopUp
                        setToastPopUp={setOpenToast}
                        message={'클립보드에 복사되었어요.'}
                    />
                )}
            </div>
        </div>
    );
};

export default SimpleSettlementResultPage;
