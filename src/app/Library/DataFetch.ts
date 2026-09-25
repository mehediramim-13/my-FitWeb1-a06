import { Workout } from '../types/type';

export async function getWorkouts(): Promise<Workout[]> {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch workouts");
    }

    return res.json();
}