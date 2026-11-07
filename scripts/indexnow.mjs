// Tells Bing (which also feeds ChatGPT search and Copilot), Yandex, Naver and Seznam that the
// site's pages changed, so they crawl them soon. Run after a deploy: npm run indexnow
// The key is public by design: IndexNow checks it against public/<key>.txt on the live site.
const SITE = "https://saeedmalakzai.vercel.app";
const KEY = "fb939b0274304e71af3cc0596fc93f0a";

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => !/\.(jpe?g|png|webp)$/i.test(url));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow answered ${res.status} for ${urlList.length} pages`);
if (!res.ok) {
  console.error(await res.text());
  process.exitCode = 1;
}
