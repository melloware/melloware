/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";

const Footer = () => {
  const { siteTitle } = useSiteMetadata();

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [3],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by {siteTitle}. All rights reserved.
      </div>
      <div>
        <Link aria-label="Stack Exchange reputation" href="https://stackoverflow.com/users/502366/melloware">
          <img src="https://img.shields.io/stackexchange/stackoverflow/r/502366?style=for-the-badge&label=StackOverflow"></img>
        </Link>
        <Link aria-label="GitHub followers" href="https://github.com/melloware">
          <img src="https://img.shields.io/github/followers/melloware?style=for-the-badge"></img>
        </Link>
        <Link aria-label="GitHub sponsors" href="https://github.com/sponsors/melloware">
          <img src="https://img.shields.io/github/sponsors/melloware?style=for-the-badge&color=gold"></img>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
