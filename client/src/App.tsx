import { useRef, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useAuthProvider, AuthContext } from "./hooks/use-auth";

import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Evaluation from "@/pages/evaluation";
import Relaxation from "@/pages/relaxation";
import BreakTimerPage from "@/pages/break-timer-page";
import AuthPage from "@/pages/auth";
import NotFound from "@/pages/not-found";
import Recommendations from "@/pages/recommendations";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  const { user, isLoading } = useAuthProvider();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/auth");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

export default function App() {
  const queryClientRef = useRef(queryClient);
  
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <AuthProvider />
    </QueryClientProvider>
  );
}

function AuthProvider() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <Router />
      <Toaster />
    </AuthContext.Provider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/">
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </Route>
      <Route path="/chat">
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </Route>
      <Route path="/evaluation">
        <ProtectedRoute>
          <Evaluation />
        </ProtectedRoute>
      </Route>
      <Route path="/relaxation">
        <ProtectedRoute>
          <Relaxation />
        </ProtectedRoute>
      </Route>
      <Route path="/break-timer">
        <ProtectedRoute>
          <BreakTimerPage />
        </ProtectedRoute>
      </Route>
      <Route path="/recommendations">
        <ProtectedRoute>
          <Recommendations />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}