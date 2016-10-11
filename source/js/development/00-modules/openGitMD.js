/* globals $ */
window.openGitMD = function (target) {
  window.open('https://github.com/Altinn/DesignSystem/edit/master/source' +
    $(target).closest('.sg-pattern').find('.patternLink')
      .attr('href').replace(/\.\.\//g, '')
      .replace('patterns', '/_patterns')
      .replace(/(?:[^/*]*)$/, '').slice(0, -1)
      .replace(/-([0-9]{2})/g, '/$1') + '.md', '_blank'
  )
}
