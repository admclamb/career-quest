type Props = {
  variant?:
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
};
const AuthLoginButton = ({ variant = "ghost" }: Props) => {
  console.log(variant);
  return <div>AuthLoginButton</div>;
};

export default AuthLoginButton;
