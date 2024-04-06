import { useLogin } from "@privy-io/react-auth";
import Head from "next/head";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLogin({
    // Navigate the user to the minting page after they have successfully logged in
    onComplete: () => router.push("/minting"),
  });

  return (
    <>
      <Head>
        <title>Login · Privy</title>
      </Head>

      <main className="flex min-h-screen min-w-full">
        <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
          <div>
            <div className="flex justify-center pb-10 text-center text-2xl">
              {/*Image here*/}
              Login using Discord
            </div>
            <div className="flex justify-center text-center">
              <button className="bg-violet-600 hover:bg-violet-700 py-3 px-20 text-white rounded-lg text-lg" onClick={login}>
                Urbe Login
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
