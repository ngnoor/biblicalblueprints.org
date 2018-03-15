require(`svelte/ssr/register`)

const fs = require(`fs`)
const path = require(`path`)
const paramCase = require(`param-case`)

const Wrapper = require(`../components/Wrapper.html`)

const relative = (...paths) => path.join(__dirname, ...paths)

module.exports = (pageFiles, outputDirectory) => {
	pageFiles.forEach(file => {
		const Page = require(file)

		const html = makeHtml(Wrapper.render({
			Page,
		}))

		const { name, ext } = path.parse(file)

		const outputFileName = paramCase(name) + ext
		fs.writeFileSync(relative(outputDirectory, outputFileName), html)
	})
}


function makeHtml({ html, head, css }) {
	return `<!DOCTYPE html>
<html>
	<head>
		${ head }
		<style>
			${ css.code }
		</style>
	</head>
	<body>
		${ html }
	</body>
</html>
`
}
