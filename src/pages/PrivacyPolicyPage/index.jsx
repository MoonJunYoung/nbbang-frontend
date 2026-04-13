import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/common/Logo';

const PrivacyPolicyContainer = styled.div`
    text-align: start;
    padding: 10px;
`;

/** Google Play 콘솔·스토어 등록 정보와 동일하게 유지 (검수 시 일치 필요) */
const GOOGLE_PLAY_APP_TITLE = '엔빵 - 빠른 정산, 원클릭 송금';
const GOOGLE_PLAY_DEVELOPER_NAME = '문준영';
const GOOGLE_PLAY_PACKAGE_NAME = 'nbbang.middle';

const PrivacyPolicyPage = () => {
    return (
        <PrivacyPolicyContainer>
            <Logo />
            <h1>개인정보처리방침</h1>
            <p>
                본 방침은 Google Play 스토어에 등록된 모바일 앱
                「{GOOGLE_PLAY_APP_TITLE}」(애플리케이션 ID:{' '}
                {GOOGLE_PLAY_PACKAGE_NAME}) 및 이와 연계된 웹 서비스에
                적용됩니다.
            </p>
            <p>
                개인정보 처리에 관한 책임 주체 및 Google Play에 표시된
                개발자명은 「{GOOGLE_PLAY_DEVELOPER_NAME}」입니다(이하
                「개발자」).
            </p>
            <p>
                개발자는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등
                관련 법령을 준수합니다.
            </p>
            <h2>1. 수집하는 개인정보 항목</h2>
            <p>개발자는 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
            <ul>
                <li>필수항목: 아이디, 비밀번호, 이름(닉네임)</li>
                <li>선택항목: 은행명, 계좌번호, 카카오 입금 ID</li>
            </ul>
            <h2>2. 개인정보 수집 방법</h2>
            <ul>
                <li>앱 회원가입 과정</li>
                <li>서비스 이용 과정에서 이용자가 직접 입력</li>
            </ul>
            <h2>3. 개인정보 이용 목적</h2>
            <p>수집한 개인정보는 다음 목적에 사용됩니다.</p>
            <ul>
                <li>회원 식별 및 서비스 제공</li>
                <li>정산 처리 및 결과 공유</li>
                <li>고객 문의 대응</li>
            </ul>
            <h2>4. 개인정보 보유 및 이용기간</h2>
            <ul>
                <li>회원 탈퇴 시까지 보관</li>
                <li>
                    관계 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안
                    보관 후 파기
                </li>
            </ul>
            <h2>5. 개인정보 파기 절차 및 방법</h2>
            <p>① 목적 달성 후 별도 DB로 이동 후 일정 기간 보관</p>
            <p>② 이후 아래 방법으로 파기</p>
            <ul>
                <li>전자 파일: 복구 불가능한 방식으로 삭제</li>
                <li>종이 문서: 분쇄 또는 소각</li>
            </ul>
            <h2>6. 개인정보 제3자 제공</h2>
            <p>개발자는 이용자의 개인정보를 외부에 제공하지 않습니다.</p>
            <p>다만, 법령에 따른 요청이 있는 경우에는 예외로 합니다.</p>
            <h2>7. 개인정보 처리 위탁</h2>
            <p>
                개발자는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리를
                위탁합니다.
            </p>
            <ul>
                <li>수탁업체: AWS</li>
                <li>위탁업무: 서버 운영 및 데이터 저장</li>
                <li>보유기간: 회원 탈퇴 시까지</li>
            </ul>
            <h2>8. 이용자의 권리 및 행사 방법</h2>
            <p>
                이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수
                있습니다.
            </p>
            <ul>
                <li>앱 내 설정 → 정보 수정</li>
                <li>회원탈퇴 → 계정 삭제</li>
            </ul>
            <h2>9. 개인정보 자동 수집 장치</h2>
            <p>개발자는 쿠키 등 자동 수집 장치를 사용하지 않습니다.</p>
            <h2>10. 개인정보 보호책임자</h2>
            <ul>
                <li>책임자: 문준영</li>
                <li>이메일: kkunyeot0729@gmail.com</li>
                <li>전화번호: 010-4132-5957</li>
            </ul>
            <h2>11. 개인정보 변경 및 고지</h2>
            <p>
                본 방침은 법령 및 정책 변경에 따라 수정될 수 있으며, 변경 시 최소
                7일 전에 공지합니다.
            </p>
            <h2>부칙</h2>
            <p>
                본 개인정보처리방침은 2024년 5월 1일부터 시행하였으며, 2026년 4월
                13일 Google Play 스토어 등록 정보(앱명·개발자) 명시를 반영하여
                개정되었습니다.
            </p>
        </PrivacyPolicyContainer>
    );
};

export default PrivacyPolicyPage;
