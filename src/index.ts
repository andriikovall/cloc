import { Parser } from 'acorn';
import * as walk from 'acorn-walk';
import fs from 'fs/promises';

(async () => {
    const file = await fs.readFile('./file-to-count.js', 'utf-8');
    
    const node = Parser.parse(file, {
        sourceType: 'module',
        ecmaVersion: 2017,
        locations: true,
    });

    walk.simple(node, {
    })

    fs.writeFile('./res.json', JSON.stringify(node, null, 2));
})()