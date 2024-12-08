export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  color?: 'default' | 'primary' | 'yellow';
  active?: boolean;
};
