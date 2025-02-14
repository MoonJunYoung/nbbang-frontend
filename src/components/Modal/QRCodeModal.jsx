import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';

const QRCodeModal = ({ url, imageSrc }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
            {isOpen && <div className="fixed inset-0 bg-black/50"></div>}
            <DialogTrigger asChild>
                <img
                    src={imageSrc}
                    alt="클릭하여 QR 코드 보기"
                    className="w-[200px] mt-10 rounded-lg py-1 bg-black"
                />
            </DialogTrigger>
            <DialogContent className="p-6 max-w-md mx-auto text-center bg-white">
                <p className="text-xl font-bold">
                    해당 기능은 앱에서 사용 가능해요!
                </p>
                <p className="text-base text-gray-600 mb-4">
                    앱 설치하고 더 편하게 정산해보세요
                </p>
                <div className="flex flex-col items-center justify-center">
                    <QRCodeCanvas
                        value={url}
                        size={100}
                        className="border p-3 rounded-md"
                    />
                    <p className="mt-3 text-sm">
                        휴대폰으로 QR 코드를 스캔해서 설치해보세요
                    </p>
                </div>
                <DialogClose asChild>
                    <button className="text-white font-bold bg-black px-2 py-3 mt-2 rounded-md ">
                        확인
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default QRCodeModal;
