import { NextResponse } from "next/server";
import { validateOrder } from "../../../lib/schema";

// In-memory store for demo (a real app would use a database)
const ordersStore = [];
let nextOrderId = 1;

/**
 * POST /api/orders
 * Validates request body against Day 33 schema.
 * Returns 201 on success with the saved order.
 * Returns 422 with fieldErrors on invalid input.
 */
export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Request body must be valid JSON.",
        statusCode: 400,
      },
      { status: 400 }
    );
  }

  const { isValid, fieldErrors } = validateOrder(body);

  if (!isValid) {
    return NextResponse.json(
      {
        error: "Unprocessable Entity",
        message: "Validation failed. Please fix the field errors.",
        fieldErrors,
        statusCode: 422,
      },
      { status: 422 }
    );
  }

  // Build and store the order
  const newOrder = {
    id: nextOrderId++,
    name: body.name.trim(),
    phone: body.phone.trim(),
    address: body.address.trim(),
    items: body.items,
    totalPrice: body.items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    ),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  ordersStore.push(newOrder);

  return NextResponse.json(
    {
      message: "Order placed successfully!",
      order: newOrder,
    },
    { status: 201 }
  );
}

/**
 * GET /api/orders
 * Returns all orders (for admin/demo purposes).
 */
export async function GET() {
  return NextResponse.json({ orders: ordersStore }, { status: 200 });
}
