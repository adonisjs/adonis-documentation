'use strict'

const Versions = use('App/Services/Versions')
const Env = use('Env')

class DocsController {

  * index (request, response) {
    const latestVersion = Env.get('LATEST_DOCS_VERSION')
    const docsVersion = request.param('version')
    const permalink = request.param('permalink')

    /**
     * Redirect when not a valid documentation version
     */
    if (!Versions.hasVersion(docsVersion)) {
      const toUrl = permalink || docsVersion
      return response.status(301).redirect(`/docs/${latestVersion}/${toUrl}`)
    }

    /**
     * Redirect when permalink is not defined
     */
    if (!permalink) {
      return response.status(301).redirect(`/docs/${latestVersion}/overview`)
    }

    /**
     * Try to find the related doc for the permalink and
     * throw error when unable to find it.
     */
    try {
      const version = Versions.load(docsVersion)
      const doc = yield version.getDoc(permalink)
      const menu = version.getCategories()
      yield response.sendView('docs', {contents: doc.contents, menu: menu, meta: doc.meta, version: docsVersion})
    } catch (e) {
      response.status(301).redirect(`/docs/${latestVersion}/overview`)
    }
  }

}

module.exports = DocsController
