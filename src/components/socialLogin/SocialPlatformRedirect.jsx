import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/env';
import { Redirect } from './SocialRedirectApi';

const GooglesRedirect = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = queryParams.get('access_token');
    const apiUrl = `${API_BASE_URL}/user/google-login`;

    return (
        <>
            <Redirect
                type={'google'}
                accessToken={accessToken}
                apiUrl={apiUrl}
                navigate={navigate}
            />
        </>
    );
};

const NaverRedirect = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('code');
    const apiUrl = `${API_BASE_URL}/user/naver-login`;

    return (
        <>
            <Redirect
                type={'naver'}
                accessToken={accessToken}
                apiUrl={apiUrl}
                navigate={navigate}
            />
        </>
    );
};

const KakaoRedirect = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('code');
    const apiUrl = `${API_BASE_URL}/user/kakao-login`;

    return (
        <>
            <Redirect
                type={'kakao'}
                accessToken={accessToken}
                apiUrl={apiUrl}
                navigate={navigate}
            />
        </>
    );
};

export { KakaoRedirect, NaverRedirect, GooglesRedirect };
