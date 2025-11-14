export default function loader() {
    return (
        <div>
            <h1 className="text-2xl font-bold">Loading...</h1>
            <div className="animate-pulse">
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
            </div>
        </div>
    )
}