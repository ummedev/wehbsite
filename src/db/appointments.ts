import { db } from './index.ts';
import { appointments, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export interface CreateAppointmentInput {
  userId?: number;
  patientName: string;
  phone: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  time: string;
  notes?: string;
}

export async function createAppointment(data: CreateAppointmentInput) {
  try {
    const result = await db.insert(appointments)
      .values({
        userId: data.userId,
        patientName: data.patientName,
        phone: data.phone,
        treatmentId: data.treatmentId,
        treatmentName: data.treatmentName,
        date: data.date,
        time: data.time,
        notes: data.notes || '',
        status: 'confirmed',
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw new Error("Failed to save appointment in database.", { cause: error });
  }
}

export async function getUserAppointments(userId: number) {
  try {
    return await db.select()
      .from(appointments)
      .where(eq(appointments.userId, userId))
      .orderBy(desc(appointments.createdAt));
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to retrieve appointments.", { cause: error });
  }
}

export async function getAllAppointments() {
  try {
    return await db.select()
      .from(appointments)
      .orderBy(desc(appointments.createdAt));
  } catch (error) {
    console.error("Error fetching all appointments:", error);
    throw new Error("Failed to retrieve clinic appointments.", { cause: error });
  }
}
