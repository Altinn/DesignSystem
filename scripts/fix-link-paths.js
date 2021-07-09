#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = "gh-pages";
const rootUrl = 'AltinnPatternLab2021/' + root;

const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (path.extname(file) === '.html') {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    })

    return arrayOfFiles;
};

function updateLinks(folder, allFiles) {
    allFiles = allFiles || [];
    allFiles.forEach(function (file) {
        let data = fs.readFileSync(file, 'utf8');
        if (data.includes('/patterns/')) {
            data = data.replace(/\/patterns\//g, '/' + rootUrl + '/' + folder + '/patterns/');
            fs.writeFileSync(file, data);
        };
    });
}

function updateFolder(folder) {
    console.log('Fixing links in ./' + root + '/' + folder)
    let allFiles = [];
    allFiles = getAllFiles('./' + root + '/' + folder + '/patterns/', allFiles);
    updateLinks(folder, allFiles);
}

let files = fs.readdirSync('./' + root);
files.forEach(function(file) {
    if (fs.statSync('./' + root + "/" + file).isDirectory()) {
        updateFolder(file);
    }
});
console.log('Finished fixing links')
