"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "@supabase/auth-helpers-nextjs";

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-gray-900"></Link>
        </nav>
        {user && (
          <form action="/auth/signout" method="post">
            <Button
              type="submit"
              className="inline-flex items-center  focus:outline-none hover:bg-indigo-700 bg-indigo-500 rounded-sm py-2 px-2 text-white"
            >
              Logout
            </Button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Navbar;
