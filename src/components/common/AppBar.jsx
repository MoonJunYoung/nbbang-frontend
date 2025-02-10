import { useEffect, useState } from 'react';

const AppBar = () => {
    const [isAndroid, setIsAndroid] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('android')) {
            setIsAndroid(true);
        }
    }, []);

    if (!isAndroid) return null;

    return (
        <div className="bg-[#3167fc] flex items-center p-3 justify-between">
            <div className="flex items-center gap-2">
                <img src="/images/nbbang.png" alt="nbbang" className="w-10" />
                <span className="text-white font-semibold text-sm md:text-base max-[360px]:text-[11px]">
                    앱에서 더욱 간편하게 이용해보세요!
                </span>
            </div>
            <span className="text-black bg-white rounded-xl font-semibold px-2 py-1 text-sm md:text-base max-[360px]:text-[11px]">
                앱에서 이용하기
            </span>
        </div>
    );
};

export default AppBar;
