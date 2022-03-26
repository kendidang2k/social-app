import Link from "next/link"

export default function PostList() {
    return (
        <>
            <h1>Post List</h1>
            {/* {
                postList.map(post => {
                    return (
                        <div key={post.id}>
                            <Link href={`posts/${post.id}`} passHref>
                                <a>
                                    <Post post={post}/>
                                </a>
                            </Link>
                        </div>
                    )
                })
            } */}
        </>
    )
}

// export async function getStaticProps() {
//     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await res.json();

//     console.log(data)

//     return {
//         props: {
//             postList: data,
//         }
//     }
// }


