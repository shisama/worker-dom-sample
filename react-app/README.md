react-app
===

Trying to work React app built with create-react-app on WebWorker using worker-dom.

# How

## Step1

```
npx create-react-app react-app --scripts-version=react-scripts-ts

cd react-app
```

## Step2

```
npm run eject
```

## Step3

Change files.

```diff
--- a/react-app/config/webpack.config.prod.js
+++ b/react-app/config/webpack.config.prod.js
@@ -37,7 +37,7 @@ if (env.stringified['process.env'].NODE_ENV !== '"production"') {
 }
 
 // Note: defined here because it will be used more than once.
-const cssFilename = 'static/css/[name].[contenthash:8].css';
+const cssFilename = 'static/css/[name].css';
 
 // ExtractTextPlugin expects the build output to be flat.
 // (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
@@ -65,8 +65,8 @@ module.exports = {
     // Generated JS file names (with nested folders).
     // There will be one main bundle, and one file per asynchronous chunk.
     // We don't currently advertise code splitting but Webpack supports it.
-    filename: 'static/js/[name].[chunkhash:8].js',
-    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
+    filename: 'static/js/[name].js',
+    chunkFilename: 'static/js/[name].chunk.js',
     // We inferred the "public path" (such as / or /my-project) from homepage.
     publicPath: publicPath,
     // Point sourcemap entries to original disk location (format as URL on Windows)
@@ -138,11 +138,11 @@ module.exports = {
           // "url" loader works just like "file" loader but it also embeds
           // assets smaller than specified size as data URLs to avoid requests.
           {
-            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
+            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
             loader: require.resolve('url-loader'),
             options: {
               limit: 10000,
-              name: 'static/media/[name].[hash:8].[ext]',
+              name: 'static/media/[name].[ext]',
             },
           },
           {
@@ -240,7 +240,7 @@ module.exports = {
             // by webpacks internal loaders.
             exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
             options: {
-              name: 'static/media/[name].[hash:8].[ext]',
+              name: 'static/media/[name].[ext]',
             },
           },
           // ** STOP ** Are you adding a new loader?
@@ -258,7 +258,7 @@ module.exports = {
     new InterpolateHtmlPlugin(env.raw),
     // Generates an `index.html` file with the <script> injected.
     new HtmlWebpackPlugin({
-      inject: true,
+      inject: false,
       template: paths.appHtml,
       minify: {
         removeComments: true,
```
```diff
--- a/react-app/public/index.html
+++ b/react-app/public/index.html
@@ -20,21 +20,21 @@
       Learn how to configure a non-root public URL by running `npm run build`.
     -->
     <title>React App</title>
+    <link rel="stylesheet" href="./static/css/main.css" />
   </head>
   <body>
     <noscript>
       You need to enable JavaScript to run this app.
     </noscript>
-    <div id="root"></div>
-    <!--
-      This HTML file is a template.
-      If you open it directly in the browser, you will see an empty page.
-
-      You can add webfonts, meta tags, or analytics to this file.
-      The build step will place the bundled scripts into the <body> tag.
-
-      To begin the development, run `npm start` or `yarn start`.
-      To create a production bundle, use `npm run build` or `yarn build`.
-    -->
+    <div src="./static/js/main.js" id="hello">
+      <div id="root"></div>
+    </div>
+    <script>
+      
+    </script>
+    <script type="module">
+        import {upgradeElement} from 'https://unpkg.com/@ampproject/worker-dom@0.2.8/dist/index.mjs';
+        upgradeElement(document.getElementById('hello'), 'https://unpkg.com/@ampproject/worker-dom@0.2.8/dist/unminified.worker.mjs');
+    </script>
   </body>
 </html>
```

```diff
--- a/react-app/src/registerServiceWorker.ts
+++ b/react-app/src/registerServiceWorker.ts
@@ -9,15 +9,16 @@
 // To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
 // This link also includes instructions on opting out of this behavior.
 
-const isLocalhost = Boolean(
-  window.location.hostname === 'localhost' ||
-    // [::1] is the IPv6 localhost address.
-    window.location.hostname === '[::1]' ||
-    // 127.0.0.1/8 is considered localhost for IPv4.
-    window.location.hostname.match(
-      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
-    )
-);
+const isLocalhost = false;
 
 export default function register() {
   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
```

## Step4

```
npm run build
```