import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

/**
 * GET /api/dishes
 * Returns the full menu as JSON.
 */
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);

  return NextResponse.json({ dishes }, { status: 200 });
}
