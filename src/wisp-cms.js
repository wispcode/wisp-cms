/**
 * Wisp CMS: a client-side cms and content loader. Accepts an optional 
 * configuration object from window.wispConfig; any keys it omits use 
 * the defaults below.
 *
 * @example
 *
 * window.wispConfig = {
 *     contentFolder    : "/pages",
 *     contentExtension : "html",
 *     defaultRoute     : "/main/home",
 *     defaultLayout    : "/layouts/default.html",
 *     rootSelector     : "#root"
 * }
 */
(function (userConfig) {
    /**
     * Defines the default configuration. Merge it with the user configuration.
     *
     * @type {object} 
     */
    const cmsConfig = {
        ...{
            contentFolder       : "/pages",
            contentExtension    : "html",
            defaultRoute        : "/home",
            defaultLayout       : "/layouts/default.html",
            rootSelector        : "#root"
        },
        ...userConfig
    };

    /**
     * Builds the page, updates meta information, and injects scripts.
     * @param {string} route
     */
    async function wispInit(route) {
        //
        // Define the constants used to generate the page.
        //
        const rootElement   = document.querySelector(cmsConfig.rootSelector);
        const pageURL       = `${cmsConfig.contentFolder}${route}.${cmsConfig.contentExtension}`;
        const pageSource    = await wispFetch(pageURL, "<h1>Page not found</h1>");
        const pageConfig    = wispGetPageConfig(pageSource);
        const pageHTML      = wispRenderContent(pageSource);
        const layoutHTML    = await wispFetch(pageConfig.layout, "{content}");

        if(pageConfig.redirect) {
            location.replace(pageConfig.redirect);
            return;
        }

        //
        // Replace the root element with the generated HTML.
        //
        rootElement.innerHTML = layoutHTML.replace("{content}", () => pageHTML);

        //
        // Replace the title element if provided in pageConfig.
        //
        if(pageConfig.title) {
            document.title = pageConfig.title;
        }   

        //
        // Replace meta statements if listed in pageConfig.
        //
        wispSetMeta('meta[name="author"]', pageConfig.author);    
        wispSetMeta('meta[name="description"]', pageConfig.description);

        //
        // Inject the script or module listed in pageConfig.
        //
        wispInjectScript(pageConfig.script, "");
        wispInjectScript(pageConfig.module, "module");                
    }

    /**
     * Convert page source into HTML based on the content extension.
     *
     * @param {string} source - The raw page file.
     * @returns {string} The page HTML.
     */
    function wispRenderContent(source) {
        if(cmsConfig.contentExtension.toLowerCase() !== "md") {
            return source;
        }

        return marked.parse(wispAddContainers(source));
    }

    /** 
     * Normalize a URL pathname into a route the loader can use.
     *
     * @param {string} pathname - The pathname
     * @returns {string} 
     *
     * @example
     *
     * wispResolveRoute("/");            // "/main/home" (cmsConfig.defaultRoute)
     * wispResolveRoute("/main/hours/"); // "/main/hours"
     * wispResolveRoute("/main/hours");  // "/main/hours"
     */
    function wispResolveRoute(pathname) {
        if(pathname === "/") {
            return cmsConfig.defaultRoute;
        }
        //
        // Remove the trailing slash and extension.
        //
        return pathname.replace(/\/$/, "")
                       .replace(/\.(html?|md)$/, "");                     
    }

    /**
     * Return the contents of a file, or a fallback string if it doesn't exist.
     * @param {string} url - The url
     * @param {string} [fallback=""] - The fallback string
     * @returns {Promise<string>}
     */
    async function wispFetch(url, fallback = "") {
        if(!url) { return fallback; }
       
        try {
            const response = await fetch(url);

            if(response.ok) {
                return await response.text();
            }
        }
        catch { }

        return fallback;
    }
    
    /**
     * Returns the page configuration from single-line comment directives.
     *
     * @param {string} html - The page content.
     * @returns {Object} The directives as key-value pairs.
     *
     * @example
     *
     * <!--@title:          Hours-->
     * <!--@description:    Hours and closures for all our locations.-->
     * <!--@author:         WispCMS-->
     * <!--@layout:         /layouts/navigation.html-->
     * <!--@script:         /scripts/hours.js-->
     * <!--@module:         /scripts/hours.mjs-->
     * <!--@redirect:       /errors/redirected-->
     */
    function wispGetPageConfig(html) {
        const config = {
            layout      : "",
            script      : "",
            module      : "",
            title       : "",
            description : "",
            author      : "",
            redirect     : ""
        };

        //
        // Match single-line comments that begin with an at-sign.
        //
        for(const item of html.matchAll(/<!--@(\w+):\s*(.*?)\s*-->/g)) {
            const key   = item[1];
            const value = item[2];
            
            config[key] = value;
        }

        //
        // Replace undefined page layout with the default layout.
        //
        if(!config.layout) {
            config.layout = cmsConfig.defaultLayout;
        }

        return config;
    }

	/**
	 * Converts ::: container fences into div elements.
	 * @param {string} markdown
	 * @returns {string}
     *
     * @example
     *     
     * :::class1 class2 class3
     * Text
     * :::
	 */
    function wispAddContainers(markdown) {
        //
		// Define the patterns for opening and closing fences.
		//
		const openingFence = /^:::[ \t]*([\w-]+(?:[ \t]+[\w-]+)*)[ \t]*\r?$/gm;
		const closingFence = /^:::[ \t]*\r?$/gm;

		//
		// Replace the fences with divs, padded with blank lines so the
		// content inside is still parsed as markdown.
		//
        return markdown
			.replace(openingFence, '\n<div class="$1">\n')
			.replace(closingFence, '\n</div>\n');        
    }
 
    /**
     * Set a meta statement on the page if a value is provided.
     *
     * @param {string} selector - The selector string. 
     * @param {string} value - The content value. Does nothing if blank.
     */
    function wispSetMeta(selector, value) {
        if(value) {
             document.querySelector(selector)?.setAttribute("content", value);
        }
    }

    /**
     * Inject a script tag to the end of the body.
     *
     * @param {string} src - The script URL. Does nothing if blank.
     * @param {string} type - "" for classic, "module" for ES module.
     */
    function wispInjectScript(src, type = "") {
        if(src) {
            const scriptElement = document.createElement("script");
            
            //
            // Set the attributes.
            //
            scriptElement.setAttribute("src", src);
            scriptElement.setAttribute("type", type);

            //
            // Inject the element.
            //
            document.body.appendChild(scriptElement);
        }
    }

    //
    // Resolve the route and initialize the page.
    //
    wispInit(
        wispResolveRoute(location.pathname)
    );

})(window.wispConfig || {});
