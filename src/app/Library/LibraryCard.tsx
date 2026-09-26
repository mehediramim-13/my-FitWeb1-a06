"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star, Plus } from 'lucide-react';
import toast from "react-hot-toast";
import { Workout } from '../types/type';
import { usePlan, MAX_PLAN } from '../workouts/PlanContent';

const LibraryCard = ({ workout }: { workout: Workout }) => {
    const { addToPlan } = usePlan();

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const result = addToPlan(workout);
        if (result === "added") {
            toast.success("Added to today's plan!");
        } else if (result === "duplicate") {
            toast("Already added to your plan", { icon: "ℹ️" });
        } else {
            toast(`Plan is full (max ${MAX_PLAN} workouts)`, { icon: "⚠️" });
        }
    };

    return (
        <Link href={`/workouts/${workout.id}`} className="bg-neutral-900 rounded-xl overflow-hidden border border-[#1D1F27] block relative">
            <button
                onClick={handleAdd}
                className="absolute top-3 right-3 z-10 bg-[#C3F901] text-neutral-900 rounded-full p-2 hover:scale-105 transition"
                aria-label="Add to today's plan"
            >
                <Plus size={16} />
            </button>

            <div className="relative w-full h-56">
                <Image src={workout.image} alt={workout.name} fill className="object-cover" />
            </div>

            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups.map((group) => (
                        <span key={group} className="bg-[#C3F901] text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase !font-oswald">
                            {group}
                        </span>
                    ))}
                </div>
                <h3 className="text-white font-bold text-lg !font-oswald">{workout.name}</h3>
                <p className="text-neutral-400 text-sm mb-3 !font-oswald">{workout.equipment}</p>
                <div className="flex items-center gap-4 border-t border-[#1D1F27] pt-3 text-neutral-300 text-sm !font-oswald">
                    <span className="flex items-center gap-1"><Clock size={14} />{workout.duration} min</span>
                    <span className="flex items-center gap-1"><Flame size={14} />{workout.caloriesBurned} kcal</span>
                    <span className="flex items-center gap-1"><Star size={14} className="fill-current" />{workout.rating}</span>
                </div>
            </div>
        </Link>
    );
};

export default LibraryCard;