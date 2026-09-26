export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-32">
            <div
                className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
                style={{ borderColor: "#1D1F27", borderTopColor: "#C3F901" }}
            />
            <p className="text-neutral-400 mt-4">Loading workouts…</p>
        </div>
    );
}