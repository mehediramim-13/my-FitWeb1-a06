import { getWorkouts } from './DataFetch';
import LibraryGrid from './LibraryGrid';

const Library = async () => {
    const workouts = await getWorkouts();
    return <LibraryGrid workouts={workouts} />;
};

export default Library;