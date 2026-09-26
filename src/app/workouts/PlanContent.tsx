"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Workout } from "../types/type";

export const MAX_PLAN = 5;
export type AddResult = "added" | "duplicate" | "full";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => AddResult;
  removeFromPlan: (id: number) => void;
  saveForLater: (workout: Workout) => AddResult;
  removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const addToPlan = (workout: Workout): AddResult => {
    if (plan.some((w) => w.id === workout.id)) return "duplicate";
    if (plan.length >= MAX_PLAN) return "full";
    setPlan((prev) => [...prev, workout]);
    return "added";
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const saveForLater = (workout: Workout): AddResult => {
    if (saved.some((w) => w.id === workout.id)) return "duplicate";
    setSaved((prev) => [...prev, workout]);
    return "added";
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