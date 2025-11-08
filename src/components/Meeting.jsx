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
import { sendEventToAmplitude } from '@/utils/amplitude';

const Container = styled.div`
    padding: 0 20px;
    height: 100vh;
    background: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const Header = styled(motion.header)`
    padding: 20px 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
`;

const UserName = styled(motion.h1)`
    font-size: 20px;
    font-weight: 700;
    color: #191f28;
    letter-spacing: -0.3px;
`;

const SettingButton = styled(motion.button)`
    width: 48px;
    height: 48px;
    border-radius: 16px;
    border: none;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #ffffff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
`;

const MeetingList = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 24px;
    margin-top: 10px;
    margin-bottom: 100px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 8px;
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    margin-bottom: 4px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #191f28;
    letter-spacing: -0.3px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const SectionBadge = styled.span`
    background: ${(props) => props.bgColor || '#f1f3f5'};
    color: ${(props) => props.textColor || '#495057'};
    font-size: 13px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 20px;
    min-width: 24px;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

const SectionCards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MeetingCard = styled(motion(Link))`
    padding: 20px 24px;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #e6e6e666;

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #3182f6 0%, #00d2ff 100%);
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    }
`;

const MeetingInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex: 1;
`;

const MeetingHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const MeetingDate = styled.span`
    font-size: 13px;
    color: #8b95a1;
    font-weight: 500;
    letter-spacing: -0.2px;
`;

const MeetingTag = styled.span`
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 8px;
    letter-spacing: -0.1px;
    background: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
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
        gap: 6px;
    }
`;

const IconButton = styled(motion.button)`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: #6c757d;

    &:hover {
        background: #e9ecef;
        transform: translateY(-1px);
        color: #495057;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    }

    &:first-child:hover {
        background: #e3f2fd;
        color: #1976d2;
    }

    &:last-child:hover {
        background: #ffebee;
        color: #d32f2f;
    }
`;

const AddButton = styled.div`
    position: absolute;
    bottom: 32px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: calc(100% - 40px);
    max-width: 420px;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;

    @media (max-width: 768px) {
        position: fixed;
        bottom: 24px;
    }
`;

const StyledButton = styled(motion.button)`
    flex: 1;
    padding: 16px 20px;
    border: none;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.3px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

    &:active {
        transform: translateY(1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
`;

const PrimaryButton = styled(StyledButton)`
    background: linear-gradient(135deg, #3182f6 0%, #1d4ed8 100%);
    color: #ffffff;

    &:hover {
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(49, 130, 246, 0.3);
    }
`;

const SecondaryButton = styled(StyledButton)`
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #ffffff;

    &:hover {
        background: linear-gradient(135deg, #e5890b 0%, #c2680a 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
    }
`;

const EmptyState = styled(motion.div)`
    margin: 15% 0;
    text-align: center;
    padding: 48px 24px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);

    p {
        color: #6c757d;
        font-size: 16px;
        font-weight: 500;
        margin: 8px 0;
        line-height: 1.5;
        letter-spacing: -0.2px;

        &:first-child {
            font-size: 18px;
            font-weight: 600;
            color: #495057;
        }
    }
`;

const SectionEmptyState = styled.div`
    padding: 32px 24px;
    text-align: center;
    color: #adb5bd;
    font-size: 14px;
    font-weight: 500;
    background: #ffffff;
    border-radius: 12px;
    border: 2px dashed #dee2e6;
    letter-spacing: -0.2px;
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

    // 모임 목록과 간편 정산 분리
    const regularMeetings = meetings.filter((meeting) => !meeting.is_simple);
    const simpleMeetings = meetings.filter((meeting) => meeting.is_simple);

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
                    sendEventToAmplitude('create new meeting', '');
                    navigate(`/simple-settlement/${meetingId}`);
                }
            } else if (meetingType === 'billing') {
                const responseMeeting = await postMeetingrData('meeting');
                if (responseMeeting.status === 201) {
                    handleGetData();
                    const responseHeaders =
                        responseMeeting.headers.get('Location');
                    sendEventToAmplitude('create new simpleSettlement', '');
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
                        <>
                            {/* 모임 목록 섹션 */}
                            <SectionContainer>
                                <SectionHeader>
                                    <SectionTitle>💼 모임 목록</SectionTitle>
                                    <SectionBadge
                                        bgColor="#dbeafe"
                                        textColor="#1d4ed8"
                                    >
                                        {regularMeetings.length}
                                    </SectionBadge>
                                </SectionHeader>
                                <SectionCards>
                                    {regularMeetings.length > 0 ? (
                                        regularMeetings.map((meeting) => (
                                            <MeetingCard
                                                key={meeting.id}
                                                to={`/meeting/${meeting.id}`}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <MeetingInfo>
                                                    <MeetingHeader>
                                                        <MeetingDate>
                                                            {meeting.date}
                                                        </MeetingDate>
                                                        <MeetingTag
                                                            bgColor="#dbeafe"
                                                            textColor="#1d4ed8"
                                                        >
                                                            모임 목록
                                                        </MeetingTag>
                                                    </MeetingHeader>
                                                    <MeetingName>
                                                        {truncate(
                                                            meeting.name,
                                                            15,
                                                        )}
                                                    </MeetingName>
                                                </MeetingInfo>
                                                <ActionButtons>
                                                    <IconButton
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setOpenMenuModal(
                                                                true,
                                                            );
                                                            setSelectedMeetingId(
                                                                meeting.id,
                                                            );
                                                        }}
                                                    >
                                                        <AiOutlineEdit
                                                            size={20}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handelDeleteBilling(
                                                                meeting.id,
                                                            );
                                                        }}
                                                    >
                                                        <RiDeleteBinLine
                                                            size={20}
                                                        />
                                                    </IconButton>
                                                </ActionButtons>
                                            </MeetingCard>
                                        ))
                                    ) : (
                                        <SectionEmptyState>
                                            아직 등록된 모임이 없어요
                                        </SectionEmptyState>
                                    )}
                                </SectionCards>
                            </SectionContainer>

                            {/* 간편 정산 섹션 */}
                            <SectionContainer>
                                <SectionHeader>
                                    <SectionTitle>⚡ 간편 정산</SectionTitle>
                                    <SectionBadge
                                        bgColor="#fef3c7"
                                        textColor="#d97706"
                                    >
                                        {simpleMeetings.length}
                                    </SectionBadge>
                                </SectionHeader>
                                <SectionCards>
                                    {simpleMeetings.length > 0 ? (
                                        simpleMeetings.map((meeting) => (
                                            <MeetingCard
                                                key={meeting.id}
                                                to={`/simple-settlement/${meeting.id}`}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <MeetingInfo>
                                                    <MeetingHeader>
                                                        <MeetingDate>
                                                            {meeting.date}
                                                        </MeetingDate>
                                                        <MeetingTag
                                                            bgColor="#fef3c7"
                                                            textColor="#d97706"
                                                        >
                                                            간편 정산
                                                        </MeetingTag>
                                                    </MeetingHeader>
                                                    <MeetingName>
                                                        {truncate(
                                                            meeting.name,
                                                            15,
                                                        )}
                                                    </MeetingName>
                                                </MeetingInfo>
                                                <ActionButtons>
                                                    <IconButton
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setOpenMenuModal(
                                                                true,
                                                            );
                                                            setSelectedMeetingId(
                                                                meeting.id,
                                                            );
                                                        }}
                                                    >
                                                        <AiOutlineEdit
                                                            size={20}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        whileTap={{
                                                            scale: 0.9,
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handelDeleteBilling(
                                                                meeting.id,
                                                            );
                                                        }}
                                                    >
                                                        <RiDeleteBinLine
                                                            size={20}
                                                        />
                                                    </IconButton>
                                                </ActionButtons>
                                            </MeetingCard>
                                        ))
                                    ) : (
                                        <SectionEmptyState>
                                            아직 간편 정산이 없어요
                                        </SectionEmptyState>
                                    )}
                                </SectionCards>
                            </SectionContainer>
                        </>
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
                <PrimaryButton
                    onClick={() => handleAddBilling('billing')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                >
                    💼 새로운 모임 만들기
                </PrimaryButton>
                <SecondaryButton
                    onClick={() => handleAddBilling('simple')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                >
                    ⚡ 간편 정산 만들기
                </SecondaryButton>
            </AddButton>
        </Container>
    );
};

export default Meeting;
