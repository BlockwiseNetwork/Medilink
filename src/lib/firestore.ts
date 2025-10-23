import { doc, setDoc, getDoc, collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { Doctor, UserProfile } from "./definitions";

// Create a user profile in Firestore
export const createUserProfile = async (
  uid: string,
  fullName: string,
  email: string,
  role: "Patient" | "Doctor"
) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      fullName,
      email,
      role,
    });
  } catch (error) {
    console.error("Error creating user profile: ", error);
    throw new Error("Could not create user profile.");
  }
};

// Get a user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    } else {
      console.log("No such user profile!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile: ", error);
    throw new Error("Could not retrieve user profile.");
  }
};

// Get all doctors from Firestore
export const getDoctors = async (): Promise<Doctor[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
    } catch (error) {
        console.error("Error fetching doctors: ", error);
        throw new Error("Could not fetch doctors.");
    }
}

// Seed initial doctor data if the collection is empty
export const seedInitialData = async () => {
    const doctorsCollection = collection(db, 'doctors');
    const snapshot = await getDocs(doctorsCollection);

    if (snapshot.empty) {
        console.log("Doctors collection is empty, seeding data...");
        const batch = writeBatch(db);
        const demoDoctors: Omit<Doctor, 'id'>[] = [
            { name: "Dr. Adaobi Nwosu", specialty: "Cardiologist", city: "Uyo", rating: 4.8, contact: "08012345678" },
            { name: "Dr. Chibuzor Okafor", specialty: "Pediatrician", city: "Lagos", rating: 4.9, contact: "08023456789" },
            { name: "Dr. Funmilayo Adebayo", specialty: "Dermatologist", city: "Abuja", rating: 4.7, contact: "08034567890" },
            { name: "Dr. Emeka Eze", specialty: "Neurologist", city: "Uyo", rating: 4.6, contact: "08045678901" },
            { name: "Dr. Halima Bello", specialty: "Gynecologist", city: "Kano", rating: 4.8, contact: "08056789012" },
            { name: "Dr. Oluwaseun Folarin", specialty: "Orthopedist", city: "Ibadan", rating: 4.7, contact: "08067890123" },
        ];

        demoDoctors.forEach(doctor => {
            const docRef = doc(doctorsCollection);
            batch.set(docRef, doctor);
        });

        await batch.commit();
        console.log("Demo doctors have been added to Firestore.");
    }
};
