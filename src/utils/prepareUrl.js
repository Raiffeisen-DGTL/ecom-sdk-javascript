export default url => {
    if (url[url.length - 1] !== '/') {
        return url;
    }

    return url.slice(0, url.length - 1);
};
