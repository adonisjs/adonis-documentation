'use strict'

/*
 * adonisjs-documentation
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const versionsImplementations = {
  '3.0': 'App/Services/Versions/Version30',
  '3.1': 'App/Services/Versions/Version31',
  '3.2': 'App/Services/Versions/Version32'
}

const Versions = exports = module.exports = {}

/**
 * Returns a boolen indicating whether a given documentation
 * version exists or not.
 *
 * @param  {String}  version
 *
 * @return {Boolean}
 */
Versions.hasVersion = function (version) {
  return Object.keys(versionsImplementations).indexOf(version) > -1
}

/**
 * Returns instance of a given version number
 *
 * @param  {String} version
 *
 * @return {Object{}
 */
Versions.load = function (version) {
  return make(versionsImplementations[version])
}
