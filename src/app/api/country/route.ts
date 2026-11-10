import { NextResponse } from "next/server";

type ApiCountry = {
  name: string;
  code: string;
  dialCode: string;
  flag?: string;
};

export async function GET() {
  try {
    const response = await fetch(
      "https://www.countrycalling.codes/api/calling-codes?limit=250",
      { next: { revalidate: 86400 } },
    );

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

    return NextResponse.json(countries);
  } catch (error) {
    console.error("Country calling codes error:", error);

    return NextResponse.json(
      { error: "Unable to fetch country calling codes" },
      { status: 500 },
    );
  }
}