import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
    getMemberData,
    postMemberData,
    deleteMemberData,
    getPaymentData,
} from '../../api/api';
import BillingInputBox from '../common/BillingInputBox';
import BillingMemberFix from '../modal/BillingMemberFixModal';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/time.json';
import ToastPopUp from '../common/ToastPopUp';

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

const BillingMemberContainer = styled.section`
    max-width: 800px;
    margin: 0;
    padding: 24px 16px;
`;

const FormContainer = styled.form`
    margin: 32px 0;
`;

const BillingAddMember = styled.button`
    width: calc(100% - 32px);
    max-width: 760px;
    height: 48px;
    padding: 0 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.2s;
    border: none;
    background-color: #0066ff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #1b64da;
    }

    &:disabled {
        background-color: #f2f4f6;
        color: #aeb5bc;
    }
`;

const MemberContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 3fr));
    gap: 12px;
    margin-top: 24px;
    padding-bottom: 30px;
    justify-items: center;
`;

const MemberList = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    background: white;
    border-radius: 20px;
    border: 1px solid #f2f4f6;
    padding: 12px 16px;
`;

const Leader = styled.span`
    font-size: 13px;
    font-weight: 600;
`;

const Members = styled.p`
    white-space: nowrap;
    max-width: 70px;
    font-size: 14px;
    margin: 0;
    font-weight: 500;
    color: #191f28;
    cursor: pointer;
`;

const MemberDelete = styled.p`
    width: 24px;
    height: 24px;
    margin: 0;
    border-radius: 12px;
    background: #f2f4f6;
    color: #8b95a1;
    cursor: pointer;
    transition: all 0.2s;
`;

const Title = styled.h2`
    text-align: left;
    font-size: 18px;
    font-weight: 800;
    color: #191f28;
    margin-bottom: 8px;
`;

const SubTitle = styled.p`
    text-align: center;
    font-size: 14px;
    color: #8b95a1;
    margin-bottom: 24px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    input {
        width: 100%;
        padding: 8px 36px 8px 0;
        border: none;
        border-radius: 0px;
        border-bottom: 2px solid #3182f6;
        outline: none;
        font-size: 14px;

        &::placeholder {
            color: #aeb5bc;
        }
    }
`;

const ClearButton = styled.button`
    position: absolute;
    right: 0;
    background: none;
    border: none;
    color: #aeb5bc;
    cursor: pointer;
    font-size: 20px;
    padding: 6px;

    &:hover {
        color: #8b95a1;
    }
`;

const LottieContainer = styled.div`
    width: 45px;
    height: 45px;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const BillingMember = ({ member, setMember }) => {
    const { meetingId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [memberSelected, setMemberSelected] = useState({});
    const [toastPopUp, setToastPopUp] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
    });

    const handleGetData = async () => {
        try {
            const responseGetData = await getMemberData(meetingId);
            setMember(responseGetData.data);
        } catch (error) {
            console.log('데이터를 불러오는데 실패했습니다');
        }
    };

    useEffect(() => {
        handleGetData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleClearInput = () => {
        setFormData({ name: '' });
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const leaderValue = member.length === 0;
            const updatedFormData = {
                name: formData.name,
                leader: leaderValue,
            };
            const response = await postMemberData(meetingId, updatedFormData);
            if (response.status === 201) {
                setFormData({ name: '' });
                handleGetData();
            }
        } catch (error) {
            console.log('멤버 추가에 실패했습니다');
        }
    };

    const handleDeleteMember = async (memberId) => {
        try {
            await deleteMemberData(meetingId, memberId);
            setMember(member.filter((data) => data.id !== memberId));
        } catch (error) {
            if (
                error.response?.data?.detail ===
                'the leader member cannot be deleted.'
            ) {
                setToastPopUp(true);
            } else if (
                error.response?.data?.detail ===
                'it is not possible to delete the member you want to delete because it is included in the payment.'
            ) {
                setToastPopUp(true);
            }
        }
    };

    const handleClick = (selectedMember) => {
        setMemberSelected(selectedMember);
        setOpenModal(true);
    };

    useEffect(() => {
        setNotAllow(!formData.name);
    }, [formData.name]);

    return (
        <BillingMemberContainer>
            <TitleContainer>
                <Title>
                    모임에 참석한
                    <br />
                    멤버들은 누구인가요?
                </Title>
                <LottieContainer>
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        autoplay={true}
                    />
                </LottieContainer>
            </TitleContainer>
            <FormContainer onSubmit={handleAddMember}>
                <InputWrapper>
                    <BillingInputBox
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="멤버 이름을 입력하세요"
                        maxLength="22"
                    />
                    {formData.name && (
                        <ClearButton type="button" onClick={handleClearInput}>
                            ×
                        </ClearButton>
                    )}
                </InputWrapper>
            </FormContainer>

            <SubTitle>멤버를 선택하면 수정이 가능해요!</SubTitle>
            <MemberContainer>
                {member.map((data) => (
                    <MemberList key={data.id} isLeader={data.leader}>
                        {data.leader && <Leader>⭐</Leader>}
                        <Members onClick={() => handleClick(data)}>
                            {truncate(data.name, 5)}
                        </Members>
                        <MemberDelete
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteMember(data.id);
                            }}
                        >
                            ×
                        </MemberDelete>
                    </MemberList>
                ))}
            </MemberContainer>

            {openModal && (
                <BillingMemberFix
                    {...memberSelected}
                    setOpenModal={setOpenModal}
                    handleGetData={handleGetData}
                    meetingId={meetingId}
                />
            )}

            <BillingAddMember
                type="submit"
                disabled={notAllow}
                onClick={handleAddMember}
            >
                멤버 추가하기
            </BillingAddMember>
            {toastPopUp && (
                <ToastPopUp
                    setToastPopUp={setToastPopUp}
                    message={'총무는 삭제할 수 없습니다.'}
                />
            )}
        </BillingMemberContainer>
    );
};

export default BillingMember;
