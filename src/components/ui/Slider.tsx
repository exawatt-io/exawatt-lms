"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  min: number;
  step: number;
  className?: string;
}

export function Slider({
  value,
  onValueChange,
  max,
  min,
  step,
  className
}: SliderProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    onValueChange([newValue]);
  };

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider-thumb:appearance-none slider-thumb:w-4 slider-thumb:h-4 slider-thumb:bg-primary-600 slider-thumb:rounded-full slider-thumb:cursor-pointer"
        style={{
          background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((value[0] - min) / (max - min)) * 100}%, #e2e8f0 ${((value[0] - min) / (max - min)) * 100}%, #e2e8f0 100%)`
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #2563eb;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}