import React from 'react';
import { SocialLoginForm } from './SocialLoginForm';

const OAUTH_REDIRECT_BASE =
    import.meta.env.VITE_OAUTH_REDIRECT_BASE_URL ?? 'https://nbbang.cloud';

const KakaoLogin = () => {
    const kakaoProps = {
        alt: 'Kakao',
        src: '/images/kakao.png',
        type: 'kakao',
        comment: '카카오톡 로그인으로 시작하기',
        socialLoginUrl: `https://kauth.kakao.com/oauth/authorize?client_id=d3eadf9271920afade40acd6f56ce0ee&redirect_uri=${encodeURIComponent(`${OAUTH_REDIRECT_BASE}/kakao-redirect`)}&response_type=code`,
        containerStyle: {
            backgroundColor: '#FEE500',
            borderColor: '#FEE500',
        },
        imgStyle: {
            imgWidth: '22px',
        },

        buttonStyle: {
            textColor: 'black',
            backgroundColor: '#FEE500',
            borderColor: '#FEE500',
        },
    };

    return <SocialLoginForm {...kakaoProps} />;
};

const NaverLogin = () => {
    const naverProps = {
        alt: 'Naver',
        type: 'naver',
        src: '/images/naver.png',
        comment: '네이버 로그인으로 시작하기',
        socialLoginUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=QND4X2NgUTIuoNUvS2uz&redirect_uri=${encodeURIComponent(`${OAUTH_REDIRECT_BASE}/naver-redirect`)}`,
        containerStyle: {},
        imgStyle: {
            imgWidth: '25px',
        },
        buttonStyle: {},
    };

    return <SocialLoginForm {...naverProps} />;
};

const GoogleLogin = () => {
    const googleProps = {
        alt: 'google',
        typo: 'google',
        src: '/images/google.png',
        comment: '구글 로그인으로 시작하기',
        socialLoginUrl: `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=173323459973-9k12ingpbl2mmrpnp62nauc7cns3ivs3.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(`${OAUTH_REDIRECT_BASE}/google-redirect`)}`,
        containerStyle: {
            backgroundColor: 'white',
            gapSize: '38px',
        },
        imgStyle: {
            imgWidth: '15px',
        },

        buttonStyle: {
            textColor: 'black',
            backgroundColor: 'white',
            borderColor: 'white',
        },
    };

    return <SocialLoginForm {...googleProps} />;
};

export { KakaoLogin, NaverLogin, GoogleLogin };
