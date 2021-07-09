#!/usr/bin/env node

const buildConfig = require('./buildconfig.json');
const fs = require('fs');
const path = require('path');
const Concat = require('concat-with-sourcemaps');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let config = buildConfig.prototyping;
let dest = './source/js/prototyping/bundles/';
let maps = './source/js/prototyping/bundles/maps/';

if (argv.production) {
    config = buildConfig.production;
    dest = './source/js/production/bundles/';
    maps = './source/js/production/bundles/maps/';
}

if (!fs.existsSync(dest)){
    fs.mkdirSync(dest);
}
if (!fs.existsSync(maps)){
    fs.mkdirSync(maps);
}

config.forEach(function(element) {
    if(element.javascript) {
        element.javascript.forEach(function(bundle) {

            let concat = new Concat(true, bundle.filename, '\n');
            bundle.files.forEach(function(file) {
                try {
                    const data = fs.readFileSync(file, 'utf8');
                    concat.add(path.basename(file), data);
                } catch (err) {
                    console.error(err);
                }
            });
            concat.add(null, '//# sourceMappingURL=maps/' + bundle.filename + '.map');

            fs.writeFile(dest + bundle.filename, concat.content, (err) => {
                if (err) throw err;
            });
            fs.writeFile(maps + bundle.filename + ".map", concat.sourceMap, (err) => {
                if (err) throw err;
            });
        });
    }
});