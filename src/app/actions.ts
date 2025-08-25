"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

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
    
    // Here you would typically save the email to a database or a service
    // like Mailchimp, ConvertKit, Firebase Firestore, etc.
    // For this example, we'll just log it to the console.
    console.log("New waitlist submission:", validatedFields.data.email);

    revalidatePath("/");

    return {
      message: "Thank you for joining our waitlist! We'll be in touch.",
      errors: {},
    };
  } catch (e) {
    return {
      errors: {},
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
