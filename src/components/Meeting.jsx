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
    padding: 20px 0 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
`;

const HeaderTop = styled.div`
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

const FilterTabs = styled.div`
    display: flex;
    gap: 8px;
    padding-bottom: 15px;
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const FilterTab = styled(motion.button)`
    padding: 10px 16px;
    border-radius: 12px;
    border: none;
    background: ${(props) => (props.active ? '#3182f6' : '#f1f3f5')};
    color: ${(props) => (props.active ? '#ffffff' : '#6b7684')};
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover {
        background: ${(props) => (props.active ? '#2870ea' : '#e9ecef')};
    }

    &:active {
        transform: scale(0.98);
    }
`;

const FilterCount = styled.span`
    background: ${(props) =>
        props.active ? 'rgba(255,255,255,0.2)' : '#dee2e6'};
    color: ${(props) => (props.active ? '#ffffff' : '#495057')};
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
`;

const MeetingList = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 8px;
    margin-top: 10px;
    margin-bottom: 100px;
    &::-webkit-scrollbar {
        display: none;
    }
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

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const Meeting = ({ user }) => {
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();
    const [openMenuModal, setOpenMenuModal] = useState(false);
    const [openUserSettingModal, setUserSettingModal] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'regular', 'simple'

    // 모임 목록과 간편 정산 분리
    const regularMeetings = meetings.filter((meeting) => !meeting.is_simple);
    const simpleMeetings = meetings.filter((meeting) => meeting.is_simple);

    // 필터에 따른 표시할 목록
    const getDisplayMeetings = () => {
        if (activeFilter === 'regular') return regularMeetings;
        if (activeFilter === 'simple') return simpleMeetings;
        return meetings; // 'all'
    };

    const displayMeetings = getDisplayMeetings();

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

    const renderMeetingCard = (meeting) => {
        const isSimple = meeting.is_simple;
        const linkTo = isSimple
            ? `/simple-settlement/${meeting.id}`
            : `/meeting/${meeting.id}`;
        const tagBg = isSimple ? '#fef3c7' : '#dbeafe';
        const tagColor = isSimple ? '#d97706' : '#1d4ed8';
        const tagText = isSimple ? '간편정산' : '모임정산';

        return (
            <MeetingCard
                key={meeting.id}
                to={linkTo}
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
                        <MeetingDate>{meeting.date}</MeetingDate>
                        <MeetingTag bgColor={tagBg} textColor={tagColor}>
                            {tagText}
                        </MeetingTag>
                    </MeetingHeader>
                    <MeetingName>{truncate(meeting.name, 15)}</MeetingName>
                </MeetingInfo>
                <ActionButtons>
                    <IconButton
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedMeetingId(meeting.id);
                            setOpenMenuModal(true);
                        }}
                    >
                        <AiOutlineEdit size={18} />
                    </IconButton>
                    <IconButton
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            handelDeleteBilling(meeting.id);
                        }}
                    >
                        <RiDeleteBinLine size={18} />
                    </IconButton>
                </ActionButtons>
            </MeetingCard>
        );
    };

    return (
        <Container>
            <Header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <HeaderTop>
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
                </HeaderTop>

                <FilterTabs>
                    <FilterTab
                        active={activeFilter === 'all'}
                        onClick={() => setActiveFilter('all')}
                        whileTap={{ scale: 0.98 }}
                    >
                        전체
                        <FilterCount active={activeFilter === 'all'}>
                            {meetings.length}
                        </FilterCount>
                    </FilterTab>
                    <FilterTab
                        active={activeFilter === 'regular'}
                        onClick={() => setActiveFilter('regular')}
                        whileTap={{ scale: 0.98 }}
                    >
                        모임정산
                        <FilterCount active={activeFilter === 'regular'}>
                            {regularMeetings.length}
                        </FilterCount>
                    </FilterTab>
                    <FilterTab
                        active={activeFilter === 'simple'}
                        onClick={() => setActiveFilter('simple')}
                        whileTap={{ scale: 0.98 }}
                    >
                        간편정산
                        <FilterCount active={activeFilter === 'simple'}>
                            {simpleMeetings.length}
                        </FilterCount>
                    </FilterTab>
                </FilterTabs>
            </Header>
            <MeetingList
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <AnimatePresence mode="wait">
                    {meetings.length > 0 ? (
                        <motion.div
                            key={activeFilter}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            {displayMeetings.length > 0 ? (
                                displayMeetings.map((meeting) =>
                                    renderMeetingCard(meeting),
                                )
                            ) : (
                                <EmptyState
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p>
                                        {activeFilter === 'regular'
                                            ? '아직 모임정산이 없어요'
                                            : '아직 간편정산이 없어요'}
                                    </p>
                                    <p>새로운 정산을 시작해보세요 ✨</p>
                                </EmptyState>
                            )}
                        </motion.div>
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
