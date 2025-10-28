import { createContext } from "react";
import { Session, User } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
