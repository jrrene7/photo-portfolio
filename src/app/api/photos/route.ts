import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Maps Cloudinary asset_folder paths to gallery tab keys
const FOLDER_TO_TAG: Record<string, string> = {
  "rene-vision/portraits": "portraits",
  "rene-vision/events": "events",
  "rene-vision/branding": "brands",
  "rene-vision/miscellaneous": "misc",
};

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('asset_folder="rene-vision/*"')
      .with_field("context")
      .max_results(200)
      .execute();

    const photos = result.resources.map((r: Record<string, unknown>) => {
      const publicId = String(r.public_id);
      const assetFolder = String(r.asset_folder ?? "");
      const category = FOLDER_TO_TAG[assetFolder];

      return {
        publicId,
        alt: (r.context as Record<string, string> | undefined)?.alt ?? publicId,
        tags: category ? [category] : [],
      };
    });

    return NextResponse.json(photos, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[photos]", err);
    return NextResponse.json([], { status: 500 });
  }
}