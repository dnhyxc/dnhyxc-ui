const jsonSafeParse = (text, defaultRes)=>{
    try {
        return text ? JSON.parse(text) : defaultRes;
    } catch (error) {
        return defaultRes;
    }
};
export { jsonSafeParse };
