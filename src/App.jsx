import {
    BrowserRouter as Router,
    Route,
    Routes,
    useSearchParams,
} from 'react-router-dom';
import './App.css';
import SigndPage from './pages/signdPage';
import MainPage from './pages/mainPage';
import BillingPage from './pages/billingPage';
import ResultPage from './pages/resultPage';
import UserProtocolPage from './pages/userProtocolPage';
import SignIn from './components/auth/SignIn';
import SimpleSettlementPage from './pages/simpleSettlementPage';
import SignUp from './components/auth/SignUp';
import AppBar from './components/common/AppBar';
import {
    KakaoRedirect,
    GooglesRedirect,
    NaverRedirect,
} from './components/socialLogin/SocialPlatformRedirect';
import SimpleSettlementResultPage from './pages/simpleSettlementResultPage';
import QRCodeModal from './components/Modal/QRCodeModal';
import { AmplitudeSetUserId, initializeAmplitude } from './utils/amplitude';
import { useEffect, useState } from 'react';
import LoadingSpinner from './components/common/LodingSpinner';
import { motion } from 'framer-motion';

function App() {
    const [amplitudeInitialized, setAmplitudeInitialized] = useState(false);

    useEffect(() => {
        const initializeAndSetUserId = async () => {
            try {
                await initializeAmplitude();
                await AmplitudeSetUserId();
                setAmplitudeInitialized(true);
            } catch (error) {
                console.error('Error in initialization:', error);
            }
        };

        initializeAndSetUserId();
    }, []);

    return (
        <div className={amplitudeInitialized ? 'App' : 'flex justify-center'}>
            {amplitudeInitialized ? (
                <>
                    <motion.div
                        className="hidden xl:block fixed h-full w-[26.1rem] z-10"
                        style={{ left: 'calc(-35.1rem + 50vw)' }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.img
                            src="images/N.png"
                            alt="nbbang"
                            className="w-[40px] mt-[80px] mb-[20px] drop-shadow-2xl"
                            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.8,
                                type: 'spring',
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        />

                        <ul className="flex flex-col text-left gap-8 mt-5">
                            <motion.li
                                className="text-white font-bold text-4xl leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                    빠른 정산
                                </span>
                                ,
                                <br />
                                <span className="text-blue-100">
                                    원클릭 송금
                                </span>{' '}
                                ⚡
                            </motion.li>

                            <motion.li
                                className="text-white font-semibold text-[22px] leading-relaxed"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <span className="text-blue-100">
                                    모임에서 사용된 금액을
                                </span>
                                <br />
                                <span className="text-yellow-200">
                                    나누어 편리하게 정산
                                </span>
                                하는
                                <br />
                                <span className="bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent font-bold">
                                    스마트한 웹 어플리케이션
                                </span>{' '}
                                🚀
                            </motion.li>

                            <motion.li
                                className="text-white font-medium text-lg space-y-3"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                            >
                                <div className="space-y-2">
                                    {[
                                        {
                                            icon: '💳',
                                            text: '카카오페이 & 토스 간편송금',
                                            delay: 1.2,
                                        },
                                        {
                                            icon: '📱',
                                            text: '모바일 완벽 최적화',
                                            delay: 1.3,
                                        },
                                        {
                                            icon: '🔒',
                                            text: '안전한 개인정보 보호',
                                            delay: 1.4,
                                        },
                                        {
                                            icon: '⚡',
                                            text: '실시간 정산 계산',
                                            delay: 1.5,
                                        },
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-center space-x-3 text-blue-100 hover:text-white transition-colors duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: feature.delay,
                                                duration: 0.4,
                                            }}
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="text-xl">
                                                {feature.icon}
                                            </span>
                                            <span className="text-base font-medium">
                                                {feature.text}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.li>
                        </ul>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.6 }}
                        >
                            <QRCodeModal
                                url="https://play.google.com/store/apps/details?id=nbbang.middle"
                                imageSrc="images/play_store.png"
                                className="w-[220px] mt-8 rounded-2xl py-3 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700"
                                title="앱 설치하고 더 편하게 정산해보세요"
                                description="앱 설치하고 더 편하게 정산해보세요"
                                description2="휴대폰으로 QR 코드를 스캔해서 설치해보세요"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hidden sm:block fixed inset-0 bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#60a5fa] text-left overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute bg-white rounded-full opacity-5"
                                    style={{
                                        width: `${Math.random() * 300 + 100}px`,
                                        height: `${Math.random() * 300 + 100}px`,
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        y: [0, -30, 0],
                                        x: [0, 20, 0],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 15 + i * 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <div className="relative z-30 bg-white min-h-svh xl:left-[16.1rem] xl:right-0">
                        <AppBar />
                        <Router>
                            <Routes>
                                <Route path="/signd" element={<SigndPage />} />
                                <Route
                                    path="/kakao-redirect"
                                    element={<KakaoRedirect />}
                                />
                                <Route
                                    path="/naver-redirect"
                                    element={<NaverRedirect />}
                                />
                                <Route
                                    path="/google-redirect"
                                    element={<GooglesRedirect />}
                                />
                                <Route index element={<MainPage />} />
                                <Route
                                    path="/meeting/:meetingId"
                                    element={<BillingPage />}
                                />
                                <Route
                                    path="/share"
                                    element={<ShareRouter />}
                                />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/sign-in" element={<SignIn />} />
                                <Route
                                    path="/user-protocol"
                                    element={<UserProtocolPage />}
                                />
                                <Route
                                    path="/simple-settlement/:meetingId"
                                    element={<SimpleSettlementPage />}
                                />
                            </Routes>
                        </Router>
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
}

function ShareRouter() {
    const [searchParams] = useSearchParams();
    const meeting = searchParams.get('meeting');
    const simpleMeeting = searchParams.get('simple-meeting');

    if (meeting) {
        return <ResultPage meetingId={meeting} />;
    } else if (simpleMeeting) {
        return <SimpleSettlementResultPage simpleMeetingId={simpleMeeting} />;
    } else {
        return <div>Invalid parameters</div>;
    }
}

export default App;
