import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Melloware Blog',
    description: 'Articles about open source, Java, Quarkus, React and more.',
    site: context.site!.href,
    items: posts.map(post => {
      const slug = post.id
        .replace(/\/index\.(md|mdx)$/, '')
        .replace(/\.(md|mdx)$/, '');
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description ?? post.data.title,
        link: `/blog/${slug}/`,
      };
    }),
    customData: '<language>en-us</language>',
  });
}
