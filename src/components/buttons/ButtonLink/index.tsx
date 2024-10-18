import React from "react"
import Link from "next/link"
import { ButtonLinkProps } from "./types"

const ButtonLink = ({ href, children }: ButtonLinkProps) => {
  const isInternalLink = href && href?.startsWith('/')

  if (isInternalLink) {
    return (
      <Link href={href}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href}>
      {children}
    </a>
  )
};

export default ButtonLink;
