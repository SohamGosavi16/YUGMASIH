const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/states/Rajasthan/Amber_Fort/3D/amber_fort_tripo.glb');
const buf = fs.readFileSync(filePath);

const chunk0Length = buf.readUInt32LE(12);
const jsonStr = buf.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

// Binary chunk starts after chunk 0
const chunk1Offset = 20 + chunk0Length;
const chunk1Length = buf.readUInt32LE(chunk1Offset);
const chunk1Type = buf.readUInt32LE(chunk1Offset + 4);
const binBuffer = buf.subarray(chunk1Offset + 8, chunk1Offset + 8 + chunk1Length);

console.log('Images info:');
gltf.images.forEach((img, idx) => {
  const bv = gltf.bufferViews[img.bufferView];
  const imgData = binBuffer.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength);
  console.log(`Image ${idx}: ${img.name}, mime: ${img.mimeType}, size: ${imgData.length} bytes`);
  
  if (img.mimeType === 'image/png') {
    // PNG dimensions: width at byte 16 (4 bytes BE), height at byte 20 (4 bytes BE)
    const w = imgData.readUInt32BE(16);
    const h = imgData.readUInt32BE(20);
    console.log(`  PNG dimensions: ${w}x${h}`);
  } else if (img.mimeType === 'image/jpeg') {
    // Parse JPEG SOF0 / SOF2 marker for dimensions
    let pos = 2;
    while (pos < imgData.length - 8) {
      if (imgData[pos] === 0xFF && (imgData[pos + 1] === 0xC0 || imgData[pos + 1] === 0xC2)) {
        const h = imgData.readUInt16BE(pos + 5);
        const w = imgData.readUInt16BE(pos + 7);
        console.log(`  JPEG dimensions: ${w}x${h}`);
        break;
      }
      pos += 1;
    }
  }
});

