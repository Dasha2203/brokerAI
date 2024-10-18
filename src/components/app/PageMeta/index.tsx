import Head from "next/head"
import React from "react"
import { PageMetaProps } from "./types"

const PageMeta = ({ title, description, noindex }: PageMetaProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet"></link>
      {noindex && <meta name="robots" content="noindex" />}
    </Head>
  )
};

export default PageMeta;
