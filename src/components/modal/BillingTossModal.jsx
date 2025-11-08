import styled from 'styled-components';
import React, { useRef, useState } from 'react';
import UsersBankData from '../../mocks/UsersBankData';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useParams } from 'react-router-dom';
import {
    PatchBillingMeetingTossDeposit,
    PatchBillingUserTossDeposit,
} from '../../api/api';
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
        border-color: #1849fd;
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
    background: ${(props) => (props.primary ? '#1849fd' : '#f5f5f5')};
    color: ${(props) => (props.primary ? 'white' : '#666')};
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: ${(props) => (props.primary ? '#0f3cc9' : '#eee')};
    }
`;
const InfoMessage = styled.div`
    padding: 16px;
    background: #e3f2fd;
    border: 1px solid #90caf9;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #1565c0;
    text-align: center;
    line-height: 1.4;
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

const SelectBox = styled.div`
    width: 100%;
    height: 44px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    display: flex;
    align-items: center;
    position: relative;

    &:focus-within {
        border-color: #1849fd;
    }

    &::after {
        content: '▼';
        position: absolute;
        right: 12px;
        color: #666;
        font-size: 12px;
        pointer-events: none;
    }
`;

const StyledSelect = styled.select`
    width: 100%;
    background: transparent;
    border: none;
    padding: 0 32px 0 12px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    appearance: none;

    &:focus {
        outline: none;
    }

    option {
        padding: 8px;
        font-weight: 500;
    }
`;

const BillingTossModal = ({ setTossModalOpen, meetingName }) => {
    const ref = useRef();
    const { meetingId } = useParams();
    const [formData, setFormData] = useState({
        account_number: meetingName.toss_deposit_information.account_number,
        bank: meetingName.toss_deposit_information.bank,
    });

    const handleNumericInput = (event) => {
        // 입력된 값이 숫자가 아니면 입력을 막습니다.
        if (!/^\d*$/.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
        }
    };

    const handlePutBankData = async (e, action) => {
        e.preventDefault();
        try {
            let responsePostData;
            if (action === '이번에만 사용하기') {
                responsePostData = await PatchBillingMeetingTossDeposit(
                    meetingId,
                    formData,
                );
            } else if (action === '계속해서 사용하기') {
                await PatchBillingMeetingTossDeposit(meetingId, formData);
                responsePostData = await PatchBillingUserTossDeposit(formData);
            } else if (action === '입금 정보 초기화') {
                const nullFormData = { account_number: null, bank: null };
                await PatchBillingUserTossDeposit(nullFormData);
                responsePostData = await PatchBillingMeetingTossDeposit(
                    meetingId,
                    nullFormData,
                );
            }
            if (responsePostData && responsePostData.status === 200) {
                setTossModalOpen(false);
            }
        } catch (error) {
            console.error('Api 데이터 수정 실패', error);
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
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleBankSelect = (e) => {
        if (e.target.value === '은행선택')
            setFormData((prevFormData) => ({
                ...prevFormData,
                bank: null,
            }));
        else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                bank: e.target.value,
            }));
        }
    };

    const handleIdDelete = () => {
        setFormData({
            account_number: null,
            bank: null,
        });
    };

    useOnClickOutside(ref, () => {
        setTossModalOpen(false);
    });

    const handleTossModalClose = (e) => {
        e.stopPropagation();
        setTossModalOpen(false);
    };

    return (
        <BillingResultContainer>
            <WrapperModal>
                <Modal ref={ref}>
                    <ModalHeader>
                        <ModalTitle>토스 송금 설정</ModalTitle>
                        <ModalClose onClick={handleTossModalClose}>
                            ×
                        </ModalClose>
                    </ModalHeader>

                    <InfoMessage>
                        링크로 공유할 때 해당 계좌로 토스 송금하기 기능이
                        추가됩니다! 🏦
                    </InfoMessage>

                    <FormContainer onSubmit={handlePutBankData}>
                        <InputGroup>
                            <Label>계좌번호</Label>
                            <InputBox>
                                <Input
                                    type="text"
                                    name="account_number"
                                    value={formData.account_number || ''}
                                    placeholder="계좌번호를 입력해주세요"
                                    onChange={handleInputChange}
                                    onInput={handleNumericInput}
                                    maxLength="20"
                                    autoComplete="off"
                                    onTouchStart={(e) => e.preventDefault()}
                                    onTouchMove={(e) => e.preventDefault()}
                                />
                            </InputBox>
                        </InputGroup>

                        <InputGroup>
                            <Label>은행 선택</Label>
                            <SelectBox>
                                <StyledSelect
                                    value={
                                        formData.bank || UsersBankData[0].bank
                                    }
                                    onChange={handleBankSelect}
                                >
                                    {UsersBankData.map((bankData, index) => (
                                        <option
                                            key={index}
                                            value={bankData.bank}
                                        >
                                            {bankData.bank}
                                        </option>
                                    ))}
                                </StyledSelect>
                            </SelectBox>
                        </InputGroup>

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

export default BillingTossModal;
