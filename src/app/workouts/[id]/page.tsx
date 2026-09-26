"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Plus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import { getWorkout } from "@/app/api/api";
import { usePlan, MAX_PLAN } from "../PlanContent";
import { Workout } from "@/app/types/type";

export default function WorkoutDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { plan, addToPlan, saveForLater } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWorkout(Number(id))
      .then(setWorkout)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: "#1D1F27", borderTopColor: "#C3F901" }}
        />
      </div>
    );
  }

  if (error || !workout) {
    return <p className="py-32 text-center text-neutral-400">Workout not found.</p>;
  }

  const planFull =
    plan.length >= MAX_PLAN && !plan.some((w) => w.id === workout.id);

  const specs: [string, string | number][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    if (result === "added") {
      toast.success("Added to today's plan!");
    } else if (result === "duplicate") {
      toast("Already added to your plan", { icon: "ℹ️" });
    } else {
      toast(`Plan is full (max ${MAX_PLAN} workouts)`, { icon: "⚠️" });
    }
  };

  const handleSaveForLater = () => {
    const result = saveForLater(workout);
    if (result === "added") {
      toast.success("Saved for later!");
    } else {
      toast("Already in your saved list", { icon: "ℹ️" });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
          <Image src={workout.image} alt={workout.name} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-white font-bold text-3xl sm:text-4xl uppercase">
            {workout.name}
          </h1>
          <p className="text-neutral-400 text-base mt-3">{workout.description}</p>

          <div className="flex flex-wrap gap-2 mt-5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="bg-[#C3F901] text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="mt-6 rounded-xl overflow-hidden border"
            style={{ borderColor: "#1D1F27" }}
          >
            {specs.map(([label, value], idx) => (
              <div
                key={label}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  idx % 2 === 0 ? "bg-neutral-900/50" : "bg-transparent"
                } ${idx !== specs.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "#1D1F27" }}
              >
                <span className="text-neutral-400 text-xs font-semibold tracking-wide uppercase">
                  {label}
                </span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>

          <h2 className="text-white font-bold text-lg mt-8 mb-3 uppercase">
            Instructions
          </h2>
          <ol className="space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex items-center gap-3 text-neutral-300 text-sm">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C3F901] text-neutral-900 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={handleAddToPlan}
              disabled={planFull}
              className="bg-[#C3F901] text-neutral-900 font-semibold px-5 py-3 rounded-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add to today&apos;s plan
            </button>
            <button
              onClick={handleSaveForLater}
              className="border text-white font-semibold px-5 py-3 rounded-lg flex items-center gap-2"
              style={{ borderColor: "#1D1F27" }}
            >
              <Bookmark className="w-4 h-4" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}