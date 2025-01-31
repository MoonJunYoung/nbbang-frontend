import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import ToastPopUp from '../common/ToastPopUp';

const ShareButton = styled.div`
    display: 'flex';
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    width: 200px;
    font-size: 13px;
    height: 35px;
    border: none;
    background-color: #3182f6;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    margin: 30px 0 35px 0;
`;

const ShareIcon = styled.img`
    margin-top: 4px;
    width: 50px;
    cursor: pointer;
`;

const CopyIcon = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    img {
        margin-top: 4px;
        width: 25px;
        cursor: pointer;
    }
    span {
        font-size: 13px;
        font-weight: 800;
        color: #8b95a1;
    }
`;

const BillingResultShare = ({ meetingName }) => {
    const [toastPopUp, setToastPopUp] = useState(false);

    const getApiDataCopy = async () => {
        try {
            await navigator.clipboard.writeText(meetingName.share_link);
            setToastPopUp(true);
        } catch (error) {
            console.error('클립보드 복사 실패');
        }
    };

    const getApiDataShare = async () => {
        try {
            if (window.navigator.share) {
                await window.navigator.share({
                    text: meetingName.share_link,
                });
            } else if (
                window.ReactNativeWebView &&
                window.ReactNativeWebView.postMessage
            ) {
                const message = {
                    type: 'share',
                    content: meetingName.share_link,
                };
                window.ReactNativeWebView.postMessage(JSON.stringify(message));
            } else {
                setToastPopUp(true);
                getApiDataCopy();
            }
        } catch (error) {
            console.error('공유 API 호출 실패');
        }
    };

    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );

    return (
        <ShareButton>
            {isMobile ? (
                <ShareIcon
                    src={'/images/share.png'}
                    alt="share"
                    onClick={getApiDataShare}
                />
            ) : (
                <CopyIcon onClick={getApiDataCopy}>
                    <img src={'/images/copy.png'} alt="copy" />
                    <span>텍스트 복사</span>
                </CopyIcon>
            )}
            {toastPopUp && (
                <ToastPopUp
                    message="텍스트가 클립보드에 복사되었습니다."
                    setToastPopUp={setToastPopUp}
                />
            )}
        </ShareButton>
    );
};

export default BillingResultShare;
