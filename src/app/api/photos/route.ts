import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 100,
      context: true,
      tags: true,
    });

    const photos = result.resources.map((r: Record<string, unknown>) => ({
      publicId: r.public_id,
      alt: (r.context as Record<string, string> | undefined)?.alt ?? String(r.public_id),
      tags: (r.tags as string[]) ?? [],
    }));

    return NextResponse.json(photos, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[photos]", err);
    return NextResponse.json([], { status: 500 });
  }
}