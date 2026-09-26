# FitLog

FitLog is a dark, no-nonsense gym companion built for people who just want to pick a lift, lock it into today's plan, and get moving. Browse a library of workouts, check out the details for each one, and keep track of what you're doing today versus what you've saved for later.

**Live site:** [FitLog](https://my-fit-web1-a06.vercel.app/)
**GitHub repo:** https://github.com/mehediramim-13/my-FitWeb1-a06

## Technologies Used

- **Next.js** (App Router) with **TypeScript**
- **Tailwind CSS** for styling
- **daisyUI** for some pre-built UI components
- **lucide-react** for icons
- **react-hot-toast** for toast notifications
- **Next/Image** and **Next/Font** (Google Fonts: Geist, Oswald)
- Deployed on **Vercel**

## Key Features

1. **Workout Library** - Browse all workouts in a responsive grid, with a search bar (by name/tag) and a sort dropdown to sort by duration, calories, or rating.
2. **Workout Detail Page** - Each workout has its own page with a full spec panel (equipment, difficulty, sets, reps, duration, calories, rating), step-by-step instructions, and buttons to add it to today's plan or save it for later.
3. **My Plan Page** - See everything you've added to today's plan or saved for later in separate tabs, with a live summary of total exercises, minutes, and calories.
4. **Plan Management** - Mark a workout as done or remove it from your list, with instant toast feedback for every action. Today's plan is capped at 5 lifts so you finish what you start before loading more.
5. **Polished UX Details** - A proper 404 page for unknown routes, a loading state while workout data is being fetched, and a fully responsive layout that works on mobile, tablet, and desktop.
6. **Data Persistence** - Today's plan and saved workouts are stored in the browser's localStorage, so they stay put even after a page refresh or reopening the site later.

## Note

This README's content (project details, tech stack, features) is based entirely on my own project and my own code. I used an AI reference just to help organize and structure the README format itself, not to generate the actual project information.