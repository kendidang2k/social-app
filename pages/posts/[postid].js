import Head from "next/head";
import { useRouter } from "next/router";


export default function Post({ post }) {

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </>

    )
}

export const getStaticPaths = async ({params}) => {
    const resPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
    );

    const data = await resPost.json();

    const paths = data && data.map((post) => {
        return { params: { postid: post.id.toString() } }
    });

    // console.log("path:", paths);

    return { paths, fallback: true };

};

// get post detail
export const getStaticProps = async ({ params }) => {
    const id = params.postid;

    const resPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    // const resAllPost = await fetch(
    //     "https://jsonplaceholder.typicode.com/posts?_limit=10"
    // );

    const data = await resPost.json();

    return {
        props: {
            post: data,
        },
    };
};