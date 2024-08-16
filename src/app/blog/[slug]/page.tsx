import { Author } from "@/components/atoms/author"
import { MDX } from "@/components/atoms/mdx"
import { RelatedPosts } from "@/components/blog/related-posts"
import { TableOfContents } from "@/components/docs/table-of-contents"
import { Icon } from "@/components/icons"
import { Navigation } from "@/components/layout/navigation"
import { allBlogPosts } from "contentlayer/generated"
import { format } from "date-fns"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { slug }
}: {
  params: { slug: string[] }
}) {
  const post = allBlogPosts.find((post) => post.urlPath === `/blog/${slug}`)
  // @ts-ignore
  if (!post) return
  return {
    title: `${post.title} – Effect Blog`,
    description: post.excerpt
  }
}

export default function Page({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const post = allBlogPosts.find((post) => post.urlPath === `/blog/${slug}`)
  if (!post) notFound()

  return (
    <>
      <Navigation />
      <div className="blog-container relative w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-16 flex items-start pt-32 sm:pt-40 min-h-screen">
        <aside className="hidden md:flex shrink-0 sticky top-32 sm:top-40 mb-16 flex-col w-64">
          <div className="text-black dark:text-white uppercase text-sm font-semibold h-8 flex items-end mb-9">
            {post.authors.length > 1 ? "Authors" : "Author"}
          </div>
          {post.authors.map((author, index) => (
            <Author key={index} {...author} />
          ))}
        </aside>
        <main className="md:px-12 pb-24 -mt-2 grow overflow-hidden">
          <div className="flex gap-2 items-center -mt-5 mb-1 h-4 text-sm">
            <Link
              href="/blog"
              className="hover:text-black dark:hover:text-white"
            >
              Blog
            </Link>
            <Icon
              name={"chevron-right"}
              className="h-2.5 text-zinc-400 dark:text-zinc-600"
            />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white">
            {post.title}
          </h2>
          <div className="text-sm h-4 mt-1.5 mb-6">
            {format(new Date(post.date), "MMM do, yyyy")}
          </div>
          <MDX content={post.body.code} />
          <aside className="md:hidden mt-12">
            <div className="text-black dark:text-white uppercase text-sm font-semibold h-8 flex items-end mb-9">
              {post.authors.length > 1 ? "Authors" : "Author"}
            </div>
            {post.authors.map((author, index) => (
              <Author key={index} {...author} />
            ))}
          </aside>
          {post.relatedPosts && <RelatedPosts slugs={post.relatedPosts} />}
        </main>
        <TableOfContents elements={post.headings} />
      </div>
    </>
  )
}
