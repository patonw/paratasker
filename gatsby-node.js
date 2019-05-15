/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require('lodash')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type == `MarkdownRemark`) {
        const slug = (createFilePath({ node, getNode, basePath: `pages` }))
        const parent = getNode(_.get(node, "parent"))

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
        createNodeField({
            node,
            name: `collection`,
            value: _.get(parent, "sourceInstanceName"),
        })
    }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
        {
            allMarkdownRemark(filter: {fields: { collection: {eq: "tasks"}}}) {
                edges {
                    node {
                        html
                        htmlAst
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `).then(result => {
        const nodes = result.data.allMarkdownRemark.edges
        nodes.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/subtask.tsx`),
                context: {
                    slug: node.fields.slug
                }
            })
        })

    })
}