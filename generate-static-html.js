const fs = require(`fs`)
const path = require(`path`)

const directoryContents = fs.readdirSync(`./pages`)

const pages = directoryContents
	.map(filename => path.parse(filename))
	.filter(({ ext }) => ext === `.html`)
	.map(({ name, ext }) => path.join(`pages`, name + ext))

require(`./generator/index.js`)(pages, `public/`)
