import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageContainer } from "@/components/layout/page-container";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechPath - Technology Knowledge Graph",
  description: "Explore technology relationships, projects, and ecosystems in an interactive 3D graph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      id="theme-root"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <div className="flex min-h-full flex-col">
            <Navbar />
            <PageContainer>{children}</PageContainer>
            <Footer />
          </div>
        </QueryProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Theme handling
              const root = document.getElementById('theme-root');

              // Check for saved theme preference or use system preference
              const getCurrentTheme = () => {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme) return savedTheme;

                return window.matchMedia('(prefers-color-scheme: dark)').matches
                  ? 'dark'
                  : 'light';
              };

              const setTheme = (theme) => {
                localStorage.setItem('theme', theme);
                root.classList.toggle('dark', theme === 'dark');
              };

              // Initialize theme
              const currentTheme = getCurrentTheme();
              setTheme(currentTheme);

              // Listen for system theme changes
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                  setTheme(e.matches ? 'dark' : 'light');
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}