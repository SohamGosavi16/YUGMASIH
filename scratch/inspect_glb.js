const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/states/Rajasthan/Amber_Fort/3D/amber_fort_tripo.glb');
console.log('Reading:', filePath);

const buf = fs.readFileSync(filePath);
console.log('Total bytes:', buf.length);

// GLB Header: 12 bytes
// magic (4 bytes uint32: 0x46546C67 = "glTF")
// version (4 bytes uint32)
// length (4 bytes uint32)
const magic = buf.readUInt32LE(0);
const version = buf.readUInt32LE(4);
const length = buf.readUInt32LE(8);

console.log('Magic:', magic.toString(16), magic === 0x46546C67 ? '(glTF)' : '(UNKNOWN)');
console.log('Version:', version);
console.log('Length:', length);

// Chunk 0: JSON
const chunk0Length = buf.readUInt32LE(12);
const chunk0Type = buf.readUInt32LE(16); // 0x4E4F534A = "JSON"
console.log('Chunk 0 length:', chunk0Length);

const jsonStr = buf.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

console.log('Asset:', gltf.asset);
console.log('Extensions used:', gltf.extensionsUsed || 'None');
console.log('Extensions required:', gltf.extensionsRequired || 'None');
console.log('Meshes count:', gltf.meshes ? gltf.meshes.length : 0);
console.log('Materials count:', gltf.materials ? gltf.materials.length : 0);
console.log('Textures count:', gltf.textures ? gltf.textures.length : 0);
console.log('Images count:', gltf.images ? gltf.images.length : 0);
console.log('Accessors count:', gltf.accessors ? gltf.accessors.length : 0);
console.log('BufferViews count:', gltf.bufferViews ? gltf.bufferViews.length : 0);
console.log('Buffers count:', gltf.buffers ? gltf.buffers.length : 0);

if (gltf.meshes) {
  let totalIndices = 0;
  let totalVertices = 0;
  gltf.meshes.forEach((m, idx) => {
    console.log(`Mesh ${idx}: "${m.name}" primitives: ${m.primitives.length}`);
    m.primitives.forEach((p, pIdx) => {
      const mode = p.mode !== undefined ? p.mode : 4; // 4 = TRIANGLES
      const indAcc = p.indices !== undefined ? gltf.accessors[p.indices] : null;
      const posAcc = p.attributes.POSITION !== undefined ? gltf.accessors[p.attributes.POSITION] : null;
      const count = indAcc ? indAcc.count : (posAcc ? posAcc.count : 0);
      const vertCount = posAcc ? posAcc.count : 0;
      totalIndices += count;
      totalVertices += vertCount;
      console.log(`  Primitive ${pIdx}: mode=${mode}, triangles=${Math.floor(count / 3)}, vertices=${vertCount}, material=${p.material}`);
      console.log(`  Attributes:`, Object.keys(p.attributes));
    });
  });
  console.log(`TOTAL Vertices: ${totalVertices}, TOTAL Triangles: ${Math.floor(totalIndices / 3)}`);
}

if (gltf.images) {
  gltf.images.forEach((img, idx) => {
    const bv = gltf.bufferViews[img.bufferView];
    console.log(`Image ${idx}: "${img.name || 'unnamed'}", mimeType: ${img.mimeType}, bufferView: ${img.bufferView}, byteLength: ${bv ? bv.byteLength : 'unknown'}`);
  });
}

if (gltf.materials) {
  gltf.materials.forEach((mat, idx) => {
    console.log(`Material ${idx}: "${mat.name}"`, JSON.stringify(mat.pbrMetallicRoughness || {}));
  });
}

