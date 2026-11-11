import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

/**
 * GET /api/dishes/[id]
 * Returns a single dish by ID.
 * Returns 404 with the standard error shape for an unknown id.
 */
export async function GET(request, { params }) {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);

  const dish = dishes.find((d) => d.id.toString() === params.id);

  if (!dish) {
    return NextResponse.json(
      {
        error: "Not Found",
        message: `Dish with id '${params.id}' does not exist.`,
        statusCode: 404,
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ dish }, { status: 200 });
}
