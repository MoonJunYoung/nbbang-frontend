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

function App() {
    return (
        <div className="App">
            <AppBar />
            <Router>
                <Routes>
                    <Route path="/signd" element={<SigndPage />} />
                    <Route path="/kakao-redirect" element={<KakaoRedirect />} />
                    <Route path="/naver-redirect" element={<NaverRedirect />} />
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
