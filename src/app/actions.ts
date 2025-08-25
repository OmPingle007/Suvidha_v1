"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export async function addToWaitlist(prevState: any, formData: FormData) {
  try {
    const validatedFields = emailSchema.safeParse({
      email: formData.get("email"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "",
      };
    }
    
    await addDoc(collection(db, "waitlist"), {
      email: validatedFields.data.email,
      createdAt: serverTimestamp(),
    });

    revalidatePath("/");

    return {
      message: "Thank you for joining our waitlist! We'll be in touch.",
      errors: {},
    };
  } catch (e) {
    console.error(e);
    return {
      errors: {},
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
