import React from 'react';
import styled from 'styled-components';

const DeleteMeetingConfirmModalContainer = styled.div`
    z-index: 10;
    position: absolute;
    width: 100%;
`;

const WrapperModal = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const Modal = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 90%;
    max-width: 400px;
    background: white;
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    animation: modalFadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1);
    padding: 32px 24px 24px;

    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;

const ModalDescription = styled.p`
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    color: #495057;
    line-height: 1.6;
    letter-spacing: -0.2px;
`;

const MeetingNameHighlight = styled.span`
    font-weight: 600;
    color: #191f28;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
`;

const CancelButton = styled.button`
    flex: 1;
    height: 48px;
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.3px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: #e9ecef;
        color: #191f28;
    }

    &:active {
        transform: scale(0.98);
    }
`;

const DeleteButton = styled.button`
    flex: 1;
    height: 48px;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.3px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);

    &:hover {
        background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(239, 68, 68, 0.35);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
    }
`;

const DeleteMeetingConfirmModal = ({ meetingName, onClose, onConfirm }) => {
    const handleWrapperClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <DeleteMeetingConfirmModalContainer>
            <WrapperModal onClick={handleWrapperClick}>
                <Modal onClick={(e) => e.stopPropagation()}>
                    <ModalDescription>
                        {meetingName ? (
                            <>
                                <MeetingNameHighlight>
                                    {meetingName}
                                </MeetingNameHighlight>
                                을(를) 삭제하시겠습니까?
                                <br />
                                삭제된 모임은 복구할 수 없습니다.
                            </>
                        ) : (
                            <>
                                이 모임을 삭제하시겠습니까?
                                <br />
                                삭제된 모임은 복구할 수 없습니다.
                            </>
                        )}
                    </ModalDescription>
                    <ButtonGroup>
                        <CancelButton type="button" onClick={onClose}>
                            취소
                        </CancelButton>
                        <DeleteButton type="button" onClick={onConfirm}>
                            삭제
                        </DeleteButton>
                    </ButtonGroup>
                </Modal>
            </WrapperModal>
        </DeleteMeetingConfirmModalContainer>
    );
};

export default DeleteMeetingConfirmModal;
