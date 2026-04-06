import { findTrackKey } from './src/lib/s3';

async function test() {
    const folder = 'live-step-into-the-light';
    const title = 'haven in the hills';
    const key = await findTrackKey(folder, title);
    console.log(`Found Key: ${key}`);
}

test();
