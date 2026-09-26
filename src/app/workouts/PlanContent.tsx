"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Workout } from "../types/type";

export const MAX_PLAN = 6;

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveForLater: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout) => {
    setPlan((prev) =>
      prev.some((w) => w.id === workout.id) || prev.length >= MAX_PLAN
        ? prev
        : [...prev, workout]
    );
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const saveForLater = (workout: Workout) => {
    setSaved((prev) =>
      prev.some((w) => w.id === workout.id) ? prev : [...prev, workout]
    );
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, addToPlan, removeFromPlan, saveForLater, removeFromSaved }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}