import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ImageModal = ({ images, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length,
        );
    };

    if (!isOpen || images.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-30"
        >
            <div className="relative max-w-screen-sm max-h-screen-sm sm:max-w-screen-xss sm:max-h-screen-xs md:w-[300px] lg:w-[500px] ">
                <img
                    src={`https://nbbang-images.s3.ap-northeast-2.amazonaws.com/${images[currentIndex]}`}
                    alt={`Image ${currentIndex + 1}`}
                    className=" p-5"
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="fixed left-0 bottom-5 transform -translate-y-1/2 text-gray-400 text-4xl pl-4 pt-2"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={handleNext}
                            className="fixed right-0 bottom-5 transform -translate-y-1/2 text-gray-400 text-4xl pr-4 pt-2"
                        >
                            &gt;
                        </button>
                    </>
                )}
                <button
                    onClick={onClose}
                    className="fixed top-0 left-2 text-gray-400 text-2xl"
                >
                    x
                </button>
            </div>
        </motion.div>
    );
};

export const ImageGallery = ({ images }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="border shadow-sm py-2 px-12 mb-4 rounded-2xl"
            >
                <span className="font-bold ">사진{''}</span>
                <span className="font-bold text-main-blue">
                    {images?.length}장
                </span>
            </button>
            <ImageModal
                images={images}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
