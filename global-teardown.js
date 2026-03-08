import fs from 'fs';


export default async function globalTeardown() {
    const filePath = 'data/storageState.json';

    console.log('Global Teardown started');

    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`File deleted successfully: ${filePath}`);
        } catch (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        }
    } else {
        console.log(`File not found, nothing to delete: ${filePath}`);
    }
 };