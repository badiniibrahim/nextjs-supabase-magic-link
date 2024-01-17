"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/lib/validator";
import { Database } from "@/types/supabase";
import { useToast } from "@/components/ui/use-toast";

const AccountForm = ({ session }: { session: Session | null }) => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const user = session?.user;

  const supabase = createClientComponentClient<Database>();

  const form = useForm<z.infer<typeof updateProfile>>({
    resolver: zodResolver(updateProfile),
    defaultValues: {
      email: "",
      fullName: "",
      username: "",
      website: "",
    },
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id as string)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        form.reset({
          email: user?.email || "",
          fullName: data.full_name || "",
          username: data.username || "",
          website: data.website || "",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was a problem with your request.",
        description: "Error loading user data!",
      });
    } finally {
      setLoading(false);
    }
  }, [supabase, user?.id, user?.email, form, toast]);

  const onSubmit = async (data: z.infer<typeof updateProfile>) => {
    setLoading(true);
    try {
      const { error, status } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: data.fullName,
        username: data.username,
        website: data.website,
        avatar_url: "",
        updated_at: new Date().toISOString(),
      });
      if (!error && status === 200) {
        toast({
          title: "Update profile",
          description: "Profile is successfully update",
        });
      }
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-4 w-screen h-[800px] justify-center items-center"
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Update profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Email</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">FullName</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Username</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="website"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="shad-form_label">Website</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 w-full">
                {loading ? "Loading ..." : "Update profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default AccountForm;
