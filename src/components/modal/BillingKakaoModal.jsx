import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useParams } from 'react-router-dom';
import {
    PatchBillingUserKaKaoDeposit,
    PatchBillingMeetingKakaoDeposit,
} from '../../api/api';
import KakaoIdExplain from './KakaoIdExplain';
import { motion } from 'framer-motion';

const BillingResultContainer = styled.div`
    z-index: 10;
    position: absolute;
`;

const WrapperModal = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled(motion.div)`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    max-width: 360px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 24px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
`;

const ModalTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

const ModalClose = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    background: none;
    border: none;
    color: #666;
    font-size: 18px;
    cursor: pointer;
`;
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #555;
`;

const InputBox = styled.div`
    width: 100%;
    height: 44px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    display: flex;
    align-items: center;

    &:focus-within {
        border-color: #fee500;
    }
`;

const Input = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    padding: 0 12px;
    font-size: 14px;
    color: #333;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #999;
    }
`;

const ActionButton = styled.button`
    width: 100%;
    height: 40px;
    background: ${(props) => (props.primary ? '#fee500' : '#f5f5f5')};
    color: ${(props) => (props.primary ? '#333' : '#666')};
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.primary ? '#f9ca24' : '#eee')};
    }
`;
const InfoMessage = styled.div`
    padding: 16px;
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #856404;
    text-align: center;
    line-height: 1.4;
`;

const HelpSection = styled.div`
    text-align: center;
    cursor: pointer;
`;

const HelpText = styled.span`
    color: #007bff;
    font-size: 13px;
    text-decoration: underline;
`;

const DeleteButton = styled.button`
    padding: 6px 12px;
    background: #f5f5f5;
    color: #666;
    border: none;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
`;

const BillingKakaoModal = ({ setKakaoModalOpen, meetingName }) => {
    const ref = useRef();
    const { meetingId } = useParams();
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        kakao_deposit_id:
            meetingName.kakao_deposit_information.kakao_deposit_id,
    });

    const handlePutBankData = async (e, action) => {
        e.preventDefault();
        try {
            if (action === '이번에만 사용하기') {
                const responsePostData = await PatchBillingMeetingKakaoDeposit(
                    meetingId,
                    formData,
                );
                if (responsePostData.status === 200) {
                    setKakaoModalOpen(false);
                }
            } else if (action === '계속해서 사용하기') {
                await PatchBillingUserKaKaoDeposit(formData);
                const responsePostData = await PatchBillingMeetingKakaoDeposit(
                    meetingId,
                    formData,
                );
                if (responsePostData.status === 200) {
                    setKakaoModalOpen(false);
                }
            } else if (action === '입금 정보 초기화') {
                const nullFormData = { kakao_deposit_id: null };
                await PatchBillingUserKaKaoDeposit(nullFormData);
                const responsePostData = await PatchBillingMeetingKakaoDeposit(
                    meetingId,
                    nullFormData,
                );
                if (responsePostData.status === 200) {
                    setKakaoModalOpen(false);
                }
            }
        } catch (error) {
            console.log('Api 데이터 수정 실패');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (value === '') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: null,
            }));
        } else {
            const lastSlashIndex = value.split('/');
            const extractedString = lastSlashIndex[lastSlashIndex.length - 1];
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: extractedString,
            }));
        }
    };
    const handleIdDelete = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            kakao_deposit_id: null,
        }));
    };

    const handleModalOpen = (e) => {
        setModalOpen(true);
    };

    useOnClickOutside(ref, () => {
        setKakaoModalOpen(false);
    });

    const handleKakaoModalClose = (e) => {
        e.stopPropagation();
        setKakaoModalOpen(false);
    };

    return (
        <BillingResultContainer>
            <WrapperModal>
                <Modal ref={ref}>
                    <ModalHeader>
                        <ModalTitle>카카오페이 송금 설정</ModalTitle>
                        <ModalClose onClick={handleKakaoModalClose}>
                            ×
                        </ModalClose>
                    </ModalHeader>

                    <InfoMessage>
                        링크로 공유할 때 해당 아이디로 카카오페이 송금하기
                        기능이 추가됩니다.🚀
                    </InfoMessage>

                    <FormContainer onSubmit={handlePutBankData}>
                        <InputGroup>
                            <Label>카카오페이 송금 링크</Label>
                            <InputBox>
                                <Input
                                    type="text"
                                    name="kakao_deposit_id"
                                    value={formData.kakao_deposit_id || ''}
                                    placeholder="카카오페이 송금 링크를 입력해주세요"
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onTouchMove={(e) => e.preventDefault()}
                                />
                            </InputBox>
                        </InputGroup>

                        <HelpSection onClick={handleModalOpen}>
                            <HelpText>카카오페이 송금 링크란?</HelpText>
                        </HelpSection>

                        {modalOpen && (
                            <KakaoIdExplain setModalOpen={setModalOpen} />
                        )}

                        <DeleteButton
                            type="submit"
                            onClick={(e) =>
                                handlePutBankData(e, '입금 정보 초기화')
                            }
                        >
                            정보 초기화
                        </DeleteButton>

                        <ActionButton
                            type="submit"
                            onClick={(e) =>
                                handlePutBankData(e, '이번에만 사용하기')
                            }
                        >
                            이번에만 사용하기
                        </ActionButton>

                        <ActionButton
                            type="submit"
                            primary
                            onClick={(e) =>
                                handlePutBankData(e, '계속해서 사용하기')
                            }
                        >
                            계속해서 사용하기
                        </ActionButton>
                    </FormContainer>
                </Modal>
            </WrapperModal>
        </BillingResultContainer>
    );
};

export default BillingKakaoModal;
