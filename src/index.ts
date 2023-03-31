import { countCodeLines } from './count';
import { Parser } from 'acorn';
import * as walk from 'acorn-walk';
import fs from 'fs/promises';

/**
 * Lecture - https://drive.google.com/file/d/1tfBujkXWxsdQeg-k-ddeQyhWPy6IUHO2/view
 * Task - https://drive.google.com/file/d/1cP_DRSmcXQLlZ36fuvYTP4B15PR0hyEC/view
 */

(async () => {
  const file = await fs.readFile('./file-to-count.js', 'utf-8');
  const res = countCodeLines(file);
  console.log('res:', res);
  fs.writeFile('./res.json', JSON.stringify(res.node, null, 2));
})();
