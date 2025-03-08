import * as amplitude from '@amplitude/analytics-browser';

import { getUserData, Token } from '../api/api';

const amplitudeApiKey = '1c08f7255ba1c097c62902cbd0ca16a3';

const devAmplitudeApiKey = '1c08f7255ba1c097c62902cbd0ca16a3';

const ampKey =
    process.env.NODE_ENV === 'development'
        ? devAmplitudeApiKey
        : amplitudeApiKey;

export const initializeAmplitude = async () => {
    return amplitude.init(ampKey, {
        defaultTracking: {
            attribution: true,
            pageViews: false,
            sessions: true,
            formInteractions: false,
            fileDownloads: false,
        },
    });
};

export const AmplitudeSetUserId = async () => {
    const authToken = Token();
    try {
        if (authToken) {
            const userInfo = await getUserData();
            return amplitude.setUserId(
                userInfo.data.identifier
                    ? userInfo.data.identifier
                    : `${userInfo.data.platform}_${userInfo.data.id}`,
            );
        }
    } catch (error) {
        console.error('Amplitude 초기화 중 오류 발생:', error);
    }
};

export const AmplitudeResetUserId = async () => {
    try {
        amplitude.reset();
    } catch (error) {
        console.error('Amplitude 초기화 중 오류 발생:', error);
    }
};

export const sendEventToAmplitude = async (eventName, properties) => {
    try {
        // if (process.env.NODE_ENV === 'development') {
        //     console.log(`${eventName}: ${JSON.stringify(properties || {})}`);
        // }
        amplitude.track(eventName, properties);
    } catch (error) {
        console.error('Amplitude 초기화 중 오류 발생:', error);
    }
};
