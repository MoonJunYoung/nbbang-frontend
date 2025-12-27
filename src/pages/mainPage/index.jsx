import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Meeting from '../../components/Meeting';
import { getUserData, Token, postGuestLogin } from '../../api/api';
import Cookies from 'js-cookie';
import { sendEventToAmplitude, AmplitudeSetUserId } from '@/utils/amplitude';

const Container = styled.main`
    width: 100%;
    margin: auto;
`;

const MainPage = () => {
    const navigate = useNavigate();
    const authToken = Token();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!authToken) {
            console.log('토큰이 없어서 로그인 페이지로 이동');
            navigate('/signd');
        }
    }, [authToken, navigate]);

    useEffect(() => {
        fetchData();
        sendEventToAmplitude('view meeting page', '');
    }, []);

    const fetchData = async () => {
        try {
            const response = await getUserData('user');
            setUser(response.data);
        } catch (error) {
            // 401 (Unauthorized)일 때만 토큰 제거
            if (error.response && error.response.status === 401) {
                console.log('인증 토큰이 만료되었습니다.');
                Cookies.remove('authToken', { path: '/' });
                navigate('/signd');
            } else {
                // 다른 오류는 로그만 출력 (토큰 유지)
                console.log(
                    'Api 요청 실패:',
                    error.response?.status || 'Network Error',
                );
            }
        }
    };

    return (
        <Container>
            <Meeting user={user} />
        </Container>
    );
};

export default MainPage;
