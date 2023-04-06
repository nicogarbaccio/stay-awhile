// Import modules and helper functions
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

// Define the interface for the hook parameters
interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}
// Define the useFavorite hook function
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  // Get the Next.js router object
  const router = useRouter();
  // Get the login modal hook
  const loginModal = useLoginModal();
  // Check if the listing has been favorited by the current user
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);
  // Define the function to toggle the favorite status of the listing
  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // If the user is not logged in, open the login modal
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      // Determine whether to add or remove the listing from the user's favorites
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }
      // Make the API request to update the user's favorites
      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      // Show an error toast if the request fails
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);
  // Return the result of the hook as an object
  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;

// The code defines a React hook function useFavorite that handles the logic for adding or removing a listing from a user's favorites. The code uses axios to make API requests, useRouter from Next.js to handle page navigation, useCallback to memoize the toggle function, and useMemo to determine whether the listing has been favorited by the current user. The code also uses a SafeUser interface to define the shape of the user object, an IUseFavorite interface to define the hook parameters, and the useLoginModal hook to handle the login modal.