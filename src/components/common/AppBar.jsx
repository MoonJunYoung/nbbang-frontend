import { useEffect, useState } from 'react';

const AppBar = () => {
    const [hideAppBar, setHideAppBar] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();

        // 안드로이드 체크
        const isAndroid = userAgent.includes('android');

        // iOS 체크 (아이폰/아이패드)
        const isIOS = /iphone|ipad|ipod/.test(userAgent);

        // 앱 설치 여부 체크
        const isAppInstalled = localStorage.getItem('app_installed') === 'true';

        // 앱이 설치되었으면 무조건 숨김
        if (isAppInstalled) {
            setHideAppBar(true);
            setShouldShow(false);
            return;
        }

        // 안드로이드이고, iOS가 아니고, 앱이 설치되지 않았을 때만 표시
        if (isAndroid && !isIOS) {
            setShouldShow(true);
        } else {
            setHideAppBar(true);
            setShouldShow(false);
        }
    }, []);

    const handleAppOpen = () => {
        // Google Play Store 앱 페이지로 이동
        window.location.href =
            'https://play.google.com/store/apps/details?id=nbbang.middle&hl=ko';
    };

    if (hideAppBar || !shouldShow) return null;

    return (
        <div className="sticky top-0 z-40 shadow-md">
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-start flex-col leading-tight">
                        <span className="text-sm font-semibold md:text-base">
                            앱에서 더 빠르게 정산하기
                        </span>
                        <span className="text-[12px] text-blue-50 md:text-sm">
                            원클릭 송금까지 한 번에
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleAppOpen}
                    className="bg-white text-[#1D4ED8] rounded-full font-semibold px-3 py-2 text-[13px] md:text-xs shadow-sm hover:shadow transition"
                >
                    앱에서 열기
                </button>
            </div>
        </div>
    );
};

export default AppBar;
