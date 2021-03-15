import Link from "next/link";
export default function ProductCard(props) {
  return (
    <>
      <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${props.data.cover.url}`}
          className="object-cover w-full h-64"
          alt=""
        />
        <div className="p-5 border border-t-0">
          <a
            href={`/products/${props.data.id}`}
            aria-label="Category"
            title="Visit the East"
            className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700"
          >
            {props.data.name}
          </a>
          <p className="mb-2 text-gray-700">{props.data.description}</p>
          <Link href={`/products/${props.data.id}`}>
            <a
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              View
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
