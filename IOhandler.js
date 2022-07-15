/*
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require('unzipper'),
  fs = require('fs'),
  PNG = require('pngjs').PNG,
  path = require('path')
  sanitize = require('sanitize-filename');

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  fs.mkdir(pathOut, (err) => {
    if (err) {
      return console.error(err);
    }
    return new Promise((resolve, reject) => {
      const complete = () => {
        console.log('Extraction operation complete');
        resolve();
      };
      const isValid = (fileName) => {
        if (/^(?:__MACOSX)|(\.DS_Store)/.test(fileName)) {
          return false;
        }
        return true;
      };
      fs.createReadStream(pathIn)
        .pipe(unzipper.Parse())
        .on('entry', (entry) => {
          const fileName = entry.path;
          const type = entry.type;
          if (type === 'File' && isValid(fileName)) {
            const outFilePath = path.resolve(pathOut, sanitize(fileName));
            entry.pipe(fs.createWriteStream(outFilePath));
          } else {
            entry.autodrain();
          }
        })
        .on('error', reject)
        .on('close', complete);
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
