import { NextResponse } from "next/server";

const FRAME_IO_API = "https://api.frame.io/v2";

export async function GET() {
  const token = process.env.FRAME_IO_TOKEN;
  const folderId = process.env.FRAME_IO_FOLDER_ID;

  if (!token || !folderId) {
    return NextResponse.json(
      { error: "Missing FRAME_IO_TOKEN or FRAME_IO_FOLDER_ID env vars" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `${FRAME_IO_API}/assets/${folderId}/children?type=file&per_page=50`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || "Frame.io request failed" },
        { status: res.status }
      );
    }

    const items = await res.json();

    const photos = items
      .filter((item: any) => item.download_url)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        src: item.download_url,
        alt: item.name || "Frame.io asset",
      }));

    return NextResponse.json({ photos });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to reach Frame.io" },
      { status: 502 }
    );
  }
}
