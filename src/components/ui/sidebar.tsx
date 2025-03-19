
import React from "react";
import { useMobile } from "@/hooks/use-mobile"; // Updated import name
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./button";
import { LogIn, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const isMobile = useMobile();
  const { userDetails, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "border-r flex-shrink-0 hidden w-64 transition-all duration-300 md:block",
        isMobile ? "-translate-x-full" : "translate-x-0"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          {userDetails ? (
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={userDetails.avatarUrl} alt={userDetails.name} />
                <AvatarFallback>
                  {userDetails.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-medium line-clamp-1">{userDetails.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{userDetails.role}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Button>
              <Button size="sm" onClick={() => navigate('/signup')}>
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        
        {userDetails && (
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
