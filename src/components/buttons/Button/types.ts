export const buttonscolors = ['primary', 'danger'] as const;
export type ButtonColor = (typeof buttonscolors)[number];

export const buttonsVariant = ['contained', 'outlined'] as const;
export type ButtonVariant = (typeof buttonsVariant)[number];

export type Props = {
  uiColor?: ButtonColor;
  variant?: ButtonVariant;
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

export type CustomButtonProps = ButtonProps | AnchorProps;
