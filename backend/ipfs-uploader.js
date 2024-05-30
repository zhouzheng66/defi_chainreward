import { create } from 'kubo-rpc-client';
import fs from 'fs';

const ipfs = create({ url: 'http://localhost:5001' });  

export async function uploadFileToIPFS(path) {
    const file = fs.readFileSync(path);
    const result = await ipfs.add({
        path: path,
        content: file
    });
    console.log(result);
    return result;
}

export async function uploadJsonToIPFS(json) {
    const result = await ipfs.add(
        JSON.stringify(json)
    );
    console.log(result);
    return result;
}

