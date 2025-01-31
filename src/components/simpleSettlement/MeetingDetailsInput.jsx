import React, { useState } from 'react';
import BillingInputBox from '../common/BillingInputBox';

const MeetingDetailsInput = ({ meetingData, setMeetingData }) => {
    return (
        <section className="p-6 text-left flex flex-col gap-16 mt-5 relative">
            <div>
                <h3 className="text-lg font-bold mb-4">
                    모임명을 입력해주세요!
                </h3>
                <BillingInputBox
                    value={meetingData.name}
                    onChange={(e) =>
                        setMeetingData({ ...meetingData, name: e.target.value })
                    }
                />
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">
                    모임에서 사용한 금액은 얼마인가요?
                </h3>
                <BillingInputBox
                    value={meetingData.simple_price}
                    type="number"
                    onChange={(e) =>
                        setMeetingData({
                            ...meetingData,
                            simple_price: e.target.value,
                        })
                    }
                />
            </div>
        </section>
    );
};

export default MeetingDetailsInput;
