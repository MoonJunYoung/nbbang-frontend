import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { isNbbangAppWebView, MIGRATED_PARAM } from '@/utils/appVersion';

const STORAGE_KEY = 'nbbang-domain-migration-notified';

const isLegacyReferrer = () =>
    /nbbang\.shop/i.test(document.referrer ?? '');

export default function DomainMigrationNoticeModal() {
    const [open, setOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const removeMigratedParam = () => {
        if (searchParams.get(MIGRATED_PARAM) !== '1') {
            return;
        }

        const params = new URLSearchParams(searchParams);
        params.delete(MIGRATED_PARAM);
        const qs = params.toString();

        navigate(
            { pathname: location.pathname, search: qs ? `?${qs}` : '' },
            { replace: true },
        );
    };

    useEffect(() => {
        if (isNbbangAppWebView()) {
            return;
        }

        if (localStorage.getItem(STORAGE_KEY)) {
            return;
        }

        const fromRedirect = searchParams.get(MIGRATED_PARAM) === '1';
        const fromReferrer = isLegacyReferrer();

        if (fromRedirect || fromReferrer) {
            setOpen(true);
        }
    }, [searchParams]);

    const handleConfirm = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        setOpen(false);
        removeMigratedParam();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    handleConfirm();
                }
            }}
        >
            <DialogContent className="max-w-sm mx-auto text-center bg-white">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        도메인이 변경되었습니다
                    </DialogTitle>
                    <DialogDescription className="text-center leading-relaxed">
                        엔빵 서비스 주소가{' '}
                        <strong>nbbang.shop</strong>에서{' '}
                        <strong>nbbang.cloud</strong>로 변경되었습니다.
                        <br />
                        북마크를 새 주소로 업데이트해 주세요.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-center">
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="text-white font-bold bg-[#0044FE] px-6 py-3 rounded-md w-full"
                    >
                        확인
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
