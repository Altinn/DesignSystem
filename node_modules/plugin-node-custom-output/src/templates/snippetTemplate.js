var fs = require('fs-extra'); 
var path = require('path');
var stringExtensions = require('../extensions/stringExtensions');
var util = require('../util');

module.exports = {
    generateOutput: function(patternlab, pattern) {
        var regexForwardslashBackslash = /\\|\//g;
        if (pattern.relPath.indexOf('probably-not-needed') === -1 &&
            pattern.relPath.indexOf('.mustache') !== -1) {
            var patternFile = fs.readFileSync(path.resolve(patternlab.config.paths.public.patterns 
                + pattern.relPath.replace(regexForwardslashBackslash, '-').replace('.mustache', '/') 
                + pattern.relPath.replace(regexForwardslashBackslash, '-').replace('.mustache', ".markup-only.html")), 'utf8');
                
            var patternMarkdownObject = util.getPatternMarkdownObject(patternlab, pattern);

            var template = "<CodeSnippet Format=\"1.1.0\" xmlns=\"http://schemas.microsoft.com/VisualStudio/2005/CodeSnippet\">"
                + "\n\t<Header>"
                + "\n\t\t<Title>{0}</Title>"
                + "\n\t\t<Author>Altinn</Author>"
                + "\n\t\t<Shortcut>{1}</Shortcut>"
                + "\n\t\t<Description>{2}</Description>"
                + "\n\t\t<SnippetTypes>"
                + "\n\t\t\t<SnippetType>Expansion</SnippetType>"
                + "\n\t\t\t<SnippetType>SurroundsWith</SnippetType>"
                + "\n\t\t</SnippetTypes>"
                + "\n\t</Header>"
                + "\n\t<Snippet>"
                + "\n\t\t<Declarations>"
                + "\n\t\t</Declarations>"
                + "\n\t\t<Code Language=\"html\"><![CDATA[@* // Version: {4}, Name: {5}  *@\n{3}\n@* // END {5} *@]]></Code>"
                + "\n\t</Snippet>"
                + "\n</CodeSnippet>";

            var patternName = pattern.relPath.replace(regexForwardslashBackslash, '-').replace('.mustache', '');
            var snippet = stringExtensions.format(template, 
                patternName, 
                patternName, 
                patternMarkdownObject.content.replace(/^[\r\n]+|[\r\n]+$/g, ''),
                patternFile,
                patternMarkdownObject.data.version,
                patternName);

            fs.outputFileSync(patternlab.config.pncoConfig.snippetsDirectory 
                + pattern.relPath.replace('.mustache', '.snippet'),
                snippet);
        }
    }   
};


