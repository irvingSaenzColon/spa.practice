import fs from 'fs';


export default function envReader(filePath) {
  let envObj = null;
  try {
     let fileBuffer = fs.readFileSync(filePath, { encoding: 'utf-8'});
     if(!fileBuffer.length) {
      return envObj;
     }
     envObj = {};
     fileBuffer = fileBuffer.split('\n');
     for(let i = 0; i < fileBuffer.length; i++) {
      const equalIndex = fileBuffer[i].indexOf('=');
      if(equalIndex != -1 && fileBuffer[i].length > (equalIndex + 1)) {
        envObj[fileBuffer[i].substring(0, equalIndex)] = fileBuffer[i].substring(equalIndex + 1, fileBuffer[i].length);
      }
     }
     return envObj;
  } catch(error) {
    console.error(error);
    return envObj;
  }
}