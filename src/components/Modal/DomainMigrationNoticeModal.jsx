import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { isNbbangAppWebView } from '@/utils/appVersion';

const STORAGE_KEY = 'nbbang-domain-migration-notified';

const isLegacyMigration = () => {
    if (/nbbang\.shop/i.test(document.referrer ?? '')) {
        return true;
    }

    return (
        new URLSearchParams(window.location.search).get('from_legacy_domain') ===
        '1'
    );
};

const removeLegacyDomainParam = () => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('from_legacy_domain')) {
        return;
    }

    params.delete('from_legacy_domain');
    const newSearch = params.toString();
    const newUrl =
        window.location.pathname +
        (newSearch ? `?${newSearch}` : '') +
        window.location.hash;
    window.history.replaceState({}, '', newUrl);
};

export default function DomainMigrationNoticeModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isNbbangAppWebView()) {
            return;
        }

        if (localStorage.getItem(STORAGE_KEY)) {
            return;
        }

        if (isLegacyMigration()) {
            setOpen(true);
        }
    }, []);

    const handleConfirm = () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        removeLegacyDomainParam();
        setOpen(false);
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
