Client-Side Configuration
===========================================================

Define `wispConfig` before loading Wisp to change its defaults. Omitted options keep their defaults.

**Example**

	<script>
		window.wispConfig = {
			contentExtension : "md",
			defaultRoute     : "/main/welcome"
		};
	</script>

	<script src="/scripts/wisp.min.js"></script>

| Option             | Default                   | Description                         |
|--------------------|---------------------------|-------------------------------------|
| `contentFolder`    | `"/pages"`                | Folder containing pages.            |
| `contentExtension` | `"html"`                  | Page format: `"html"` or `"md"`.    |
| `defaultRoute`     | `"/main/home"`            | Page shown at `/`.                  |
| `defaultLayout`    | `"/layouts/default.html"` | Layout for pages without `@layout`. |
| `rootSelector`     | `"#root"`                 | Element where content appears.      |

Markdown
-----------------------------------------------------------

Pages can be written in Markdown instead of HTML. Set `contentExtension` to `"md"` and load Marked before Wisp.

	<script>
		window.wispConfig = {
			contentExtension : "md"
		};
	</script>
    
	<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
	<script src="/scripts/wisp.min.js"></script>

-----

[Next: Server-Side Configuration >](/docs/08-server-config.md)