"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/20 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
              TP
            </motion.div>
            <motion.span initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.05 }} className="text-xl font-bold gradient-text">
              TechPath
            </motion.span>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {[
              ["/technologies", "Technologies"],
              ["/projects", "Projects"],
              ["/graph", "Graph"],
              ["/ecosystem", "Ecosystem"],
            ].map(([href, label]) => (
              <motion.div
                key={href}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={pathname === href ? "flex items-center gap-2" : "flex items-center gap-2"}
              >
                <Link
                  href={href}
                  className={`${pathname === href ? "text-primary font-medium" : "text-muted-foreground transition-colors"} hover:text-primary px-3 py-1 rounded-md ${pathname === href ? "bg-primary/10" : ""}`}
                >
                  {label}
                </Link>
                {pathname === href && (
                  <div className="w-0.5 h-2.5 bg-primary rounded-r-full ml-1"></div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/graph">
              <Button variant="outline" size="sm" className="text-primary hover:bg-primary/10">
                Explore Graph
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};