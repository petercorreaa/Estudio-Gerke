/** Converts a display-formatted Bolivian phone number to a tappable tel: href. */
export function toTelHref(phone: string): string {
  return `tel:+${phone.replace(/[^0-9]/g, "")}`;
}
