import AuthForm from "../components/shared/auth-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="header">Supabase Auth</h1>
      <div>
        <AuthForm />
      </div>
    </main>
  );
}
