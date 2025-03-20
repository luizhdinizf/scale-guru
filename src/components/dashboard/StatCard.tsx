
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export default function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "rounded-xl p-5 border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}>
                {trend.positive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">do último mês</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-primary/10">
          {icon}
        </div>
      </div>
    </div>
  );
}
