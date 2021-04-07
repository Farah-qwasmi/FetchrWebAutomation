import { page } from "../main"


////////////////////// wait function ////////////////////////////////

export const awaitForSeconds = async seconds => await (new Promise(r => setTimeout(r, seconds * 1000))); // 


/////////////////// click  functions ////////////////////////////

export const clickBySelector = async selector => {
    await page.waitForSelector(selector);
    await page.click(selector);
};

export const clickByText = elemName => async text => {
    const dom = await getByText(elemName)(text);
    await awaitForSeconds(.1);
    await dom.click();
};


export const clickByID = id => clickByName(`*[id="${id}"]`)
const clickByName = async selector => {
    await page.waitForSelector(selector);
    await page.click(selector);
};

///////////////////////// assartions ////////////////////////////////

export const textExists = elemName => async text => {
    const dom = await getByText(elemName)(text);
   expect(!!dom).toBeTruthy();
    
};

//////////////////////////// write functions  ////////////////////////////////////////////
export const writeByID = id => async text => _writeBySelector(`*[id ="${id}"]`, text)
export const _writeBySelector = async (selector, text, counter = 0) => {
    const field = await page.$(selector);

    if (!field) {
        if (++counter < 5) {
            await awaitForSeconds(.6);
            return _writeBySelector(selector, text, counter + 1);
        } else {
            console.log(selector, 'Field NOT FOUND');
            return null;
        }
    }

    await field.click();
    await field.type(text);
};


///////////////////////////open  page function ////////////////////////
export const openFetchrMainPage= async () => {

    await page.goto(`${'http://track.fetchr.us/'}`);
    await page.evaluate(async () => {
        window.forceLoadAssets = true;
    });
   
};



//////////other sub helper function //////////////////
export const getByText = (elemName, counter = 0) => async text => {
    const elems = await page.$$(`//${elemName}[contains(text(), '${text}')]`);
    if (elems.length > 0)
     return elems[0];
    if (++counter < 5) {
        await awaitForSeconds(.6);
    } else {
        console.log(elemName, text, 'NOT FOUND');
        return null;
    }
    return getByText(elemName, counter)(text);
};

