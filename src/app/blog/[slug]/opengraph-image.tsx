import { ImageResponse } from "next/og"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

export const runtime = "edge"
export const alt = "Effect"
export const size = {
  width: 1200,
  height: 630
}

export const contentType = "image/png"

const baseUrl = () => {
  const host = headers().get("host") ?? "localhost:3000"
  const proto = host.includes("localhost") ? "http" : "https"
  return `${proto}://${host}`
}

export default async function Image({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const [post, inter, calSans] = await Promise.all([
    fetch(`${baseUrl()}/api/blog/${slug}`).then((res) => {
      if (!res.ok) return notFound()
      return res.json()
    }),
    fetch(new URL("../../../assets/inter-light.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
    fetch(
      new URL("../../../assets/cal-sans-semibold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer())
  ] as const)

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: "url(https://i.imgur.com/iBLRVtL.jpeg)",
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "64px",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0px 128px"
        }}
      >
        <img
          src="https://i.imgur.com/aGMJKsB.png"
          alt="Effect Logotype"
          height="64"
        />
        <div style={{ color: "white", fontSize: 64, fontFamily: "CalSans" }}>
          {post.title}
        </div>
        <div style={{ color: "#A1A1AB", fontSize: 32 }}>{post.excerpt}</div>
        {/* <div style={{fontFamily: 'Cal Sans', color: '#ffffff', fontSize: 64}}>Test</div> */}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: inter,
          style: "normal",
          weight: 300
        },
        {
          name: "CalSans",
          data: calSans,
          style: "normal",
          weight: 600
        }
      ]
    }
  )
}
