import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserSettingModal from './modal/UserSettingModal';
import styled from 'styled-components';
import {
    getMeetingData,
    postMeetingrData,
    deleteMeetingData,
    PostSimpleSettlementData,
} from '../api/api';
import BillingNameModal from './modal/BillingNameModal';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';

const Container = styled.div`
    padding: 0 20px;
    height: 100vh;
    background: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const Header = styled(motion.header)`
    padding-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const UserName = styled(motion.h1)`
    font-size: 20px;
    font-weight: 700;
    color: #191f28;
    letter-spacing: -0.3px;
`;

const SettingButton = styled(motion.button)`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const MeetingList = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 16px;
    margin-top: 32px;
    margin-bottom: 100px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const MeetingCard = styled(motion(Link))`
    padding: 20px;
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #f2f4f6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: inherit;
`;

const MeetingInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
`;

const MeetingDate = styled.span`
    font-size: 14px;
    color: #8b95a1;
    font-weight: 500;
`;

const MeetingName = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: #191f28;
    letter-spacing: -0.3px;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
    @media (max-width: 350px) {
        flex-direction: column;
    }
`;

const IconButton = styled(motion.button)`
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const AddButton = styled.div`
    position: absolute;
    bottom: 25px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: calc(100% - 40px);
    max-width: 420px;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 18px;
    justify-content: space-between;

    @media (max-width: 768px) {
        position: fixed;
    }
`;
const EmptyState = styled(motion.div)`
    margin: 20% 0;
    color: #8b95a1;
    font-size: 17px;
    font-weight: 500;
`;

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const Meeting = ({ user }) => {
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();
    const [openMenuModal, setOpenMenuModal] = useState(false);
    const [openUserSettingModal, setUserSettingModal] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);

    const handleGetData = async () => {
        try {
            const responseGetData = await getMeetingData('meeting');
            setMeetings(responseGetData.data);
        } catch (error) {
            console.log('Api 데이터 불러오기 실패');
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {
        if (!openMenuModal) {
            handleGetData();
        }
    }, [openMenuModal]);

    const handleAddBilling = async (meetingType) => {
        try {
            if (meetingType === 'simple') {
                const responseSimple = await PostSimpleSettlementData();
                if (responseSimple.status === 201) {
                    handleGetData();
                    const responseHeaders =
                        responseSimple.headers.get('Location');
                    const meetingId = responseHeaders.split('/').pop();
                    navigate(`/simple-settlement/${meetingId}`);
                }
            } else if (meetingType === 'billing') {
                const responseMeeting = await postMeetingrData('meeting');
                if (responseMeeting.status === 201) {
                    handleGetData();
                    const responseHeaders =
                        responseMeeting.headers.get('Location');
                    navigate(`/${responseHeaders}`);
                }
            }
        } catch (error) {
            console.log('Api 데이터 보내기 실패');
        }
    };

    const handelDeleteBilling = async (meetingid) => {
        try {
            await deleteMeetingData(meetingid);
            setMeetings(meetings.filter((data) => data.id !== meetingid));
        } catch (error) {
            console.log('Api 데이터 삭제 실패');
        }
    };

    return (
        <Container>
            <Header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <UserName>{user.name}님의 모임 👋</UserName>
                <SettingButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserSettingModal(true)}
                >
                    <img
                        src="/images/Setting.png"
                        alt="설정"
                        width="24"
                        onClick={() => setUserSettingModal(true)}
                    />
                </SettingButton>
                {openUserSettingModal && (
                    <UserSettingModal
                        setUserSettingModal={setUserSettingModal}
                    />
                )}
            </Header>
            <MeetingList
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <AnimatePresence>
                    {meetings.length > 0 ? (
                        meetings.map((meeting) => (
                            <MeetingCard
                                key={meeting.id}
                                to={
                                    meeting.is_simple
                                        ? `/simple-settlement/${meeting.id}`
                                        : `/meeting/${meeting.id}`
                                }
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MeetingInfo>
                                    <div className="flex items-center gap-2">
                                        {' '}
                                        <MeetingDate>
                                            {meeting.date}
                                        </MeetingDate>
                                        {meeting.is_simple === false ? (
                                            <div className="bg-main-blue rounded-lg px-2 py-1 flex items-center">
                                                <span className="text-white font-base text-[10px]">
                                                    모임 목록
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="bg-yellow-200 rounded-lg px-2 py-1 flex items-center">
                                                <span className="text-yellow-800 font-base text-[10px]">
                                                    간편 정산
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <MeetingName>
                                        {truncate(meeting.name, 13)}
                                    </MeetingName>
                                </MeetingInfo>
                                <ActionButtons>
                                    <IconButton
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpenMenuModal(true);
                                            setSelectedMeetingId(meeting.id);
                                        }}
                                    >
                                        <AiOutlineEdit size={20} />
                                    </IconButton>
                                    <IconButton
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handelDeleteBilling(meeting.id);
                                        }}
                                    >
                                        <RiDeleteBinLine size={20} />
                                    </IconButton>
                                </ActionButtons>
                            </MeetingCard>
                        ))
                    ) : (
                        <EmptyState
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>아직 등록된 모임이 없어요</p>
                            <p>새로운 모임을 시작해보세요 ✨</p>
                        </EmptyState>
                    )}
                </AnimatePresence>
            </MeetingList>

            {openMenuModal && selectedMeetingId && (
                <BillingNameModal
                    setOpenMenuModal={setOpenMenuModal}
                    MainMeetingId={selectedMeetingId}
                    MainMeetingName={
                        meetings.find((m) => m.id === selectedMeetingId)?.name
                    }
                />
            )}
            <AddButton>
                <button
                    onClick={() => handleAddBilling('billing')}
                    className="w-full shadow-sm p-3 font-medium bg-main-blue text-sm text-white rounded-3xl"
                >
                    새로운 모임 만들기
                </button>
                <button
                    onClick={() => handleAddBilling('simple')}
                    className="w-full shadow-sm p-3 font-medium bg-main-blue text-sm text-white rounded-3xl"
                >
                    간편 정산 만들기
                </button>
            </AddButton>
        </Container>
    );
};

export default Meeting;
