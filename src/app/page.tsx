import Link from "next/link";
import { APP_NAME, APP_DESCRIPTION, ROUTES } from "@/constants";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
        {APP_NAME}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
        {APP_DESCRIPTION}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={ROUTES.register}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Get started
        </Link>
        <Link
          href={ROUTES.login}
          className="rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
