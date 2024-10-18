export const buttonscolors = ['primary'] as const
export type ButtonColor = (typeof buttonscolors)[number]

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  color?: ButtonColor
}