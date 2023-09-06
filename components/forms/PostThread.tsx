"use client";
import React from "react";
// import {Form} from '@/components/ui/form'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { updateUser } from "@/lib/actions/user.actions";
import { Textarea } from "../ui/textarea";
import { createThread } from "@/lib/actions/thread.action";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const PostThread = ({ userId ,userInfo }: { userId: string ,userInfo:any}) => {
  const router = useRouter();
  const pathname = usePathname();
console.log("PostThread",userId,userInfo);

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
    });
    console.log("here",{
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
    });
    
    router.push("/");
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={15} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Post Thread</Button>
        </form>
      </Form>
    </div>
  );
};

export default PostThread;
