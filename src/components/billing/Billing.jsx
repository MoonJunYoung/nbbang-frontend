import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GetMeetingNameData, getMemberData } from '../../api/api';
import BillingResultShare from '../share/BillingResultShare';
import KakaoShare from '../share/KakaoShare';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/check.json';
import KakaoRemittance from '../remittance/KakaoRemittance';
import TossRemittance from '../remittance/TossRemittance';
import QRCodeModal from '../Modal/QRCodeModal';

const ResultContainar = styled.div`
    display: ${(props) => (props.paymentState ? 'flex' : 'none')};
    margin-top: 24px;
    padding: 0 20px;
    flex-direction: column;
    height: 100%;
    position: relative;
    max-width: 680px;
    margin: 24px auto;
`;
const BillingContainer = styled.div`
    width: 100%;
`;

const Member = styled.p`
    font-size: 16px;
    margin: 0;
    color: black;
    font-weight: 600;
`;

const Amount = styled.p`
    color: #272626ab;
    font-size: 14px;
    margin: 8px 0 0 0;
    font-weight: 500;
    position: relative;
`;

const LeaderBillingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const LeaderAmount = styled(Amount)`
    color: #272626ab;
    font-weight: 500;
    font-size: 14px;
    margin-top: 12px;
`;

const BillingHistory = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 14px 0;
    padding: 22px;
    background: white;
    border-bottom: 1px solid #e8f0fe;
`;

const LeaderBillingMoney = styled.span`
    font-size: 13px;
    color: #3c4043;
    margin-top: 8px;
    display: block;
`;

const BillingTopLineComent = styled.h2`
    text-align: left;
    font-size: 18px;
    font-weight: 800;
    color: #191f28;
    padding-left: 10px;
`;

const RemittanceContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 12px;
`;

const Billings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const LottieContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-left: 8px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 0 8px;
`;

const ShareContainer = styled.div`
    margin: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 100px;
`;

const Billing = ({ payment, meetingName, setMeetingName }) => {
    const { meetingId } = useParams();
    const [members, setMembers] = useState([]);
    const [paymentState, setPaymentState] = useState(false);
    const [kakaoModalOpen, setKakaoModalOpen] = useState(false);
    const [tossModalOpen, setTossModalOpen] = useState(false);

    const handleMeetingGetData = async () => {
        try {
            const response = await GetMeetingNameData(meetingId);
            setMeetingName(response.data);
        } catch (error) {
            console.log('Api 데이터 불러오기 실패');
        }
    };

    useEffect(() => {
        if (!kakaoModalOpen && !tossModalOpen) {
            handleMeetingGetData();
        }
    }, [kakaoModalOpen, tossModalOpen]);

    useEffect(() => {
        setPaymentState(payment.length > 0);
    }, [payment]);

    useEffect(() => {
        const handleGetData = async () => {
            try {
                const responseGetData = await getMemberData(meetingId);
                setMembers(responseGetData.data);
            } catch (error) {
                console.log('Api 데이터 불러오기 실패');
            }
        };
        handleGetData();
    }, [meetingId, payment]);

    return (
        <ResultContainar paymentState={paymentState}>
            <TitleContainer>
                <BillingTopLineComent>
                    정산 결과를 확인해 볼까요?
                </BillingTopLineComent>
                <LottieContainer>
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                    />
                </LottieContainer>
            </TitleContainer>
            <BillingContainer>
                {members.map((data) => (
                    <BillingHistory key={data.id}>
                        {data.leader ? (
                            <LeaderBillingContainer>
                                <Member>총무 {data.name}</Member>
                                <LeaderAmount>
                                    {data.amount > 0
                                        ? `보내야 할 돈: ${data.amount.toLocaleString()}원`
                                        : `받을 돈: ${Math.abs(data.amount).toLocaleString()}원`}
                                </LeaderAmount>
                                {members.map((value) =>
                                    value.amount < 0 &&
                                    value.leader === false ? (
                                        <LeaderBillingMoney key={value.id}>
                                            {`${value.name}님 한테 ${Math.abs(value.amount).toLocaleString()}원을 보내주세요`}
                                        </LeaderBillingMoney>
                                    ) : null,
                                )}
                            </LeaderBillingContainer>
                        ) : (
                            <Billings>
                                <Member>{data.name}</Member>
                                <Amount>
                                    {data.amount >= 0
                                        ? `총무에게 보내야 할 돈: ${data.amount.toLocaleString()}원`
                                        : `총무에게 받아야 할 돈: ${Math.abs(data.amount).toLocaleString()}원`}
                                </Amount>
                            </Billings>
                        )}
                    </BillingHistory>
                ))}
            </BillingContainer>
            <RemittanceContainer>
                <KakaoRemittance
                    meetingName={meetingName}
                    kakaoModalOpen={kakaoModalOpen}
                    setKakaoModalOpen={setKakaoModalOpen}
                />
                <TossRemittance
                    meetingName={meetingName}
                    tossModalOpen={tossModalOpen}
                    setTossModalOpen={setTossModalOpen}
                />
            </RemittanceContainer>
            <ShareContainer>
                <BillingResultShare meetingName={meetingName} />
                <KakaoShare meetingName={meetingName} />
                <div className="relative">
                    <QRCodeModal
                        url={meetingName.share_link}
                        imageSrc="/images/qricon.png"
                        className="size-8 "
                        title="QR 찍고 바로 정산 페이지 확인하세요"
                        description="한 번의 스캔으로 정산 끝!"
                        description2="톡으로 링크 보내기 귀찮을 땐 👆🏼 QR로 바로 공유"
                    />
                    <div className="text-left absolute top-[-75px] left-[-16px] text-sm bg-main-blue px-4 text-white py-2 rounded-2xl shadow-base border border-gray-300  whitespace-nowrap before:content-[''] before:absolute before:bottom-[-14px] before:left-[35px] before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-main-blue">
                        귀찮은 링크 공유 대신
                        <br /> 👉 QR 한 방에 해결
                    </div>
                </div>
            </ShareContainer>
        </ResultContainar>
    );
};
export default Billing;
