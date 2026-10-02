Scripts
=====================================================

Site Scripts
-----------------------------------------------------------

Add scripts used on every page to `default.html`.

	<script src="/scripts/site.js"></script>

Page Scripts
-----------------------------------------------------------

Load a script on a single page with a directive at the top of the page.

	<!--@script: /scripts/hours.js-->

For an ES module, use `@module` instead.

	<!--@module: /scripts/hours.mjs-->

Page scripts run after the page content loads. Keep script files outside the `pages` folder.

**Note:** Scripts inside layouts do not run.

-----

[Next: Templates >](/docs/06-layouts.md)