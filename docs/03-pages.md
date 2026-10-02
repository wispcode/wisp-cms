Pages
===========================================================

Pages go inside the `pages` folder, organized into subfolders. Each file's path becomes its URL: `pages/main/story.html` is served at `/main/story`.

**Example**

	/
	├── pages/
	│   ├── main/
	│   │   ├── home.html
	│   │   ├── story.html
	│   │   └── contact.html
	│   └── menus/
	│       ├── coffee.html
	│       └── pastries.html
	└── default.html

Writing Pages
-----------------------------------------------------------

Pages are written in HTML by default. To write them in Markdown instead, see [Configuration](02-configuration.md) and the [Markdown guide](https://www.markdownguide.org/basic-syntax/).

**Example**

	<!--@title: Our Story-->
	
	<h1>Our Story</h1>
	<p>
        Our coffee house began as a quiet idea between two friends who loved 
        early mornings and long conversations. Tucked into a narrow brick 
        storefront on a sleepy street, it opened with just a few tables, a 
        hand-painted sign, and a promise to serve coffee that felt like home.
    </p>

    <p>
        Word spread slowly, then all at once — artists, students, and neighbors 
        started showing up not just for the drinks, but for the warmth. Over 
        time, the space grew into a local fixture, known for its handwritten 
        menus, mismatched chairs, and the smell of fresh espresso drifting out 
        onto the sidewalk.
    </p>

Directives
-----------------------------------------------------------

Directives are comments at the top of a page that set its title, layout, and scripts. Each is optional, and each may appear once.

| Directive      | Description                                  | Example                                      |
|----------------|----------------------------------------------|----------------------------------------------|
| `@title`       | Browser tab title.                           | `<!--@title: Hours-->`                       |
| `@description` | Search engine description.                   | `<!--@description: Hours and closures.-->`   |
| `@author`      | Page author.                                 | `<!--@author: Library Staff-->`              |
| `@layout`    | Layout to use instead of the default.        | `<!--@template: /layouts/wide.html-->`       |
| `@script`      | Classic script to load.                      | `<!--@script: /scripts/hours.js-->`          |
| `@module`      | ES module to load.                           | `<!--@module: /scripts/hours.mjs-->`         |
| `@redirect`    | Send visitors to another page instead.       | `<!--@redirect: /main/contact-->`            |
 
-----

[Next: Styles >](/docs/04-styles.md)