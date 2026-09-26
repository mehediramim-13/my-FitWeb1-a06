import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-32 text-center">
            <p className="text-[#C3F901] font-bold text-sm tracking-wide">ERROR 404</p>
            <h1 className="text-white font-bold text-4xl sm:text-5xl uppercase mt-4">
                Page Not Found
            </h1>
            <p className="text-neutral-400 mt-4 max-w-md mx-auto">
                The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
            <Link
                href="/"
                className="inline-block bg-[#C3F901] text-neutral-900 font-semibold px-6 py-3 rounded-lg mt-8"
            >
                Go to workouts
            </Link>
        </div>
    );
}