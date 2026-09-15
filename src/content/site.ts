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
  /** Center point for the /contact map embed. */
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
  // TODO: approximate, centers the /contact map embed on the Calacoto
  // neighborhood in La Paz. Refine to the exact building once the firm
  // confirms precise coordinates for Av. Julio C. Patiño Nº 1377. The
  // "Ver en Google Maps" link next to the embed geocodes the real address
  // text directly, so it is accurate regardless of this value.
  mapCoordinates: { lat: -16.5378, lng: -68.0894 },
} as const satisfies Site;
