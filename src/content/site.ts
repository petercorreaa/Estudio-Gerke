/**
 * Firm identity and contact details.
 *
 * These values are identical in both locales, a street address and a phone
 * number do not get translated, so they are plain strings, not `Localized`.
 * The labels that introduce them ("Dirección" / "Address") live in `ui.ts`.
 */

export interface Site {
  readonly name: string;
  readonly shortName: string;
  readonly founded: number;
  readonly address: string;
  readonly casilla: string;
  readonly city: string;
  readonly country: string;
  readonly phones: readonly string[];
  readonly email: string;
  /** Unused fallback; the /contact map embed geocodes `address` directly. */
  readonly mapCoordinates: { readonly lat: number; readonly lng: number };
}

export const site = {
  name: "Estudio Jurídico Gerke, Sociedad Civil",
  shortName: "Estudio Jurídico Gerke",
  founded: 1971,
  address: "Av. Julio C. Patiño Nº 1377, Calacoto, La Paz, Bolivia",
  casilla: "Casilla Nº 14606",
  city: "La Paz",
  country: "Bolivia",
  phones: ["(591-2) 2790334", "(591-2) 2790344"],
  // TODO: client to confirm. Leave empty until then, do not invent an address.
  // Components must treat "" as "no email yet" and render nothing.
  email: "",
  // Approximate: an unused, documented fallback only. The /contact map embed
  // and its "Ver en Google Maps" link both geocode `address` directly, so
  // they land on the real building regardless of this value; nothing in the
  // app currently reads it for display.
  mapCoordinates: { lat: -16.5378, lng: -68.0894 },
} as const satisfies Site;
