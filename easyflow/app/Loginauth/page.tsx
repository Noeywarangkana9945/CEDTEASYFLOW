"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <main className="p-4">
        <h1 className="text-xl mb-4">ยังไม่ได้เข้าสู่ระบบ</h1>
        
        <button onClick={() => signIn("google")}>Login with Google</button>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-xl mb-2">ยินดีต้อนรับ, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </main>
  );
}
