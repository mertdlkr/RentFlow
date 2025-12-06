export const parseMoveString = (str: string | number[] | undefined | null): string => {
    if (!str) return "";
    if (typeof str === "string") return str;
    if (Array.isArray(str)) {
        try {
            return new TextDecoder().decode(new Uint8Array(str));
        } catch (e) {
            return "";
        }
    }
    return "";
};
