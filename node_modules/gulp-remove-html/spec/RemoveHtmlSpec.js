var assert = require('assert');
var File = require('vinyl');
var removeHtml = require('../index.js');

function fileContents(keyword="Deject") {
  return `<body> <p> Important content!!! </p><!--<${keyword}>--><p>Shouldn't be here!!!!!</p><!--</${keyword}>--></body>`;
}
describe("gulp-remove-html", function () {

    it('should remove match', function (done) {
        var fakeFile = new File({
            contents: new Buffer(fileContents())
        });

        var myRemoveHtml = removeHtml();

        myRemoveHtml.write(fakeFile);

        myRemoveHtml.once('data', function(file) {
            assert(file.isBuffer());
            assert.equal(file.contents.toString('utf8'), '<body> <p> Important content!!! </p></body>');
            done();
        });
    });
    it('should remove multiple matches', function (done) {
        var fakeFile = new File({
            contents: new Buffer(fileContents() + "<!--<Deject>--><p>Shouldn't be here!!!!!</p><!--</Deject>-->")
        });

        var myRemoveHtml = removeHtml();

        myRemoveHtml.write(fakeFile);

        myRemoveHtml.once('data', function(file) {
            assert(file.isBuffer());
            assert.equal(file.contents.toString('utf8'), '<body> <p> Important content!!! </p></body>');
            done();
        });
    });

    it('should remove match with a configurable keyword', function (done) {
        let keyword = "SomethingElse";
        let fakeFile = new File({
            contents: new Buffer(fileContents(keyword))
        });

        let myRemoveHtml = removeHtml({keyword:keyword});

        myRemoveHtml.write(fakeFile);

        myRemoveHtml.once('data', function(file) {
            assert(file.isBuffer());
            assert.equal(file.contents.toString('utf8'), '<body> <p> Important content!!! </p></body>');

            done();
        });
    });

    it('should handle files that don\'t have the <deject> tag', function (done) {
      let fileContents = '<body> <p> Important content!!! </p></body>';
      let fakeFile = new File({
        contents: new Buffer(fileContents)
      });

      let myRemoveHtml = removeHtml();

      myRemoveHtml.write(fakeFile);

      myRemoveHtml.once('data',(file)=>{
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'),fileContents);
        done();
      });
    });
});
