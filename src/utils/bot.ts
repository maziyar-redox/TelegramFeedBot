/*
    Importing libs
*/
import { DevToCrawller, MediumCrawller, ScienceCrawller, ScienceDailyCrawller } from "./modules/crawller.module";

export default async function Bot() {
    const AllPosts = [];
    const devToCrawller = await DevToCrawller();
    const mediumCrawller = await MediumCrawller();
    const scienceCrawller = await ScienceCrawller();
    const scienceDailyCrawller = await ScienceDailyCrawller();
    if (devToCrawller!.length !== 0) {
        let i = 0;
        while (i < devToCrawller!.length) {
            AllPosts.push(devToCrawller![i]);
            i++;
        };
    };
    if (mediumCrawller!.length !== 0) {
        let i = 0;
        while (i < mediumCrawller!.length) {
            AllPosts.push(mediumCrawller![i]);
            i++;
        };
    };
    if (scienceCrawller!.length !== 0) {
        let i = 0;
        while (i < scienceCrawller!.length) {
            AllPosts.push(scienceCrawller![i]);
            i++;
        };
    };
    if (scienceDailyCrawller!.length !== 0) {
        let i = 0;
        while (i < scienceDailyCrawller!.length) {
            AllPosts.push(scienceDailyCrawller![i]);
            i++;
        };
    };
    return AllPosts;
};