export const buttonscolors = ['primary', 'danger'] as const;
export type ButtonColor = (typeof buttonscolors)[number];

export type Props = {
  uiColor?: ButtonColor;
  fixedSize?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Props {
  as: 'button';
}

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Props {
  as: 'link';
  href: string;
}

export type CustomLinkProps = ButtonProps | AnchorProps;
