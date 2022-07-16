/*
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require('./IOhandler'),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then(IOhandler.readDir)
  .then((filePaths) => filePaths.forEach((path) => IOhandler.grayScale(path, pathProcessed)))
  .catch((err) => console.error(err));
