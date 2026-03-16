import { Link } from "wouter";
import { ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-destructive/10 rounded-full text-destructive glow-destructive">
            <ShieldAlert className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-4xl font-display font-bold mb-4">404 Error</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          The requested path could not be found. Return to the dashboard to view executor statuses.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
