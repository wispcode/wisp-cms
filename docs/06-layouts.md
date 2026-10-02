Layouts
===========================================================

Layouts wrap page content with shared structure like sidebars or section navigation. They live in the `layouts` folder.

**Example**

	/
	├── layouts/
	│   ├── default.html
	│   └── menu.html
	├── pages/
	│   └── ...
	└── default.html

Every page uses `layouts/default.html` unless it chooses another with the `@template` directive.

	<!--@layout: /layouts/menu.html-->

Writing Templates
-----------------------------------------------------------

Layouts are partial HTML files. Each must include `{content}` where the page content goes. Without it, the page displays nothing.

**Example**

	<div>
		<nav>
			<a href="/menus/coffee">Coffee</a>
			<a href="/menus/pastries">Pastries</a>
		</nav>
		<div>
			{content}
		</div>
	</div>
    
-----

[Next: Pages >](07-client-config.md)