import { GetStaticProps } from 'next';

type ImageInfo = {
    imageUrl: string;
    alias: string;
    imageKey: string;
};


export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch('http://localhost:3000/api/get-images');
    const data: ImageInfo[] = await response.json();

    return {
        props: {
            data,
        },
    };
};




// Define a type for the post data



export default function Review({ data }: { data: ImageInfo[] }) {
    return (
        <div>
            <h1>Review Page</h1>
            <ul>
                {data.map((image) => (
                    <li key={image.imageKey}>
                        <img src={image.imageUrl} alt={image.alias} />
                        <ul>
                            <li>Alias: {image.alias}</li>
                            <li>Image Key: {image.imageKey}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}