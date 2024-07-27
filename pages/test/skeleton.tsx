



export default function Skeleton() {
    return(
        <div className="bg-gray-200 ">
            <div className="container mx-auto p-5">
                <div className="relative w-fit">
                    <img src="https://placehold.co/200" alt="" className="w-40 h-40 rounded-full"/>
                    <div className="bg-white absolute top-0 left-0 w-full h-full z-10 rounded-full skeleton"></div>
                </div>
            </div>
        </div>
    )
}
