"use server";

import { findDoctorsInCity } from "@/ai/flows/medibot-find-doctors-in-city";
import { medibotAIHealthAssistant } from "@/ai/flows/medibot-ai-health-assistant";
import { z } from "zod";

const actionSchema = z.object({
  query: z.string(),
  language: z.enum(["en", "ib"]),
});

export async function handleChatMessage(prevState: any, formData: FormData) {
  try {
    const validatedData = actionSchema.safeParse({
      query: formData.get("query"),
      language: formData.get("language"),
    });

    if (!validatedData.success) {
      return { response: "Invalid input.", error: true };
    }

    const { query, language } = validatedData.data;

    const doctorSearchRegex = /find doctors in (.*)/i;
    const doctorMatch = query.match(doctorSearchRegex);

    if (doctorMatch && doctorMatch[1]) {
      const city = doctorMatch[1].trim();
      const doctors = await findDoctorsInCity({ city });

      if (doctors && doctors.length > 0) {
        const doctorList = doctors
          .map(
            (doc) =>
              `- Dr. ${doc.name} (${doc.specialty}), Rating: ${doc.rating}/5, Contact: ${doc.contact}`
          )
          .join("\n");
        return { response: `I found the following doctors in ${city}:\n${doctorList}`, error: false };
      } else {
        return { response: `I couldn't find any doctors in ${city}. Please try another location.`, error: false };
      }
    }

    const aiResponse = await medibotAIHealthAssistant({ query, language });
    return { response: aiResponse.response, error: false };
  } catch (error) {
    console.error("Error in handleChatMessage:", error);
    return {
      response: "Sorry, I encountered an error. Please try again.",
      error: true,
    };
  }
}
