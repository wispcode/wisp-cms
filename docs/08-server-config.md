Server-Side Configuration
===========================================================

Wisp needs no backend or database, only a web server with static files and URL rewriting.

URL Rewrites
-----------------------------------------------------------

The rewrite sends `default.html` for any URL with a matching page:

1. Skip requests for real files and folders.
2. Check if `/pages/{path}.html` exists.
3. If it does, serve `/default.html`.

The extension must match `contentExtension`. For Markdown sites, change `.html` to `.md` in the examples.

### Nginx

Add to your site's `server` block.

	location / {
		index default.html;
		try_files $uri $uri/ @wisp;
	}

	location @wisp {
		if (-f $document_root/pages$uri.html) {
			rewrite ^ /default.html last;
		}
		return 404;
	}

### Apache

Add to `.htaccess` in the site root.

	DirectoryIndex default.html
	RewriteEngine On
	RewriteBase /

	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{DOCUMENT_ROOT}/pages%{REQUEST_URI}.html -f
	RewriteRule ^.*$ /default.html [L]

### IIS

Add to `web.config` in the site root. Requires the URL Rewrite module.

	<configuration>
		<system.webServer>
			<defaultDocument>
				<files>
					<add value="default.html" />
				</files>
			</defaultDocument>
			<rewrite>
				<rules>
					<rule name="Wisp Pages" stopProcessing="true">
						<match url=".*" />
						<conditions>
							<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
							<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
							<add input="{APPL_PHYSICAL_PATH}pages{URL}.html" matchType="IsFile" />
						</conditions>
						<action type="Rewrite" url="/default.html" />
					</rule>
				</rules>
			</rewrite>
		</system.webServer>
	</configuration>

### ASP.NET Core

Add to `Program.cs`, after `builder.Build()`.

	var rewriter = new RewriteOptions().Add(context =>
	{
		var path = context.HttpContext.Request.Path.Value ?? "";

		if (File.Exists(Path.Combine(app.Environment.WebRootPath, "pages", path.TrimStart('/') + ".html")))
		{
			context.HttpContext.Request.Path = "/default.html";
		}
	});

	app.UseDefaultFiles();
	app.UseRewriter(rewriter);
	app.UseStaticFiles();

Permissions
-----------------------------------------------------------

Access is controlled by the operating system. To let someone edit pages, give them write access to the `pages` folder.