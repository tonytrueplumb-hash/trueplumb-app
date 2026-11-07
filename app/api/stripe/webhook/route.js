import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { fulfil } from "@/lib/fulfil";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Stripe calls this after every checkout. Set it up in Stripe: Developers -> Webhooks ->
// endpoint https://app.trueplumb.co.uk/api/stripe/webhook, events checkout.session.completed
// and checkout.session.async_payment_succeeded.
export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return new Response(`Bad signature: ${e.message}`, { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return Response.json({ ignored: event.type });
  }
  const session = event.data.object;
  if (session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
    return Response.json({ waiting: session.payment_status }); // e.g. bank transfer not cleared yet
  }

  const email = (session.customer_details && session.customer_details.email) || session.customer_email;
  if (!email) return new Response("No email on session", { status: 200 });

  const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 20, expand: ["data.price.product"] });
  let kind = "other", seats = 0;
  for (const li of items.data) {
    const type = li.price && li.price.product && li.price.product.metadata ? li.price.product.metadata.type : "";
    if (type === "b2b") { kind = "team"; seats += li.quantity || 1; }
    else if (type === "individual" && kind !== "team") { kind = "individual"; seats = 1; }
  }
  const field = key => ((session.custom_fields || []).find(f => f.key === key) || {});
  const company = (field("company").text && field("company").text.value) || null;

  try {
    await fulfil(createAdminClient(), {
      email, name: session.customer_details && session.customer_details.name,
      kind, seats: seats || 1, orgName: company, sessionId: session.id,
      amountTotal: session.amount_total, currency: session.currency
    });
  } catch (e) {
    console.error("fulfil failed", session.id, e);
    return new Response("Fulfilment failed", { status: 500 }); // Stripe retries automatically
  }
  return Response.json({ ok: true });
}
