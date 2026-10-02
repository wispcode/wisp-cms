# Styles

## Site Styles

Link stylesheets in `default.html`. They apply to every page.

	<link rel="stylesheet" href="/styles/site.css">

## Containers

Markdown only. Wrap content in `:::` with one or more class names to create a styled `div`. Markdown inside is still parsed.

	::: note warning
	Some **important** text.
	:::

_Output_

	<div class="note warning">
		<p>Some <strong>important</strong> text.</p>
	</div>

    
-----

[Next: Scripts >](005-scripts.md)