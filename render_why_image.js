const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve('render_why_watsbuy.html');
const outAssetPath = path.resolve('assets/images/why-watsbuy-visual.png');
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

console.log('Rendering via Chrome headless to assets/images/why-watsbuy-visual.png...');
execSync(`"${chrome}" --headless=new --no-sandbox --disable-gpu --force-device-scale-factor=2 --screenshot="${outAssetPath}" --window-size=1080,680 "${fileUrl}"`, { stdio: 'inherit' });

if (fs.existsSync(outAssetPath)) {
  const stat = fs.statSync(outAssetPath);
  console.log('Rendered successfully! File size:', stat.size);
  const buf = fs.readFileSync(outAssetPath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  console.log('Dimensions:', width, 'x', height);
} else {
  console.error('Failed to create screenshot');
  process.exit(1);
}

