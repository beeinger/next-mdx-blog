# Guide for adding articles

> To check if everything worked as you expected just do `yarn` - to install dependencies, `yarn dev` - to run the code and open it on [`localhost:3000`](http://localhost:3000)

1. Each article's folder structure should be:

   > Put it inside `/app/articles/` folder

   - `<slug>` - folder
     - `page.mdx` - article's content
     - `<any other files>` - article's assets, like images

2. Each article's `<slug>` should be:

   - unique
   - put as the folder name
   - use `kebab-case` naming convention

3. Each article should export a `metadata` object, e.g.:

   ```ts
   import image from "./image.png";

   export const metadata = {
     title: "What are Storage Proofs and how can they improve Oracles?",
     description: `What are Storage Proofs and how can they improve Oracles?
   Trustless Cross-Chain Information Access on Starknet`,
     date: "Apr 21, 2023",
     authors: ["Starknet"],
     //? Image has to be imported from the folder of the article
     image,
   };
   ```

   > Extensive metadata is not required, though recommended, essential fields are: `title`, `description`, `date`, `authors`, `image`

4. Metadata should match the following type:

   > Don't get scared by the huge object below, it's Next.js Metadata object that translates to meta tags and is needed for better SEO, if you don't care just use the Required/Recommended fields

   ````ts
   {

    <!-- Required/Recommended -->

    title: string;
    description: string;
    image: string;
    date: string;
    authors: string | string[];

    <!-- Full Metadata possibilities, SEO -->

    /**
     * The base path and origin for absolute urls for various metadata links such as OpenGraph images.
     */
    metadataBase?: null | URL;
    /**
     * The document title.
     * @example
     * ```tsx
     * "My Blog"
     * <title>My Blog</title>
     *
     * { default: "Dashboard", template: "%s | My Website" }
     * <title>Dashboard | My Website</title>
     *
     * { absolute: "My Blog", template: "%s | My Website" }
     * <title>My Blog</title>
     * ```
     */
    title?: null | string | TemplateString;
    /**
     * The document description, and optionally the OpenGraph and twitter descriptions.
     * @example
     * ```tsx
     * "My Blog Description"
     * <meta name="description" content="My Blog Description" />
     * ```
     */
    description?: null | string;
    /**
     * The application name.
     * @example
     * ```tsx
     * "My Blog"
     * <meta name="application-name" content="My Blog" />
     * ```
     */
    applicationName?: null | string;
    /**
     * The authors of the document.
     * @example
     * ```tsx
     * [{ name: "Next.js Team", url: "https://nextjs.org" }]
     *
     * <meta name="author" content="Next.js Team" />
     * <link rel="author" href="https://nextjs.org" />
     * ```
     */
    authors?: null | Author | Array<Author>;
    /**
     * The generator used for the document.
     * @example
     * ```tsx
     * "Next.js"
     *
     * <meta name="generator" content="Next.js" />
     * ```
     */
    generator?: null | string;
    /**
     * The keywords for the document. If an array is provided, it will be flattened into a single tag with comma separation.
     * @example
     * ```tsx
     * "nextjs, react, blog"
     * <meta name="keywords" content="nextjs, react, blog" />
     *
     * ["react", "server components"]
     * <meta name="keywords" content="react, server components" />
     * ```
     */
    keywords?: null | string | Array<string>;
    /**
     * The referrer setting for the document.
     * @example
     * ```tsx
     * "origin"
     * <meta name="referrer" content="origin" />
     * ```
     */
    referrer?: null | ReferrerEnum;
    /**
     * The theme color for the document.
     * @example
     * ```tsx
     * "#000000"
     * <meta name="theme-color" content="#000000" />
     *
     * { media: "(prefers-color-scheme: dark)", color: "#000000" }
     * <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
     *
     * [
     *  { media: "(prefers-color-scheme: dark)", color: "#000000" },
     *  { media: "(prefers-color-scheme: light)", color: "#ffffff" }
     * ]
     * <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
     * <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
     * ```
     */
    themeColor?: null | string | ThemeColorDescriptor | ThemeColorDescriptor[];
    /**
     * The color scheme for the document.
     * @example
     * ```tsx
     * "dark"
     * <meta name="color-scheme" content="dark" />
     * ```
     */
    colorScheme?: null | ColorSchemeEnum;
    /**
     * The viewport setting for the document.
     * @example
     * ```tsx
     * "width=device-width, initial-scale=1"
     * <meta name="viewport" content="width=device-width, initial-scale=1" />
     *
     * { width: "device-width", initialScale: 1 }
     * <meta name="viewport" content="width=device-width, initial-scale=1" />
     * ```
     */
    viewport?: null | string | Viewport;
    /**
     * The creator of the document.
     * @example
     * ```tsx
     * "Next.js Team"
     * <meta name="creator" content="Next.js Team" />
     * ```
     */
    creator?: null | string;
    /**
     * The publisher of the document.
     * @example
     *
     * ```tsx
     * "Vercel"
     * <meta name="publisher" content="Vercel" />
     * ```
     */
    publisher?: null | string;
    /**
     * The robots setting for the document.
     *
     * @see https://developer.mozilla.org/en-US/docs/Glossary/Robots.txt
     * @example
     * ```tsx
     * "index, follow"
     * <meta name="robots" content="index, follow" />
     *
     * { index: false, follow: false }
     * <meta name="robots" content="noindex, nofollow" />
     * ```
     */
    robots?: null | string | Robots;
    /**
     * The canonical and alternate URLs for the document.
     * @example
     * ```tsx
     * { canonical: "https://example.com" }
     * <link rel="canonical" href="https://example.com" />
     *
     * { canonical: "https://example.com", hreflang: { "en-US": "https://example.com/en-US" } }
     * <link rel="canonical" href="https://example.com" />
     * <link rel="alternate" href="https://example.com/en-US" hreflang="en-US" />
     * ```
     *
     * Multiple titles example for alternate URLs except `canonical`:
     * ```tsx
     * {
     *   canonical: "https://example.com",
     *   types: {
     *     'application/rss+xml': [
     *       { url: 'blog.rss', title: 'rss' },
     *       { url: 'blog/js.rss', title: 'js title' },
     *     ],
     *   },
     * }
     * <link rel="canonical" href="https://example.com" />
     * <link rel="alternate" href="https://example.com/blog.rss" type="application/rss+xml" title="rss" />
     * <link rel="alternate" href="https://example.com/blog/js.rss" type="application/rss+xml" title="js title" />
     * ```
     */
    alternates?: null | AlternateURLs;
    /**
     * The icons for the document. Defaults to rel="icon".
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel#attr-icon
     * @example
     * ```tsx
     * "https://example.com/icon.png"
     * <link rel="icon" href="https://example.com/icon.png" />
     *
     * { icon: "https://example.com/icon.png", apple: "https://example.com/apple-icon.png" }
     * <link rel="icon" href="https://example.com/icon.png" />
     * <link rel="apple-touch-icon" href="https://example.com/apple-icon.png" />
     *
     * [{ rel: "icon", url: "https://example.com/icon.png" }, { rel: "apple-touch-icon", url: "https://example.com/apple-icon.png" }]
     * <link rel="icon" href="https://example.com/icon.png" />
     * <link rel="apple-touch-icon" href="https://example.com/apple-icon.png" />
     * ```
     */
    icons?: null | IconURL | Array<Icon> | Icons;
    /**
     * A web application manifest, as defined in the Web Application Manifest specification.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Manifest
     * @example
     * ```tsx
     * "https://example.com/manifest.json"
     * <link rel="manifest" href="https://example.com/manifest.json" />
     * ```
     *
     */
    manifest?: null | string | URL;
    /**
     * The Open Graph metadata for the document.
     *
     * @see https://ogp.me
     * @example
     * ```tsx
     * {
     *   type: "website",
     *   url: "https://example.com",
     *   title: "My Website",
     *   description: "My Website Description",
     *   siteName: "My Website",
     *   images: [{
     *     url: "https://example.com/og.png",
     *   }],
     * }
     *
     * <meta property="og:type" content="website" />
     * <meta property="og:url" content="https://example.com" />
     * <meta property="og:site_name" content="My Website" />
     * <meta property="og:title" content="My Website" />
     * <meta property="og:description" content="My Website Description" />
     * <meta property="og:image" content="https://example.com/og.png" />
     * ```
     */
    openGraph?: null | OpenGraph;
    /**
     * The Twitter metadata for the document.
     * @example
     * ```tsx
     * { card: "summary_large_image", site: "@site", creator: "@creator", "images": "https://example.com/og.png" }
     *
     * <meta name="twitter:card" content="summary_large_image" />
     * <meta name="twitter:site" content="@site" />
     * <meta name="twitter:creator" content="@creator" />
     * <meta name="twitter:title" content="My Website" />
     * <meta name="twitter:description" content="My Website Description" />
     * <meta name="twitter:image" content="https://example.com/og.png" />
     * ```
     *
     */
    twitter?: null | Twitter;
    /**
     * The common verification tokens for the document.
     * @example
     * ```tsx
     * { verification: { google: "1234567890", yandex: "1234567890", "me": "1234567890" } }
     * <meta name="google-site-verification" content="1234567890" />
     * <meta name="yandex-verification" content="1234567890" />
     * <meta name="me" content="@me" />
     * ```
     */
    verification?: Verification;
    /**
     * The Apple web app metadata for the document.
     *
     * @see https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
     * @example
     * ```tsx
     * { capable: true, title: "My Website", statusBarStyle: "black-translucent" }
     * <meta name="apple-mobile-web-app-capable" content="yes" />
     * <meta name="apple-mobile-web-app-title" content="My Website" />
     * <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
     * ```
     *
     */
    appleWebApp?: null | boolean | AppleWebApp;
    /**
     * Indicates if devices should try to interpret various formats and make actionable links out of them. For example it controles
     * if telephone numbers on mobile that can be clicked to dial or not.
     * @example
     * ```tsx
     * { telephone: false }
     * <meta name="format-detection" content="telephone=no" />
     * ```
     *
     */
    formatDetection?: null | FormatDetection;
    /**
     * The metadata for the iTunes App.
     * It adds the `name="apple-itunes-app"` meta tag.
     *
     * @example
     * ```tsx
     * { app: { id: "123456789", affiliateData: "123456789", appArguments: "123456789" } }
     * <meta name="apple-itunes-app" content="app-id=123456789, affiliate-data=123456789, app-arguments=123456789" />
     * ```
     */
    itunes?: null | ItunesApp;
    /**
     * A brief description of what this web-page is about. Not recommended, superseded by description.
     * It adds the `name="abstract"` meta tag.
     *
     * @see https://www.metatags.org/all-meta-tags-overview/meta-name-abstract/
     * @example
     * ```tsx
     * "My Website Description"
     * <meta name="abstract" content="My Website Description" />
     * ```
     */
    abstract?: null | string;
    /**
     * The Facebook AppLinks metadata for the document.
     * @example
     * ```tsx
     * { ios: { appStoreId: "123456789", url: "https://example.com" }, android: { packageName: "com.example", url: "https://example.com" } }
     *
     * <meta property="al:ios:app_store_id" content="123456789" />
     * <meta property="al:ios:url" content="https://example.com" />
     * <meta property="al:android:package" content="com.example" />
     * <meta property="al:android:url" content="https://example.com" />
     * ```
     */
    appLinks?: null | AppLinks;
    /**
     * The archives link rel property.
     * @example
     * ```tsx
     * { archives: "https://example.com/archives" }
     * <link rel="archives" href="https://example.com/archives" />
     * ```
     */
    archives?: null | string | Array<string>;
    /**
     * The assets link rel property.
     * @example
     * ```tsx
     * "https://example.com/assets"
     * <link rel="assets" href="https://example.com/assets" />
     * ```
     */
    assets?: null | string | Array<string>;
    /**
     * The bookmarks link rel property.
     * @example
     * ```tsx
     * "https://example.com/bookmarks"
     * <link rel="bookmarks" href="https://example.com/bookmarks" />
     * ```
     */
    bookmarks?: null | string | Array<string>;
    /**
     * The category meta name property.
     * @example
     * ```tsx
     * "My Category"
     * <meta name="category" content="My Category" />
     * ```
     */
    category?: null | string;
    /**
     * The classification meta name property.
     * @example
     * ```tsx
     * "My Classification"
     * <meta name="classification" content="My Classification" />
     * ```
     */
    classification?: null | string;
    /**
     * Arbitrary name/value pairs for the document.
     */
    other?: {
        [name: string]: string | number | Array<string | number>;
    } & DeprecatedMetadataFields;
   }
   ````
