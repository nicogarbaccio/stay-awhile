// Import the Next.js Response object to return responses from the API routes
import { NextResponse } from "next/server";

// Import helper functions and modules
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

// Define the interface for the parameters passed to the API routes
interface IParams {
  listingId?: string;
}

// Define the POST route handler to add a listing to the user's favorites
export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  // Get the current user
  const currentUser = await getCurrentUser();
  
  // If there is no current user, return an error response
  if (!currentUser) {
    return NextResponse.error();
  }

  // Get the listing ID from the parameters
  const { listingId } = params;

  // If there is no valid listing ID, throw an error
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Create a copy of the user's favorites array
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  
  // Add the new listing ID to the array
  favoriteIds.push(listingId);

  // Update the user's favorite IDs in the database
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  // Return the updated user object as a JSON response
  return NextResponse.json(user);
}

// Define the DELETE route handler to remove a listing from the user's favorites
export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  // Get the current user
  const currentUser = await getCurrentUser();
  // If there is no current user, return an error response
  if (!currentUser) {
    return NextResponse.error();
  }

  // Get the listing ID from the parameters
  const { listingId } = params;
  // If there is no valid listing ID, throw an error
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid ID');
  }

  // Create a copy of the user's favorites
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // Filter out the listing ID to remove it from the array
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Update the user's favorite IDs in the database
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });
  // Return the updated user object as a JSON response
  return NextResponse.json(user);
}

// The code defines two API route handlers that add and remove a listing from a user's favorites. The code is written in TypeScript and uses the NextResponse object to return responses from the API routes. The code also uses the getCurrentUser function to get the current user, the prisma library to update the user's favorite IDs in the database, and an interface to define the parameters passed to the API routes.
