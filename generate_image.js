const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve('render_hero.html');
const outAssetPath = path.resolve('assets/images/commerce-demo.png');
const outRootPath = path.resolve('commerce-demo.png');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

console.log('Rendering via Chrome headless to assets/images/commerce-demo.png...');
execSync(`"${chrome}" --headless=new --no-sandbox --disable-gpu --screenshot="${outAssetPath}" --window-size=1040,644 "${fileUrl}"`, { stdio: 'inherit' });

if (fs.existsSync(outAssetPath)) {
  const stat = fs.statSync(outAssetPath);
  console.log('Rendered successfully! File size:', stat.size);
  // Copy to root commerce-demo.png
  fs.copyFileSync(outAssetPath, outRootPath);
  console.log('Copied to root commerce-demo.png');
} else {
  console.error('Failed to create screenshot');
  process.exit(1);
}
