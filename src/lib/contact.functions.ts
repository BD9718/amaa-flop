import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { submitContactMessageServer } from "@/lib/contact.server";

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((data) =>
    z
      .object({
        name: z.string().trim().min(2).max(120),
        email: z.string().trim().email().max(200),
        subject: z.string().trim().min(3).max(200),
        message: z.string().trim().min(20).max(5000),
      })
      .parse(data),
  )
  .handler(async ({ data }) => submitContactMessageServer(data));
