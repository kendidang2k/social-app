import Link from "next/link"

export default function Homepage() {
  return (
    <>
      <h1>Homepage</h1>
      <Link href="/posts">
        <a>Post List</a>
      </Link>
    </>
  )
}
