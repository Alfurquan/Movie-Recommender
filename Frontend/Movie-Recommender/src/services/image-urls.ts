import noImage from '../assets/no-image-placeholder.webp'

const getCroppedImageURL = (url: string) =>{
    if(!url) return noImage;

    return `https://image.tmdb.org/t/p/w300${url}`
}

export default getCroppedImageURL;