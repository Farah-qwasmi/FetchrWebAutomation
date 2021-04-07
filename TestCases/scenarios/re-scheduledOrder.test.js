import {
    clickByID,
    awaitForSeconds,
    clickBySelector,
    openFetchrMainPage,
    clickByText,
    textExists,
    writeByID
} from "../functions/helpFuctions";

describe('suite', () => {
    test('test 1 / open home page and go to track my order ', async () => {
        await openFetchrMainPage();
        await clickBySelector('#corona > a');
        await writeByID('tracking_id')('34151904231797');
        await clickByID('search_submit');
    }, 40000);//// this number is time out in seconds , so if the step is not finished within 40 second , we will get failed result 

    test('test 2 / check order history', async () => {
        await clickByText('a')('Order history');
        await awaitForSeconds(1);
        await textExists('h4')('Shipment Activity');
        await clickByText('button')('Exit');
        await clickByText('a')('Reschedule order');
        await awaitForSeconds(5);

    }, 40000);
    test('test 1 / open track order map', async () => {
        await writeByID('pac-input')('dubai');
        await textExists('p')('Move the map to pin delivery location');
        await textExists('button')('Confirm delivery location');
        await awaitForSeconds(5);
    }, 40000);
});

