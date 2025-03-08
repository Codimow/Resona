import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/lib/auth";
import Navbar from "../layout/Navbar";
import { Button } from "@/components/ui/button";
import { Music, Settings, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profile | Resona</title>
      </Helmet>

      <Navbar
        isLoggedIn={true}
        username={user?.email?.split("@")[0] || "User"}
      />

      <main className="pt-[100px] max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-secondary/20 rounded-xl p-8 border border-border/40">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-primary/20 p-6 rounded-full">
              <Music className="h-12 w-12 text-primary" />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {user?.email?.split("@")[0] || "User"}'s Profile
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="bg-secondary/40 rounded-full px-4 py-2 text-sm">
                  <span className="font-medium">0</span> Collections
                </div>
                <div className="bg-secondary/40 rounded-full px-4 py-2 text-sm">
                  <span className="font-medium">0</span> Followers
                </div>
                <div className="bg-secondary/40 rounded-full px-4 py-2 text-sm">
                  <span className="font-medium">0</span> Following
                </div>
              </div>
            </div>

            <div className="flex gap-2 self-start">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Your Collections</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-dashed border-border/60 rounded-xl h-48 flex flex-col items-center justify-center text-muted-foreground">
                <Music className="h-8 w-8 mb-2" />
                <p>Create your first collection</p>
                <Button variant="outline" className="mt-4">
                  Create Collection
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
