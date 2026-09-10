import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogClose,
} from '@/components/ui/dialog';

const RemittanceQRModal = ({ open, onOpenChange, url, title }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-6 max-w-sm mx-auto text-center bg-white">
            <p className="text-xl font-bold text-slate-900">{title}</p>
            <p className="text-sm text-slate-500 mt-1 mb-4">
                휴대폰으로 QR을 스캔해 송금하세요
            </p>
            <div className="flex flex-col items-center justify-center">
                {url && (
                    <QRCodeCanvas
                        value={url}
                        size={180}
                        level="M"
                        className="border border-slate-200 p-3 rounded-xl"
                    />
                )}
            </div>
            <DialogClose asChild>
                <button
                    type="button"
                    className="w-full text-white font-bold bg-slate-900 px-2 py-3 mt-5 rounded-xl"
                >
                    확인
                </button>
            </DialogClose>
        </DialogContent>
    </Dialog>
);

/**
 * 송금 버튼 UI.
 * - 모바일: 딥링크/카카오페이 URL로 바로 이동
 * - PC: 동일 버튼 클릭 시 QR 모달 표시
 */
const RemittanceQRSection = ({
    kakaoLink,
    tossLink,
    depositCopyText,
    onCopyAccount,
    copiedAccount = false,
    isMobile = false,
    variant = 'card',
    className = '',
}) => {
    const [qrModal, setQrModal] = useState({ open: false, url: '', title: '' });

    if (!kakaoLink && !tossLink && !depositCopyText) {
        return null;
    }

    const openQr = (url, title) => {
        setQrModal({ open: true, url, title });
    };

    const isSimple = variant === 'simple';

    const kakaoClass = isSimple
        ? 'w-full flex items-center justify-center gap-2 bg-[#fee502] rounded-2xl pl-5 pr-8 py-4'
        : 'flex-1 flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FEE500]/90 text-slate-900 px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md';

    const tossClass = isSimple
        ? 'w-full flex items-center justify-center gap-2 bg-[#0050ff] rounded-2xl pl-5 pr-8 py-4'
        : 'flex-1 flex items-center justify-center gap-2 bg-[#0050FF] hover:bg-[#0050FF]/90 text-white px-4 py-3 rounded-xl transition-all shadow-sm hover:shadow-md';

    const imgClass = isSimple ? 'w-8' : 'w-5 h-5';
    const labelClass = isSimple
        ? 'whitespace-nowrap font-bold text-sm'
        : 'text-sm font-semibold';

    const wrapperClass = isSimple
        ? `flex justify-center items-center gap-4 my-10 ${className}`
        : `mt-4 pt-4 border-t border-slate-200 ${className}`;

    const renderKakao = () => {
        if (!kakaoLink) return null;

        const content = (
            <>
                <img
                    src="/images/kakao 2.png"
                    alt="kakao"
                    className={imgClass}
                />
                <span className={`${labelClass} text-slate-900`}>
                    {isSimple ? '카카오 송금' : '카카오송금'}
                </span>
            </>
        );

        if (isMobile) {
            return (
                <motion.a
                    href={kakaoLink}
                    whileTap={{ scale: 0.95 }}
                    className={kakaoClass}
                >
                    {content}
                </motion.a>
            );
        }

        return (
            <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => openQr(kakaoLink, '카카오송금')}
                className={kakaoClass}
            >
                {content}
            </motion.button>
        );
    };

    const renderToss = () => {
        if (!tossLink) return null;

        const content = (
            <>
                <img
                    src="/images/result_toss.png"
                    alt="toss"
                    className={imgClass}
                />
                <span
                    className={`${labelClass} ${isSimple ? 'text-white' : ''}`}
                >
                    {isSimple ? '토스 송금' : '토스송금'}
                </span>
            </>
        );

        if (isMobile) {
            return (
                <motion.a
                    href={tossLink}
                    whileTap={{ scale: 0.95 }}
                    className={tossClass}
                >
                    {content}
                </motion.a>
            );
        }

        return (
            <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => openQr(tossLink, '토스송금')}
                className={tossClass}
            >
                {content}
            </motion.button>
        );
    };

    const renderCopy = () => {
        if (!depositCopyText || !onCopyAccount || isSimple) return null;

        return (
            <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => onCopyAccount(depositCopyText)}
                className="flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl transition-all shadow-sm"
            >
                {copiedAccount ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                    <Copy className="w-5 h-5" />
                )}
            </motion.button>
        );
    };

    return (
        <>
            <div className={wrapperClass}>
                {!isSimple && (
                    <p className="text-xs text-slate-600 mb-2 flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                        바로 송금하기
                    </p>
                )}
                <div
                    className={
                        isSimple
                            ? 'flex justify-center items-center gap-4 w-full'
                            : 'flex gap-2'
                    }
                >
                    {renderKakao()}
                    {renderToss()}
                    {renderCopy()}
                </div>
            </div>

            <RemittanceQRModal
                open={qrModal.open}
                onOpenChange={(open) =>
                    setQrModal((prev) => ({ ...prev, open }))
                }
                url={qrModal.url}
                title={qrModal.title}
            />
        </>
    );
};

export default RemittanceQRSection;
