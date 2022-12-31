import Resizer from 'react-image-file-resizer';

const resizeFile = (file: File) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            500,
            500,
            'JPEG',
            90,
            0,
            (uri) => {
                resolve(uri);
            },
            'file',
        );
    });

export const useResizedImage = async (file: File) => {
    const image = await resizeFile(file).then((value) => value);
    console.log(image);

    return image;
};
