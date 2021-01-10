const dependable = require('dependable')
const path = require('path')

const container = dependable.container()

const dependencies = [['_', 'lodash']]

dependencies.forEach(function (dependency) {
	container.register(dependency[0], function () {
		return require(dependency[1])
	})
})
