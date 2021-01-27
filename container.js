const dependable = require('dependable')
const path = require('path')

const container = dependable.container()

const dependencies = [
	['_', 'lodash'],
	['async', 'async'],
]

dependencies.forEach(function (dependency) {
	container.register(dependency[0], function () {
		return require(dependency[1])
	})
})

container.load(path.join(__dirname, '/controllers'))
container.load(path.join(__dirname, '/helpers'))

container.register('container', function () {
	return container
})

module.exports = container
