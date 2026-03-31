import {
    SigndContainer,
    SigndBox,
    Form,
    Input,
    InputBox,
    SignInButton,
    Valid,
    AgreementContainer,
    AgreementChenckBox,
    NavBar,
    NavComent,
    NavIcon,
    AuthenticationTitleContainer,
    AuthenticationTitle,
    AuthenticationSubtitle,
    ResetButton,
    LinkStyle,
    AuthRequestContainer,
} from './AuthComponent.styled';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ToastPopUp from '../common/ToastPopUp';
import { motion, AnimatePresence } from 'framer-motion';
import { AmplitudeSetUserId, sendEventToAmplitude } from '@/utils/amplitude';

const AuthComponent = ({
    title,
    formData,
    setFormData,
    AuthApiRequest,
    additionalFields,
}) => {
    const [notAllow, setNotAllow] = useState(true);
    const [isIdentifierValid, setIsIdentifierValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [SingUpLink] = useState(false);
    const [SginAgreement, setSginAgreement] = useState(false);
    const [toastPopUp, setToastPopUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 },
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'identifier') {
            const identifierRegex = /^(?=.*[a-z])(?=.*\d).{5,}$/;
            const isValid = identifierRegex.test(value);
            setIsIdentifierValid(isValid);
        }

        if (name === 'password') {
            const passwordRegex =
                /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            const isValid = passwordRegex.test(value);
            setIsPasswordValid(isValid);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await AuthApiRequest({
                ...formData,
            });

            if (response.data) {
                console.log(
                    '로그인 성공, 토큰 저장:',
                    response.data.substring(0, 20) + '...',
                );
                Cookies.set('authToken', response.data, {
                    expires: 30,
                    path: '/',
                    sameSite: 'Strict',
                    secure: window.location.protocol === 'https:',
                });

                // 토큰이 제대로 저장되었는지 확인
                const savedToken = Cookies.get('authToken');
                console.log(
                    '저장된 토큰 확인:',
                    savedToken ? '토큰 저장됨' : '토큰 저장 실패',
                );

                await AmplitudeSetUserId();
                sendEventToAmplitude('complete auth', '');
                navigate('/');
            }
        } catch (error) {
            console.error('Auth error:', error.response);
            setToastPopUp(true);
            setIsLoading(false);
        }
    };

    const handleReset = (name) => {
        setFormData({
            ...formData,
            [name]: '',
        });

        if (name === 'identifier') {
            setIsIdentifierValid(false);
        }

        if (name === 'password') {
            setIsPasswordValid(false);
        }
    };

    useEffect(() => {
        if (title === '회원가입') {
            if (isIdentifierValid && isPasswordValid && SginAgreement) {
                setNotAllow(false);
                return;
            }
            setNotAllow(true);
        } else if (title === '로그인') {
            if (isIdentifierValid && isPasswordValid) {
                setNotAllow(false);
                return;
            }
            setNotAllow(true);
        }
    }, [title, isIdentifierValid, isPasswordValid, SginAgreement]);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
        >
            <NavBar>
                <motion.div>
                    <Link
                        to="/signd"
                        style={{
                            position: 'absolute',
                            top: '14px',
                            left: '10px',
                        }}
                    >
                        <NavIcon alt="beck" src="/images/beck.png" />
                    </Link>
                </motion.div>
                <NavComent>{title}</NavComent>
            </NavBar>
            <div style={{ margin: '0px 20px 20px 20px' }}>
                <AnimatePresence>
                    {title === '회원가입' && (
                        <motion.div variants={itemVariants}>
                            <AuthenticationTitleContainer>
                                <AuthenticationTitle>
                                    반갑습니다😃
                                </AuthenticationTitle>
                                <AuthenticationTitle>
                                    이름을 알려주세요
                                </AuthenticationTitle>
                                <AuthenticationSubtitle>
                                    별명이나 애칭도 좋아요
                                </AuthenticationSubtitle>
                            </AuthenticationTitleContainer>
                        </motion.div>
                    )}
                </AnimatePresence>
                {additionalFields.map((field) => (
                    <motion.div key={field.name} variants={itemVariants}>
                        <InputBox>
                            <Input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                autoComplete="off"
                                placeholder={field.placeholder}
                            />
                            <ResetButton
                                onClick={() => handleReset(field.name)}
                            >
                                X
                            </ResetButton>
                        </InputBox>
                    </motion.div>
                ))}
                <SigndContainer>
                    <motion.div variants={itemVariants}>
                        <AuthenticationTitleContainer>
                            <AuthenticationTitle>
                                아이디와 비밀번호를
                            </AuthenticationTitle>
                            <AuthenticationTitle>
                                입력해주세요
                            </AuthenticationTitle>
                        </AuthenticationTitleContainer>
                    </motion.div>
                    <SigndBox>
                        <Form onSubmit={handleSubmit}>
                            <motion.div variants={itemVariants}>
                                <InputBox>
                                    <Input
                                        type="text"
                                        name="identifier"
                                        value={formData.identifier}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        placeholder=" 아이디를 입력해주세요"
                                    />
                                    <ResetButton
                                        onClick={() =>
                                            handleReset('identifier')
                                        }
                                    >
                                        X
                                    </ResetButton>
                                </InputBox>
                                <AnimatePresence>
                                    {!isIdentifierValid &&
                                        formData.identifier.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <Valid>
                                                    소문자, 숫자를 포함하고 최소
                                                    5자 이상 이어야합니다
                                                </Valid>
                                            </motion.div>
                                        )}
                                </AnimatePresence>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <InputBox>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder=" 비밀번호를 입력해주세요"
                                    />
                                    <ResetButton
                                        onClick={() => handleReset('password')}
                                    >
                                        X
                                    </ResetButton>
                                </InputBox>
                                <AnimatePresence>
                                    {!isPasswordValid &&
                                        formData.password.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <Valid>
                                                    비밀번호는 소문자, 숫자,
                                                    특수문자를 포함하고 최소 8자
                                                    이상이어야 합니다.
                                                </Valid>
                                            </motion.div>
                                        )}
                                </AnimatePresence>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <AuthRequestContainer
                                    title={
                                        title === '로그인' ? 'true' : 'false'
                                    }
                                >
                                    {title === '회원가입' && (
                                        <AgreementContainer>
                                            <AgreementChenckBox
                                                type="checkbox"
                                                checked={SginAgreement}
                                                onChange={(e) =>
                                                    setSginAgreement(
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                            <span>
                                                <LinkStyle
                                                    to="/user-protocol"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    이용약관
                                                </LinkStyle>{' '}
                                                및{' '}
                                                <LinkStyle
                                                    to="/privacy-policy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    개인정보처리방침
                                                </LinkStyle>
                                                을 모두 확인하였으며, 이에
                                                동의합니다.
                                            </span>
                                        </AgreementContainer>
                                    )}
                                    <motion.div
                                        whileHover={{
                                            scale: notAllow ? 1 : 1.03,
                                        }}
                                        whileTap={{
                                            scale: notAllow ? 1 : 0.97,
                                        }}
                                    >
                                        <SignInButton
                                            type="submit"
                                            disabled={notAllow || isLoading}
                                        >
                                            {isLoading
                                                ? title === '로그인'
                                                    ? '로그인 중...'
                                                    : '회원가입 중...'
                                                : title}
                                        </SignInButton>
                                    </motion.div>
                                </AuthRequestContainer>
                            </motion.div>
                        </Form>
                    </SigndBox>
                </SigndContainer>
                <AnimatePresence>
                    {toastPopUp && (
                        <ToastPopUp
                            message={'아이디와 비밀번호를 확인해 주세요.'}
                            setToastPopUp={setToastPopUp}
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AuthComponent;
