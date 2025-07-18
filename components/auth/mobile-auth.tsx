"use client";

import { logout } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { authResponse, UserTypes } from "@/utils/types";
import { Loader2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface MobileAuthProps {
  user: UserTypes | null;
  onClose?: () => void;
  className?: string;
}

const generateInitials = (name: string): string => {
  if (!name?.trim()) return "US";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
};

const UserProfileSection: React.FC<{
  user: UserTypes;
  isLoading: boolean;
}> = ({ user, isLoading }) => {
  const initials = useMemo(() => generateInitials(user.name), [user.name]);
  console.log(user);

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-3">
      <div className="relative">
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          {user?.profilePhoto?.url && (
            <AvatarImage
              src={user.profilePhoto.url}
              alt={`${user.name || "User"}'s avatar`}
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          <AvatarFallback className="font-medium text-sm bg-gradient-to-br from-primaryColor to-secondaryColor text-white">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Online status indicator */}
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
            <Loader2 className="h-3 w-3 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate text-sm">
          {user.name || "Anonymous User"}
        </h4>
        {user.email && (
          <p className="text-xs text-gray-600 truncate">{user.email}</p>
        )}
      </div>
    </div>
  );
};

const LoginSection: React.FC<{
  onSignIn: () => void;
  onClose?: () => void;
}> = ({ onSignIn, onClose }) => (
  <div className="space-y-3">
    <div className="text-center py-2">
      <h4 className="text-sm font-semibold text-gray-900 mb-1">
        Sign In to Your Account
      </h4>
    </div>

    <Button
      onClick={() => {
        onSignIn();
        onClose?.();
      }}
      className="w-full h-10 flex items-center justify-center gap-2 bg-primaryColor hover:bg-primaryColor/90 text-white rounded-lg font-medium transition-all duration-200"
    >
      <User className="h-4 w-4" />
      <span>Sign In</span>
    </Button>

    <div className="pt-2 border-t border-gray-100">
      <p className="text-xs text-gray-500 text-center mb-2">
        Don't have an account?
      </p>
      <Link
        href="/auth/sign-up"
        onClick={onClose}
        className="block w-full text-center py-2 px-3 border border-primaryColor text-primaryColor rounded-lg hover:bg-primaryColor/5 transition-colors font-medium text-sm"
      >
        Create Account
      </Link>
    </div>
  </div>
);

const MobileAuth: React.FC<MobileAuthProps> = ({
  user,
  onClose,
  className,
}) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignIn = useCallback(() => {
    router.push("/auth/sign-in");
  }, [router]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      const result: authResponse = await logout();

      if (result.statusCode === 200) {
        toast.success("Logged out successfully");
        onClose?.();
        router.push("/auth/sign-in");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to log out");
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, router, onClose]);

  if (!user) {
    return (
      <div className={cn("space-y-3", className)}>
        <LoginSection onSignIn={handleSignIn} onClose={onClose} />
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <UserProfileSection user={user} isLoading={isLoggingOut} />

      <div className="pt-2 border-t border-gray-100">
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full h-8 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          <span className="font-medium text-sm">
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MobileAuth;
