import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Music,
  Bell,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";

interface NavbarProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  onSearch?: (query: string) => void;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Navbar = ({
  isLoggedIn = false,
  username = "User",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
  onSearch = () => {},
  onLoginClick = () => {},
  onSignupClick = () => {},
}: NavbarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="w-full h-[70px] bg-background border-b border-border/30 fixed top-0 left-0 z-50 px-4 md:px-6 lg:px-8">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold hidden sm:block">Resona</span>
        </Link>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex relative w-full max-w-md mx-4"
        >
          <Input
            type="search"
            placeholder="Search for songs, artists, or albums..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 bg-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </form>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/explore"
            className="text-foreground hover:text-primary font-medium"
          >
            Explore
          </Link>
          <Link
            to="/trending"
            className="text-foreground hover:text-primary font-medium"
          >
            Trending
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full"
                  >
                    <img
                      src={avatarUrl}
                      alt={username}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/collections" className="w-full">
                      My Collections
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="w-full">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      className="w-full text-left text-red-500"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={onLoginClick}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-background border-b border-border/30 shadow-lg md:hidden">
            <div className="p-4">
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Search for songs, artists, or albums..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </form>

              <div className="flex flex-col space-y-3">
                <Link
                  to="/explore"
                  className="text-foreground hover:text-primary font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore
                </Link>
                <Link
                  to="/trending"
                  className="text-foreground hover:text-primary font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trending
                </Link>

                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-foreground hover:text-primary font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/collections"
                      className="text-foreground hover:text-primary font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Collections
                    </Link>
                    <Link
                      to="/settings"
                      className="text-foreground hover:text-primary font-medium py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="text-left text-red-500 font-medium py-2 flex items-center"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLoginClick();
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
