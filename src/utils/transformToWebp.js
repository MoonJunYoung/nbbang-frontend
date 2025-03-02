export const transformToWebp = async (file) => {
    const webpDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Canvas Context를 가져올 수 없습니다.'));
                    return;
                }

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);
                canvas.toBlob(
                    (blob) => {
                        if (blob) resolve(blob);
                        else
                            reject(
                                new Error('Failed to convert image to WebP.'),
                            );
                    },
                    'image/webp',
                    1,
                );
            };
            img.onerror = (error) => {
                reject(error);
            };
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });

    return new File([webpDataUrl], file.name.replace(/\.[^/.]+$/, '.webp'), {
        type: 'image/webp',
    });
};
