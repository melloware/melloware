/** @jsx jsx */
import { Link, withPrefix } from "gatsby";
import { jsx } from "theme-ui";
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes";
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useMinimalBlogConfig();

  return (
    <Link to={replaceSlashes(`/${basePath}`)} aria-label={`${siteTitle} - Back to home`} sx={{ color: `heading`, textDecoration: `none` }}>
      <img alt="Melloware Home" src={withPrefix("/svg/logo-no-background.svg")} height="120" width="365"></img>
    </Link>
  );
};

export default HeaderTitle;
