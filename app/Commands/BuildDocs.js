'use strict'

const Command = use('Command')
const Helpers = use('Helpers')
const Docket = use('docketjs')

class BuildDocs extends Command {

  constructor () {
    super()
    this.parsersExtensions = {
      markdown: ['.md'],
      adoc: ['.adoc']
    }

    this.parserChoices = [{
      name: 'Markdown',
      value: 'markdown'
    }, {
      name: 'Ascii Doc',
      value: 'adoc'
    }]
  }

  get signature () {
    const repo = '{repo:The github repo to read docs from}'
    const branch = '{--branch=@value}'
    const parser = '{--parser=@value}'
    const version = '{--docVersion=@value}'
    const folder = '{--folder=@folder}'
    return `build:docs ${repo} ${branch} ${parser} ${folder} ${version}`
  }

  get description () {
    return 'Parse markdown or asciidoc docs from Github to HTML files'
  }

  * _askQuestions (options) {
    /**
     * Ask for the branch if not defined
     */
    if (!options.branch) {
      options.branch = yield this
        .ask('Define repo branch', 'develop')
        .print()
    }

    /**
     * Ask for the parser if not defined
     */
    if (!options.parser) {
      options.parser = yield this
        .choice('Select the documentation parser', this.parserChoices)
        .validate(function (value) {
          return !value ? 'Select a valid parser' : true
        })
        .print()
    }

    /**
     * Ask for the version if not defined
     */
    if (!options.docVersion) {
      options.docVersion = yield this
        .ask('Define a version of documentation')
        .validate(function (value) {
          return !value ? 'Define documentation version' : true
        })
        .print()
    }
  }

  /**
   * Returns the parser instance to be used based
   * upon the parser name
   *
   * @param   {String} parser
   *
   * @return  {Object}
   *
   * @private
   */
  _getParser (parser) {
    return parser === 'markdown'
    ? new Docket.Markdown({}, {maxDepth: 2})
    : new Docket.AsciiDoc([
      'icons=font',
      'skip-front-matter',
      'sectlinks',
      'sectanchors',
      'toc=macro',
      'linkattrs=true',
      'showtitle=true',
      'toclevels=1'
    ])
  }

  * handle (args, options) {
    yield this._askQuestions(options)

    const allowedExtensions = this.parsersExtensions[options.parser]
    const folder = options.folder || ''
    const ghReader = new Docket.GithubReader(args.repo, options.branch, folder, allowedExtensions)
    const menu = new Docket.Menu(Helpers.storagePath(`menu/${options.docVersion}.json`))
    const writer = new Docket.FSWriter(Helpers.storagePath(`docs/${options.docVersion}`))

    const parser = this._getParser(options.parser)
    const manager = new Docket.Manager(ghReader, parser, writer, menu)

    manager.on('writing', (doc) => {
      this.completed('converted', `${doc.meta.permalink}.html`)
    })

    try {
      yield manager.convert()
      this.success(`${this.icon('success')} Parsed successfully`)
    } catch (e) {
      this.error(e)
    }
  }

}

module.exports = BuildDocs
