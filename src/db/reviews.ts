import { db } from './index.ts';
import { reviews } from './schema.ts';
import { desc } from 'drizzle-orm';

export interface CreateReviewInput {
  userId?: number;
  patientName: string;
  treatmentName: string;
  rating: number;
  comment: string;
}

export async function createReview(data: CreateReviewInput) {
  try {
    const result = await db.insert(reviews)
      .values({
        userId: data.userId,
        patientName: data.patientName,
        treatmentName: data.treatmentName,
        rating: data.rating,
        comment: data.comment,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to save review in database.", { cause: error });
  }
}

export async function getAllReviews() {
  try {
    return await db.select()
      .from(reviews)
      .orderBy(desc(reviews.createdAt));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to retrieve reviews.", { cause: error });
  }
}
