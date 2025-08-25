"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { addToWaitlist } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CircleDashed } from "lucide-react";
import { Label } from "@/components/ui/label";

const initialState = {
  message: "",
  errors: {
    email: [] as string[],
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? <CircleDashed className="animate-spin mr-2"/> : null}
      Get My Invite
    </Button>
  );
}

export default function CtaSection() {
  const [state, formAction] = useActionState(addToWaitlist, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && !state.errors?.email?.length) {
      toast({
        title: "Success!",
        description: state.message,
      });
    } else if (state?.errors?.email?.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.errors.email[0],
      });
    }
  }, [state, toast]);

  return (
    <section id="waitlist" className="border-t">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              Stop the paperwork pile-up.
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Be the first to experience the future.
            </p>
          </div>
          <form action={formAction} className="flex flex-col sm:flex-row items-start gap-4 max-w-lg mx-auto">
            <div className="flex-1 w-full space-y-2">
               <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email address"
                required
                className="h-12 text-base"
              />
              {state?.errors?.email && <p className="text-sm text-destructive text-left">{state.errors.email[0]}</p>}
            </div>
            <SubmitButton />
          </form>
          <p className="text-xs text-muted-foreground">
            No spam, ever. We&apos;ll only notify you when we launch.
          </p>
        </div>
      </div>
    </section>
  );
}
