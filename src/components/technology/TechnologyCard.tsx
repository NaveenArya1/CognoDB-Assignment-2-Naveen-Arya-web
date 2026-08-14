import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TechnologyCardProps {
  id: string;
  name: string;
  category: string;
  description: string;

  // Optional graph state
  isActive?: boolean;
  isCurrent?: boolean;
  isUpcoming?: boolean;
  isSelected?: boolean;
}

export const TechnologyCard = ({
  id,
  name,
  category,
  description,
  isActive = false,
  isCurrent = false,
  isUpcoming = false,
  isSelected = false,
}: TechnologyCardProps) => {
  const accentClass = isActive
    ? "text-emerald-400"
    : isCurrent
      ? "text-amber-400"
      : isUpcoming
        ? "text-yellow-400"
        : "text-primary";

  const borderClass = isActive
    ? "border-emerald-400/60"
    : isCurrent
      ? "border-amber-400/80"
      : isUpcoming
        ? "border-yellow-400/50"
        : isSelected
          ? "border-primary/70"
          : "border-border/30";

  const iconBgClass = isActive
    ? "bg-emerald-400/15 text-emerald-400"
    : isCurrent
      ? "bg-amber-400/15 text-amber-400"
      : isUpcoming
        ? "bg-yellow-400/15 text-yellow-400"
        : "bg-primary/15 text-primary";

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/technologies/${id}`}
        className="group block"
      >
        <div
          className={`
            glass
            relative
            h-[180px]
            w-[280px]
            rounded-xl
            border
            p-5
            transition-all
            duration-300
            ${borderClass}
            ${isCurrent
              ? "shadow-[0_0_30px_rgba(245,158,11,0.25)]"
              : isActive
                ? "shadow-[0_0_25px_rgba(16,185,129,0.18)]"
                : ""
            }
          `}
        >
          {/* Current indicator */}
          {isCurrent && (
            <div className="absolute -right-1.5 -top-1.5">
              <span className="flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-400" />
              </span>
            </div>
          )}

          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <motion.div
                whileHover={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  ${iconBgClass}
                `}
              >
                {name.charAt(0).toUpperCase()}
              </motion.div>

              <div className="min-w-0">
                <h3
                  className={`truncate font-semibold ${accentClass}`}
                >
                  {name}
                </h3>

                <p className="truncate text-xs text-muted-foreground">
                  {category}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={`shrink-0 ${accentClass}`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              View
            </Button>
          </div>

          <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`
                rounded
                px-2
                py-1
                text-[10px]
                ${iconBgClass}
              `}
            >
              {category.split(" ")[0]}
            </span>

            {isCurrent && (
              <span className="rounded bg-amber-400/15 px-2 py-1 text-[10px] text-amber-400">
                Current
              </span>
            )}

            {isActive && (
              <span className="rounded bg-emerald-400/15 px-2 py-1 text-[10px] text-emerald-400">
                Completed
              </span>
            )}

            {isUpcoming && (
              <span className="rounded bg-yellow-400/15 px-2 py-1 text-[10px] text-yellow-400">
                Next
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};