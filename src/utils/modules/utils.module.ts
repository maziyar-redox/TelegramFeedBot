import dnsPromises from "node:dns/promises";

export async function CheckInternet() {
    try {
        const resolve = await dnsPromises.resolve("www.google.com");
        if (resolve) {
            return true;
        };
    } catch (err) {
        if (err) {
            return false;
        };
    };
};