'use strict'

/*
 * adonisjs-documentation
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const pify = use('pify')
const Docket = use('docketjs')
const fs = use('fs')
const Helpers = use('Helpers')

class Version30 {

  constructor () {
    this.menu = new Docket.Menu()
    this.menu.load(Helpers.storagePath('menu/3.0.json'))
  }

  /**
   * Returns a doc content and it's meta information.
   *
   * @param  {String} permalink
   *
   * @return {Object}
   *
   * @throws {Error} If unable to find the doc template
   */
  * getDoc (permalink) {
    const contents = yield pify(fs.readFile)(Helpers.storagePath(`docs/3.0/${permalink}.html`), 'utf8')
    const meta = this.menu.getChild(permalink)
    return {contents, meta}
  }

  /**
   * Returns category tree to be used for rendering the
   * sidebar.
   *
   * @return {Object}
   */
  getCategories () {
    return this.menu.tree([
      'getting-started',
      'guides',
      'database',
      'models',
      'tutorial',
      'providers',
      'general-topics'
    ])
  }

}

module.exports = Version30
