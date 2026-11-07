"use client";
export default function PrintButton({ label = "Print or save as PDF" }) {
  return <button type="button" className="btn ghost small noprint" onClick={() => window.print()}>{label}</button>;
}
