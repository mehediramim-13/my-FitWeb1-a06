"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { usePlan, MAX_PLAN } from "../workouts/PlanContent";

function MyPlanContent({ initialTab }: { initialTab: "plan" | "saved" }) {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">(initialTab);

  const list = activeTab === "plan" ? plan : saved;

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleMarkDone = (id: number) => {
    removeFromPlan(id);
    toast.success("Workout marked as done! 💪");
  };

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }
    toast.success("Removed successfully!");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-white font-bold text-3xl sm:text-4xl uppercase">
        My Plan
      </h1>
      <p className="text-neutral-400 mt-2">
        Cap of {MAX_PLAN} lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8">
        <div className="rounded-xl border p-3 sm:p-6 text-center" style={{ borderColor: "#1D1F27" }}>
          <p className="text-[#C3F901] font-bold text-2xl sm:text-3xl">{plan.length}</p>
          <p className="text-neutral-400 text-[10px] sm:text-xs uppercase mt-1">Exercises</p>
        </div>
        <div className="rounded-xl border p-3 sm:p-6 text-center" style={{ borderColor: "#1D1F27" }}>
          <p className="text-[#C3F901] font-bold text-2xl sm:text-3xl">{totalMinutes}</p>
          <p className="text-neutral-400 text-[10px] sm:text-xs uppercase mt-1">Minutes</p>
        </div>
        <div className="rounded-xl border p-3 sm:p-6 text-center" style={{ borderColor: "#1D1F27" }}>
          <p className="text-[#C3F901] font-bold text-2xl sm:text-3xl">{totalCalories}</p>
          <p className="text-neutral-400 text-[10px] sm:text-xs uppercase mt-1">Calories</p>
        </div>
      </div>

      <div className="flex gap-2 mt-8">
        <button
          onClick={() => setActiveTab("plan")}
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "plan" ? "bg-[#C3F901] text-neutral-900" : "border text-neutral-300"
          }`}
          style={activeTab !== "plan" ? { borderColor: "#1D1F27" } : undefined}
        >
          Today&apos;s Plan
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "saved" ? "bg-[#C3F901] text-neutral-900" : "border text-neutral-300"
          }`}
          style={activeTab !== "saved" ? { borderColor: "#1D1F27" } : undefined}
        >
          Saved
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {list.length === 0 ? (
          <div
            className="rounded-xl border border-dashed py-16 sm:py-20 px-4 text-center"
            style={{ borderColor: "#1D1F27" }}
          >
            <h3 className="text-white font-bold text-lg uppercase">Nothing Here Yet</h3>
            <p className="text-neutral-400 mt-2">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#C3F901] text-neutral-900 font-semibold px-5 py-3 rounded-lg mt-6"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          list.map((workout) => (
            <div
              key={workout.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-4"
              style={{ borderColor: "#1D1F27" }}
            >
              <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 mx-auto sm:mx-0">
                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-white font-bold uppercase">{workout.name}</h3>
                <p className="text-neutral-400 text-sm">{workout.equipment}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4 text-neutral-300 text-xs mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {workout.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={12} />
                    {workout.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    {workout.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="border text-white text-sm font-semibold px-4 py-2 rounded-lg"
                  style={{ borderColor: "#1D1F27" }}
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button
                    onClick={() => handleMarkDone(workout.id)}
                    className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[#C3F901] text-neutral-900"
                  >
                    <Check size={14} />
                    Mark as Done
                  </button>
                )}
                <button
                  onClick={() => handleRemove(workout.id)}
                  className="text-neutral-400 hover:text-white p-2"
                  aria-label="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function MyPlanWrapper() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") === "saved" ? "saved" : "plan";
  return <MyPlanContent key={tab} initialTab={tab} />;
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-neutral-400">Loading...</div>}>
      <MyPlanWrapper />
    </Suspense>
  );
}