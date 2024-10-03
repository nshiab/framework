import {existsSync} from "node:fs";
import {readFile, readdir, stat} from "node:fs/promises";
import {join} from "node:path/posix";
import {formatPrefix} from "d3-format";
import {themes} from "./docs/themes.md.ts";

let stargazers_count: number;
try {
  ({stargazers_count} = await github("/repos/observablehq/framework"));
} catch (error) {
  if (process.env.CI) throw error;
  stargazers_count = NaN;
}

export default {
  root: "docs",
  output: "docs/.observablehq/dist",
  title: "Observable Framework",
  pager: false,
  pages: [
    // ENGLISH
    {name: "Hi!", path: "/en/index"},
    {
      name: "Examples",
      pages: [
        {name: "Example 1", path: "/en/example-1"},
        {name: "Example 2", path: "/en/example-2"},
        {name: "Example 3", path: "/en/example-3"}
      ]
    },
    // FRENCH
    {name: "Coucou!", path: "/fr/index"},
    {
      name: "Exemples",
      pages: [
        {name: "Exemple 1", path: "/fr/example-1"},
        {name: "Exemple 2", path: "/fr/example-2"},
        {name: "Exemple 3", path: "/fr/example-3"}
      ]
    }
  ],
  dynamicPaths: [
    "/chart.js",
    "/theme/dark",
    "/theme/dark-alt",
    "/theme/dashboard",
    "/theme/light",
    "/theme/light-alt",
    "/theme/wide",
    ...themes.dark.map((theme) => `/theme/${theme}`),
    ...themes.light.map((theme) => `/theme/${theme}`)
  ],
  base: "/framework",
  globalStylesheets: [
    "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Spline+Sans+Mono:ital,wght@0,300..700;1,300..700&display=swap"
  ],
  head: ({path}) => `<link rel="canonical" href="https://observablehq.com/framework${path.replace(/\/index$/, "/")}">
<link rel="apple-touch-icon" href="/observable.png">
<link rel="icon" type="image/png" href="/observable.png" sizes="32x32">${
    process.env.CI
      ? `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-9B88TP6PKQ"></script>
<script>window.dataLayer=window.dataLayer||[];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js',new Date());\ngtag('config','G-9B88TP6PKQ');</script>`
      : ""
  }
<script type="module">/Win/.test(navigator.platform) || Array.from(document.querySelectorAll(".win"), (e) => e.remove())</script>`,
  home: `<span style="display: flex; align-items: center; font-weight: 500; gap: 0.25rem; margin-left: -0.5rem; color: var(--theme-foreground);">
    <svg width="22" height="22" viewBox="0 0 21.92930030822754 22.68549919128418" fill="currentColor">
      <path d="M10.9646 18.9046C9.95224 18.9046 9.07507 18.6853 8.33313 18.2467C7.59386 17.8098 7.0028 17.1909 6.62722 16.4604C6.22789 15.7003 5.93558 14.8965 5.75735 14.0684C5.56825 13.1704 5.47613 12.2574 5.48232 11.3427C5.48232 10.6185 5.52984 9.92616 5.62578 9.26408C5.7208 8.60284 5.89715 7.93067 6.15391 7.24843C6.41066 6.56618 6.74143 5.97468 7.14438 5.47308C7.56389 4.9592 8.1063 4.54092 8.72969 4.25059C9.38391 3.93719 10.1277 3.78091 10.9646 3.78091C11.977 3.78091 12.8542 4.00021 13.5962 4.43879C14.3354 4.87564 14.9265 5.49454 15.3021 6.22506C15.6986 6.97704 15.9883 7.7744 16.1719 8.61712C16.3547 9.459 16.447 10.3681 16.447 11.3427C16.447 12.067 16.3995 12.7593 16.3035 13.4214C16.2013 14.1088 16.0206 14.7844 15.7644 15.437C15.4994 16.1193 15.1705 16.7108 14.7739 17.2124C14.3774 17.714 13.8529 18.1215 13.1996 18.4349C12.5463 18.7483 11.8016 18.9046 10.9646 18.9046ZM12.8999 13.3447C13.4242 12.8211 13.7159 12.0966 13.7058 11.3427C13.7058 10.5639 13.4436 9.89654 12.92 9.34074C12.3955 8.78495 11.7441 8.50705 10.9646 8.50705C10.1852 8.50705 9.53376 8.78495 9.00928 9.34074C8.49569 9.87018 8.21207 10.5928 8.22348 11.3427C8.22348 12.1216 8.48572 12.7889 9.00928 13.3447C9.53376 13.9005 10.1852 14.1784 10.9646 14.1784C11.7441 14.1784 12.3891 13.9005 12.8999 13.3447ZM10.9646 22.6855C17.0199 22.6855 21.9293 17.6068 21.9293 11.3427C21.9293 5.07871 17.0199 0 10.9646 0C4.90942 0 0 5.07871 0 11.3427C0 17.6068 4.90942 22.6855 10.9646 22.6855Z"></path>
    </svg>
    Observable Framework
  </span>`,
  header: `<div style="display: flex; flex-grow: 1; align-items: center; justify-content: space-between; white-space: nowrap;">
    <div>
      <a href="/" class="hide-if-sidebar" style="display: flex; align-items: center; gap: 0.25rem;">
        <svg width="22" height="22" viewBox="0 0 21.92930030822754 22.68549919128418" fill="currentColor" style="align-self: center;">
          <path d="M10.9646 18.9046C9.95224 18.9046 9.07507 18.6853 8.33313 18.2467C7.59386 17.8098 7.0028 17.1909 6.62722 16.4604C6.22789 15.7003 5.93558 14.8965 5.75735 14.0684C5.56825 13.1704 5.47613 12.2574 5.48232 11.3427C5.48232 10.6185 5.52984 9.92616 5.62578 9.26408C5.7208 8.60284 5.89715 7.93067 6.15391 7.24843C6.41066 6.56618 6.74143 5.97468 7.14438 5.47308C7.56389 4.9592 8.1063 4.54092 8.72969 4.25059C9.38391 3.93719 10.1277 3.78091 10.9646 3.78091C11.977 3.78091 12.8542 4.00021 13.5962 4.43879C14.3354 4.87564 14.9265 5.49454 15.3021 6.22506C15.6986 6.97704 15.9883 7.7744 16.1719 8.61712C16.3547 9.459 16.447 10.3681 16.447 11.3427C16.447 12.067 16.3995 12.7593 16.3035 13.4214C16.2013 14.1088 16.0206 14.7844 15.7644 15.437C15.4994 16.1193 15.1705 16.7108 14.7739 17.2124C14.3774 17.714 13.8529 18.1215 13.1996 18.4349C12.5463 18.7483 11.8016 18.9046 10.9646 18.9046ZM12.8999 13.3447C13.4242 12.8211 13.7159 12.0966 13.7058 11.3427C13.7058 10.5639 13.4436 9.89654 12.92 9.34074C12.3955 8.78495 11.7441 8.50705 10.9646 8.50705C10.1852 8.50705 9.53376 8.78495 9.00928 9.34074C8.49569 9.87018 8.21207 10.5928 8.22348 11.3427C8.22348 12.1216 8.48572 12.7889 9.00928 13.3447C9.53376 13.9005 10.1852 14.1784 10.9646 14.1784C11.7441 14.1784 12.3891 13.9005 12.8999 13.3447ZM10.9646 22.6855C17.0199 22.6855 21.9293 17.6068 21.9293 11.3427C21.9293 5.07871 17.0199 0 10.9646 0C4.90942 0 0 5.07871 0 11.3427C0 17.6068 4.90942 22.6855 10.9646 22.6855Z"></path>
        </svg>
        <span>
          <span class="hide-if-small">Observable</span>
          Framework
        </span>
      </a>
    </div>
    <span style="display: flex; align-items: baseline; gap: 1rem;">
      &#8203;
      <a style="font-size: 14px;" target="_blank" title="${
        process.env.npm_package_version
      } release notes" href="https://github.com/observablehq/framework/releases"><span>${
        process.env.npm_package_version
      }</span></a>
      <a style="font-size: 14px;" target="_blank" data-decoration="★" title="${stargazers_count.toLocaleString(
        "en-US"
      )} GitHub stars" href="https://github.com/observablehq/framework"><span>GitHub️ ${
        stargazers_count ? formatPrefix(".1s", 1000)(stargazers_count) : ""
      }</span></a>
    <select id="select-language">
      <option>en</option> 
      <option>fr</option>
    </select>
    </span>
  </div>
    `,
  footer: ({path}) =>
    `<div>© ${new Date().getUTCFullYear()} Observable, Inc.</div>
    <script>

      // Retrieve the current language from the path
      const lang = "${path.split("/")[1]}"

      // Set the language select to the current language
      const selectLanguage = document.getElementById("select-language");
      selectLanguage.value = lang;

      // If the user selects a new language, we modify the path and redirect
      selectLanguage.addEventListener("change", (event) => {
        window.location.href = "/" + event.target.value + "/" + "${path.split("/").slice(2).join("/")}"
      });

      // Retrieve all languages from the select, except the current one
      const allLangs = Array.from(selectLanguage.options).map(option => option.value).filter(d => d !== lang);

      // Remove links from the sidebar that are not pointing to the current language
      for (const l of allLangs) {
        document.querySelectorAll('#observablehq-sidebar ol .observablehq-link').forEach(link => {
          if (link.querySelector("a").getAttribute('href').includes('/' + l + '/')) {
            link.remove();
          }
        });
      }

      // We remove empty sections
      document.querySelectorAll('section').forEach(section => {
        if (!section.querySelector('ol') || !section.querySelector('ol').children.length) {
          section.remove();
        }
      });
    </script>`,
  style: "style.css",
  search: {
    async *index() {
      for (const name of await readdir("examples")) {
        const root = join("examples", name);
        if ((await stat(root)).isDirectory() && existsSync(join(root, "README.md"))) {
          const source = await readFile(join(root, "README.md"), "utf-8");
          yield {
            path: `https://observablehq.observablehq.cloud/framework-example-${name}/`,
            title: source
              .split("\n")
              .find((line) => line.startsWith("# "))
              ?.slice(2),
            text: source
          };
        }
      }
    }
  }
};

async function github(
  path: string,
  {
    authorization = process.env.GITHUB_TOKEN && `token ${process.env.GITHUB_TOKEN}`,
    accept = "application/vnd.github.v3+json"
  } = {}
) {
  const url = new URL(path, "https://api.github.com");
  const headers = {...(authorization && {authorization}), accept};
  const response = await fetch(url, {headers});
  if (!response.ok) throw new Error(`fetch error: ${response.status} ${url}`);
  return await response.json();
}
