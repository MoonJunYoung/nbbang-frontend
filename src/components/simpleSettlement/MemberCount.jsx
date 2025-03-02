import React from 'react';

const MemberCount = ({ value, handleMemberCount }) => {
    return (
        <section className="flex flex-col text-left p-6">
            <h3 className="text-lg font-bold">
                모임을 참여한 인원은 몇명인가요?
            </h3>
            <div className="flex items-center justify-center mt-7">
                <button
                    className="border border-gray-300 px-3 py-1 text-xl"
                    onClick={() => handleMemberCount(value - 1)}
                >
                    -
                </button>
                <div className="text-lg px-4 py-1 border border-gray-300 bg-white shadow-sm">
                    <span className="text-base">{value}</span>
                </div>
                <button
                    className="border border-gray-300 px-3 py-1 text-xl"
                    onClick={() => handleMemberCount(value + 1)}
                >
                    +
                </button>
            </div>
        </section>
    );
};

export default MemberCount;
