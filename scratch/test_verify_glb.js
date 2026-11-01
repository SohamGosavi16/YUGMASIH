const fs = require('fs');
const path = require('path');

// Let's inspect the optimized file headers and chunks
const filePath = path.join(__dirname, 'test_optimized.glb');
const buf = fs.readFileSync(filePath);
console.log('Optimized GLB file size:', buf.length, 'bytes (' + (buf.length / (1024 * 1024)).toFixed(2) + ' MB)');

const magic = buf.readUInt32LE(0);
console.log('Magic:', magic.toString(16), magic === 0x46546C67 ? '(glTF OK)' : '(BAD)');
const version = buf.readUInt32LE(4);
console.log('Version:', version);

const chunk0Length = buf.readUInt32LE(12);
const jsonStr = buf.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

console.log('Extensions used:', gltf.extensionsUsed);
console.log('Extensions required:', gltf.extensionsRequired);
console.log('Meshes:', gltf.meshes.length);
console.log('Textures:', gltf.textures.length);
console.log('Images:', gltf.images.length);
console.log('Materials:', gltf.materials.length);

