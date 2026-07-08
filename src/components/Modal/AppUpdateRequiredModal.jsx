import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { MIN_APP_VERSION, PLAY_STORE_URL } from '@/config/env';
import {
    canOpenPlayStoreNatively,
    isAppUpdateRequired,
} from '@/utils/appVersion';

export default function AppUpdateRequiredModal() {
    const [open, setOpen] = useState(false);
    const [showPlayStoreButton, setShowPlayStoreButton] = useState(false);

    useEffect(() => {
        setOpen(isAppUpdateRequired({ minVersion: MIN_APP_VERSION }));
        setShowPlayStoreButton(canOpenPlayStoreNatively());
    }, []);

    const handleUpdate = () => {
        window.location.href = PLAY_STORE_URL;
    };

    return (
        <Dialog open={open} onOpenChange={() => {}}>
            <DialogContent
                className="max-w-sm mx-auto text-center bg-white z-[100]"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-center">
                        앱 업데이트가 필요합니다
                    </DialogTitle>
                    <DialogDescription className="text-center leading-relaxed space-y-3">
                        <span className="block">
                            새 버전의 엔빵 앱이 출시되었습니다.
                            <br />
                            원활한 이용을 위해 Play Store에서 최신 버전(
                            {MIN_APP_VERSION})으로 업데이트해 주세요.
                        </span>
                        {!showPlayStoreButton && (
                            <span className="block text-sm text-gray-600">
                                Play Store 앱을 직접 열어{' '}
                                <strong>「엔빵」</strong>을 검색한 뒤
                                업데이트해 주세요.
                                <br />
                                또는 홈 화면의 엔빵 앱 아이콘을 길게 눌러
                                업데이트할 수 있습니다.
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {showPlayStoreButton && (
                    <DialogFooter className="sm:justify-center">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="text-white font-bold bg-[#0044FE] px-6 py-3 rounded-md w-full"
                        >
                            Play Store에서 업데이트
                        </button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
