import { useAuth } from "../../hooks/useAuth";

export default function OAuthButton() {
  const { googleLogin } = useAuth();

  return (
    <button
      type="button"
      onClick={googleLogin}
      className="w-full border border-white/40 flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-white/10"
    >
      <span className="text-lg">G</span> Continue with Google
    </button>
  );
}
