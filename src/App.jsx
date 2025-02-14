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

function App() {
    return (
        <div className="App">
            <div
                className="hidden lg:block fixed h-full w-[26.1rem] z-50"
                style={{ left: 'calc(-35.1rem + 50vw)' }}
            >
                <img
                    src="images/N.png"
                    alt="nbbang"
                    className="w-[50px] mt-[140px] mb-[60px]"
                />
                <ul className="flex flex-col text-left gap-12 mt-5">
                    <li className="text-white font-bold text-3xl">
                        빠른 정산, 원클릭 송금
                    </li>
                    <li className="text-white font-bold text-[25px]">
                        모임에서 사용된 금액을 나누어 편리하게
                        <br /> 정산하는 웹 어플리케이션
                    </li>
                    <li className="text-white font-bold text-lg">
                        더욱 빠르고 편리하게 NBBANG을 앱에서 경험해보세요
                    </li>
                </ul>
                <QRCodeModal
                    url="https://play.google.com/store/apps/details?id=nbbang.middle"
                    imageSrc="images/play_store.png"
                />
            </div>
            <div className="hidden sm:block fixed inset-0 bg-gradient-to-br from-[#3167fc] via-[#4c8dff] to-[#a3c7ff] text-left overflow-hidden"></div>
            <div className="relative z-30 bg-white min-h-svh lg:left-[16.1rem] lg:right-0">
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
                        <Route path="/share" element={<ShareRouter />} />
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
