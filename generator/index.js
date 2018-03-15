require(`svelte/ssr/register`)

const fs = require(`fs`)
const path = require(`path`)
const paramCase = require(`param-case`)

const Wrapper = require(`../components/Wrapper.html`)

const relativeCwd = (...paths) => path.join(process.cwd(), ...paths)

const defaultData = { rootPath: `./` }
module.exports = (pageFiles, outputDirectory, data = defaultData) => {
	pageFiles.forEach(file => {
		const Page = require(relativeCwd(file))

		const html = makeHtml(Wrapper.render(Object.assign({
			Page,
		}, data)))

		const { name, ext } = path.parse(file)

		const outputFileName = paramCase(name) + ext
		fs.writeFileSync(relativeCwd(outputDirectory, outputFileName), html)
	})
}


function makeHtml({ html, head, css }) {
	return `<!DOCTYPE html>
<html>
	<head>
		<style>
			${ css.code }
		</style>
		${ head }
	</head>
	<body>
		${ html }
	</body>
</html>
`
}
