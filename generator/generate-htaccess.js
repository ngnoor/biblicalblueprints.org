const redirects = require(`./redirects.json`)
const fs = require(`fs`)

const relative = path => require(`path`).join(__dirname, path)
const singleRedirectRule = (from, to) => `
RewriteCond %{REQUEST_URI} ^${ trimTrailingSlash(from) }(/|$)
RewriteRule (.*) "${ to }" [R=301]
`
const trimTrailingSlash = url => url[url.length - 1] === `/`
	? url.slice(0, -1)
	: url

main()

function main() {
	fs.writeFileSync(relative(`../public/.htaccess`), generate(redirects))
}


function generate(redirects) {
	return `
AddOutputFilterByType DEFLATE text/html text/plain text/css

ExpiresActive On
ExpiresDefault "access plus 4 hours"
ExpiresByType text/html A90
ExpiresByType text/plain A3600
ExpiresByType text/css A3600

<IfModule mod_rewrite.c>
RewriteEngine On

RewriteCond %{HTTPS} off
RewriteCond %{HTTP_HOST} !localhost [NC]
RewriteCond %{HTTP_HOST} !192.168 [NC]
RewriteRule (^.*) https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

RewriteBase /

${ redirects.map(([ from, to ]) => singleRedirectRule(from, to)).join(``) }
`
}

