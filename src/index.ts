import { countCodeLines } from './count';
import fs from 'fs/promises';

/**
 * Lecture - https://drive.google.com/file/d/1tfBujkXWxsdQeg-k-ddeQyhWPy6IUHO2/view
 * Task - https://drive.google.com/file/d/1cP_DRSmcXQLlZ36fuvYTP4B15PR0hyEC/view
 */

(async () => {
  const filePath = process.argv[2];
  const file = await fs.readFile(filePath, 'utf-8');
  const res = countCodeLines(file);
  console.table(res);
  fs.writeFile('./res.json', JSON.stringify(res.node, null, 2));
})();
