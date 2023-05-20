export const OfferDescription = {
  MaxLength: 1024,
  MinLength: 20,
} as const;

export const OfferGuestCount = {
  Max: 10,
  Min: 1,
} as const;

export const OfferPrice = {
  FractionCount: 2,
  Max: 100_000,
  Min: 100,
} as const;

export const OfferRating = {
  FractionCount: 2,
  Max: 2,
  Min: 1,
} as const;

export const OfferRoomCount = {
  Max: 8,
  Min: 1,
} as const;

export const OfferTitle = {
  MaxLength: 100,
  MinLength: 10,
} as const;
