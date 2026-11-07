import Link from "next/link";
import Logo from "./Logo";

export default function Header({ profile }) {
  return (
    <header className="top">
      <Link className="brand" href="/" aria-label="True Plumb home"><Logo /><b><span>T</span>RUE <span>P</span>LUMB</b></Link>
      {profile && (
        <nav aria-label="Main">
          <Link href="/course">My course</Link>
          {(profile.role === "manager" || profile.role === "admin") && <Link href="/team">My team</Link>}
          {profile.role === "admin" && <Link href="/admin">Admin</Link>}
          <form action="/auth/signout" method="post"><button type="submit">Log out</button></form>
        </nav>
      )}
    </header>
  );
}
