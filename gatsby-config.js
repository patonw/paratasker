module.exports = {
  siteMetadata: {
    title: `ParaTasker`,
    description: `Paragliding tasks in San Diego for building technical skills`,
		author: "",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `index`,
        path: `${__dirname}/src/pages/content/index.md`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/pages/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tasks`,
        path: `${__dirname}/src/pages/tasks`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
		{
			resolve: `gatsby-plugin-typescript`,
			isTSX: true,
			allExtensions: true,
		},
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
		`gatsby-plugin-sass`,
  ],
}
