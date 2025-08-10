// src/services/storage/StorageService.js
const path = require('path');
const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, filename) {
    const filepath = path.join(this._folder, filename);
    const fileStream = fs.createWriteStream(filepath);

    return new Promise((resolve, reject) => {
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
      file.on('error', reject);
    });
  }
}

module.exports = StorageService;
