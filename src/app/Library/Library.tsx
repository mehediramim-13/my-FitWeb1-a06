// Library.tsx
import { getWorkouts } from './DataFetch';
import LibraryCard from './LibraryCard';

const Library = async () => {
    const workouts = await getWorkouts();

    return (
        <section id="library" className="container mx-auto px-4 sm:px-6 py-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white !font-oswald uppercase">
                The Library
            </h2>
            <p className="text-neutral-400 mt-1 mb-8 !font-inter">
                Twelve lifts covering every major muscle group.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <LibraryCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
};

export default Library;