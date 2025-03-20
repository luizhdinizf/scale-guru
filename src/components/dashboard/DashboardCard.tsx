
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  tag?: string;
}

export default function DashboardCard({ title, children, className, tag }: DashboardCardProps) {
  return (
    <div className={cn(
      "rounded-xl p-6 border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md animate-scale-in",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        {tag && (
          <div className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {tag}
          </div>
        )}
        <h3 className={cn("text-xl font-semibold", tag && "mt-4")}>{title}</h3>
      </div>
      <div className="transition-all duration-300">{children}</div>
    </div>
  );
}
