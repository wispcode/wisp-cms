Site
===========================================================

The following is a minimum site structure. Pages are HTML by default; for Markdown, see [Configuration](02-configuration.md).

**Example**

	/
	├── layouts/
	│   └── default.html
	├── pages/
	│   └── main/
	│       └── home.html
	└── default.html

default.html
-----------------------------------------------------------

The site shell, holding shared navigation, styles, and scripts. Page content appears in the `id="root"` element by default.

**Example**

	<!doctype html>
	<html>
		<head>
			<link rel="stylesheet" href="/styles/site.css">
		</head>
		<body>
			<header>
				<nav>
					<a href="#">Link 1</a>
					<a href="#">Link 2</a>
					<a href="#">Link 3</a>
					<a href="#">Link 4</a>
				</nav>
			</header>

			<main id="root">
				<!--Content is generated here-->
			</main>

			<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
			<script src="/scripts/wisp.min.js"></script>
		</body>
	</html>

layouts/default.html
-----------------------------------------------------------

This is the layout used by every page that doesn't choose its own. Page content replaces `{content}`.

**Example**

    <section>
        {content}
    </section>

home.html
-----------------------------------------------------------

This is the homepage, shown when someone opens the website without a path. 

The folder, file type, homepage, and root element can all be changed. See [Configuration](02-configuration.md).

-----

[Next: Pages >](03-pages.md)