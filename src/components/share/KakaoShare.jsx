import React, { useEffect } from 'react';
import styled from 'styled-components';

const KakaoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const KakaoShareBox = styled.div`
    display: flex;
    font-size: 13px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #ffeb3c;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    img {
        width: 30px;
    }
`;

const KakaoIcon = styled.img`
    width: 50px;
`;

const KakaoShare = ({ meetingName }) => {

    useEffect(() => {
        initKakao();
    }, [meetingName]);

    const initKakao = () => {
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                kakao.init('904f6d1fcb87f1741d5c8cfad188ffc2');
            }
        }
    };

    const shareKakao = () => {
        if (!meetingName || !meetingName.name || !meetingName.share_link) {
            console.error('Missing required meetingName properties');
            return;
        }

        window.Kakao.Link.sendDefault({
            objectType: 'text',
            text: meetingName.is_simple
                    ? `${meetingName.name}의 정산결과 입니다.
                        사용 금액 : ${meetingName.simple_price}
                        참석 인원 : ${meetingName.simple_member_count}명
                        인 당 : ${meetingName.simple_member_amount}`
                    : `${meetingName.name}의 정산결과 입니다.`,

                link: {
                    webUrl: 'https://nbbang.life/',
                    mobileWebUrl: 'https://nbbang.life/',
                },
            buttons: meetingName.is_simple
                ? [
                      meetingName.kakao_deposit_link && {
                          title: '카카오 송금',
                          link: {
                              webUrl: meetingName.kakao_deposit_link,
                              mobileWebUrl: meetingName.kakao_deposit_link,
                          },
                      },
                      meetingName.toss_deposit_link && {
                          title: '토스 송금',
                          link: {
                              webUrl: meetingName.toss_deposit_link,
                              mobileWebUrl: meetingName.toss_deposit_link,
                          },
                      },
                  ].filter(Boolean)
                : [
                      {
                          title: '정산 내역 확인하러가기',
                          link: {
                              webUrl: meetingName.share_link,
                              mobileWebUrl: meetingName.share_link,
                          },
                      },
                  ],
            installTalk: true,
        });
    };

    return (
        <KakaoContainer>
            <KakaoShareBox className="share-node" onClick={shareKakao}>
                <KakaoIcon src="/images/kakao.png" alt="카카오톡 공유" />
            </KakaoShareBox>
        </KakaoContainer>
    );
};

export default KakaoShare;
