import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ListingCard from "./ListingCard";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("ListingCard", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  const mockListing: SafeListing = {
    id: "1",
    imageSrc: "https://example.com/image.jpg",
    locationValue: "US",
    price: 100,
    category: "Apartment",
    title: "Test Listing",
    description: "A test listing for unit testing",
    roomCount: 2,
    bathroomCount: 1,
    guestCount: 4,
    userId: "1",
    createdAt: "2022-01-01T00:00:00.000Z",
  };
  

  const mockReservation: SafeReservation = {
    id: "1",
    startDate: "2023-05-01",
    endDate: "2023-05-05",
    totalPrice: 500,
    listingId: mockListing.id,
    listing: {
      ...mockListing,
      createdAt: "2022-01-01T00:00:00.000Z",
    },
    userId: "1",
    createdAt: "2022-01-01T00:00:00.000Z",
  };
  

  const mockUser: SafeUser = {
    id: "1",
    email: "test@example.com",
    name: "Test User",
    image: "https://example.com/avatar.jpg",
    hashedPassword: "hashed-password-for-testing",
    favoriteIds: [],
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
    emailVerified: null,
  };

  it("renders without crashing", () => {
    render(<ListingCard data={mockListing} />);
    expect(screen.getByText("Apartment")).toBeInTheDocument();
  });

  it("navigates to listing page when clicked", () => {
    render(<ListingCard data={mockListing} />);
    fireEvent.click(screen.getByText("Apartment"));
    expect(mockRouter.push).toHaveBeenCalledWith("/listings/1");
  });

  it("displays reservation date range when provided", () => {
    render(<ListingCard data={mockListing} reservation={mockReservation} />);
    expect(screen.getByText("May 1, 2023 - May 5, 2023")).toBeInTheDocument();
  });

  it("displays correct price when reservation is provided", () => {
    render(<ListingCard data={mockListing} reservation={mockReservation} />);
    expect(screen.getByText("$ 500")).toBeInTheDocument();
  });

  it("executes onAction when action button is clicked", () => {
    const mockOnAction = jest.fn();
    render(
      <ListingCard
        data={mockListing}
        onAction={mockOnAction}
        actionLabel="Test Action"
        actionId="1"
        currentUser={mockUser}
      />
    );

    fireEvent.click(screen.getByText("Test Action"));
    expect(mockOnAction).toHaveBeenCalledWith("1");
  });
});
