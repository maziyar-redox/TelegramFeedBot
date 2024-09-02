export default function CharFilter(text: string, filter: string): string {
    const isExist = text.includes(filter);
    let value: string = "";
    if (isExist) {
        const splitText = text.split(filter);
        value = splitText[0] + splitText[1];
    };
    if (!isExist) {
        value = text;
    };
    return value;
};