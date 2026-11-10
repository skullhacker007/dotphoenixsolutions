import { NextResponse } from "next/server";

type ApiCountry = {
  name: string;
  code: string;
  dialCode: string;
  flag?: string;
};

const FALLBACK_COUNTRIES = [
  { country: "India", iso: "IN", code: "+91", flag: "🇮🇳", label: "India (+91)" },
  { country: "United States", iso: "US", code: "+1", flag: "🇺🇸", label: "United States (+1)" },
  { country: "United Kingdom", iso: "GB", code: "+44", flag: "🇬🇧", label: "United Kingdom (+44)" },
  { country: "Canada", iso: "CA", code: "+1", flag: "🇨🇦", label: "Canada (+1)" },
  { country: "Australia", iso: "AU", code: "+61", flag: "🇦🇺", label: "Australia (+61)" },
  { country: "Germany", iso: "DE", code: "+49", flag: "🇩🇪", label: "Germany (+49)" },
  { country: "Singapore", iso: "SG", code: "+65", flag: "🇸🇬", label: "Singapore (+65)" },
  { country: "United Arab Emirates", iso: "AE", code: "+971", flag: "🇦🇪", label: "United Arab Emirates (+971)" },
];

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(
      "https://www.countrycalling.codes/api/calling-codes?limit=250",
      {
        next: { revalidate: 86400 },
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Country API failed: ${response.status}`);
    }

    const data = await response.json();
    const records: ApiCountry[] = data.countries;

    if (!Array.isArray(records)) {
      throw new Error("Invalid country API response");
    }

    const countries = records
      .filter((item) => item.name && item.code && item.dialCode)
      .map((item) => ({
        country: item.name,
        iso: item.code,
        code: item.dialCode,
        flag: item.flag ?? "",
        label: `${item.name} (${item.dialCode})`,
      }))
      .sort((a, b) => a.country.localeCompare(b.country));

    return NextResponse.json(countries, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.warn("Country calling codes fetch fallback engaged:", error);

    return NextResponse.json(FALLBACK_COUNTRIES, {
      headers: {
        "Cache-Control": "public, s-maxage=3600",
      },
    });
  }
}
