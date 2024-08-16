"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Icon } from "../icons"
import { Divider } from "../layout/divider"

export const TableOfContents: React.FC<{
  elements: DocHeading[]
  pageFilePath?: string
  pageTitle?: string
}> = ({ elements, pageFilePath, pageTitle }) => {
  const [activeHeading, setActiveHeading] = useState("")
  const [showScrollToTopButton, setShowScrollToTopButton] =
    useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      let current = ""
      for (const { slug } of elements) {
        const element = document.getElementById(slug)
        if (element && element.getBoundingClientRect().top < 256)
          current = slug
      }
      setActiveHeading(current)
      setShowScrollToTopButton(window.scrollY > 500)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [elements])

  return (
    <aside className="toc flex-none sticky top-32 sm:top-40 mb-16 w-52 overflow-y-auto hidden xl:block">
      <div>
        {elements.length > 1 && (
          <h2 className="text-black dark:text-white uppercase text-sm font-semibold h-8 flex items-end">
            On this page
          </h2>
        )}
        <ul className="relative grow overflow-hidden py-9 text-sm">
          {elements
            .slice(1, elements.length)
            .map(({ level, title, slug }, index) => {
              return (
                <li
                  key={index}
                  className="mt-2.5"
                  style={{ paddingLeft: `${level > 1 ? level - 2 : 0}rem` }}
                >
                  <Link
                    href={`#${slug}`}
                    className={`flex items-center pb-1 break-words hover:text-black dark:hover:text-white leading-snug text-left ${
                      slug === activeHeading
                        ? "text-black font-normal dark:text-white dark:font-light"
                        : ""
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: title
                        .replace("`", "<code>")
                        .replace("`", "</code>")
                    }}
                  />
                </li>
              )
            })}
        </ul>
      </div>
      {elements.length > 1 && (
        <>
          <Divider />
          <div className="text-sm py-9 space-y-3">
            {pageFilePath && (
              <Link
                href={`https://github.com/Effect-TS/website/blob/website-redesign/content/${pageFilePath}`}
                className="flex items-start gap-1 hover:text-black dark:hover:text-white"
              >
                <span>Edit on GitHub</span>
                <Icon name="arrow-up-right-light" className="h-3" />
              </Link>
            )}
            {pageFilePath && pageTitle && (
              <Link
                href={`https://github.com/Effect-TS/website/issues/new?title=Feedback%20for%20%E2%80%9C${pageTitle}%E2%80%9D%20%28${pageFilePath}%29&labels=feedback`}
                className="flex items-start gap-1 hover:text-black dark:hover:text-white"
              >
                <span>Give us feedback</span>
                <Icon name="arrow-up-right-light" className="h-3" />
              </Link>
            )}
            {showScrollToTopButton && (
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="mb-1.5 hover:text-black dark:hover:text-white flex items-start gap-1"
              >
                <span>Scroll to top</span>
                <Icon name="arrow-right" className="h-2.5 -rotate-90" />
              </button>
            )}
          </div>
        </>
      )}
    </aside>
  )
}
