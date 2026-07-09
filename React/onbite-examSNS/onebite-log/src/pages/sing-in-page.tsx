import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";
import { useSignInWithPassword } from "@/hooks/mutations/auth/use-sign-in-with-password";
import { useSignInWithOAuth } from "@/hooks/mutations/auth/use-sign-in-with-oauth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signInWithPassword, isPending: isSignInWithPasswordPending } =
    useSignInWithPassword({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });

        setPassword("");
      },
    });

  const { mutate: signInWithOAuth, isPending: isSignInWithOAuth } =
    useSignInWithOAuth({
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });
      },
    });

  const handleSignInSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithGitHubClick = () => {
    signInWithOAuth("github");
  };

  const isPending = isSignInWithPasswordPending || isSignInWithOAuth;

  return (
    <form onSubmit={handleSignInSubmit} className="flex flex-col gap-8">
      <div className="text-xl font-bold">로그인</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abc.com"
        />
        <Input
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isPending} className="w-full">
          로그인
        </Button>
        <Button
          type="button"
          disabled={isPending}
          onClick={handleSignInWithGitHubClick}
          className="w-full"
          variant={"outline"}
        >
          <img src={gitHubLogo} className="h-4 w-4" /> GitHub 계정으로 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          계정이 없으시다면? 회원가입
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </form>
  );
}
