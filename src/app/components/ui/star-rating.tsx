import { Star } from "lucide-react";
import React from "react";

type Props = {
  rating: number;
};

export default function StarRating({ rating }: Props) {
  return (
    <div className="flex items-center">
      <span className="mr-2 ml-3 rounded text-slate-900 bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
        {rating}
      </span>
    </div>
  );
}
