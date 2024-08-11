import Image from 'next/image';
import { GetStaticProps } from 'next';

// Define a type for the post data
type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

// Define a type for the props
type StaticProps = {
    data: Post[];
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data: Post[] = await response.json();

    return {
        props: {
            data,
        },
    };
};

const Static: React.FC<StaticProps> = ({ data }) => {
    return (
        <div>
            <h1>Static Page</h1>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Static;
