import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import { ReactNode } from "react";

type Props = {
  rating: number;
  count: number;
};

export default function StarRating({ rating, count }: Props) {
  const round = Math.round(rating * 2) / 2;
  const stars: ReactNode[] = [];

  function addStar(icon: ReactNode) {
    stars.push(icon);
  }

  for (let i = 0; i < 5; i++) {
    if (i < Math.trunc(round)) {
      addStar(<IconStarFilled key={i} size={16} />);
    } else {
      if (round - i == 0.5) {
        addStar(<IconStarHalfFilled key={i} size={16} />);
      } else {
        addStar(<IconStar key={i} size={16} />);
      }
    }
  }
  return (
    <span className="text-slate-900 text-xs font-semibold">
      <div className="flex items-center ">
        <span className="text-gray-500 mr-1">{rating}</span>
        {stars}
        <span className="text-gray-500 ml-1">({count})</span>
      </div>
    </span>
  );
}
