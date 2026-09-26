import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star } from 'lucide-react';
import { Workout } from '../types/type';

const LibraryCard = ({ workout }: { workout: Workout }) => {
    return (
        <Link href={`/workouts/${workout.id}`} className="bg-neutral-900 rounded-xl overflow-hidden border border-[#1D1F27] block">
            <div className="relative w-full h-56">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups.map((group) => (
                        <span
                            key={group}
                            className="bg-[#C3F901] text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase !font-oswald"
                        >
                            {group}
                        </span>
                    ))}
                </div>

                <h3 className="text-white font-bold text-lg !font-oswald">
                    {workout.name}
                </h3>
                <p className="text-neutral-400 text-sm mb-3 !font-oswald">
                    {workout.equipment}
                </p>

                <div className="flex items-center gap-4 border-t border-[#1D1F27] pt-3 text-neutral-300 text-sm !font-oswald">
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                        <Flame size={14} />
                        {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                        <Star size={14} className="fill-current" />
                        {workout.rating}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default LibraryCard;