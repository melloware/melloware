/** @jsx jsx */
import type { HeadFC, PageProps } from "gatsby";
import { jsx, Heading } from "theme-ui";
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout";
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo";

export type MBPageProps = {
  page: {
    title: string;
    slug: string;
    excerpt: string;
  };
};

const Page: React.FC<React.PropsWithChildren<PageProps<MBPageProps>>> = ({ data: { page }, children }) => (
  <Layout>
    <Heading as="h1" variant="styles.h1">
      {page.title}
    </Heading>
    <section sx={{ my: 2, variant: `layout.content` }}>{children}</section>
  </Layout>
);

export default Page;

export const Head: HeadFC<MBPageProps> = ({ data: { page } }) => <Seo title={page.title} description={page.excerpt} />;
