export default function ProductDetail(props) {
  return (
    <>
      <div className="mx-auto w-4/5 mt-32">
        <div className="grid grid-cols-2 gap-6">
          <div className="productCarousel">
            <img src={props.cover} alt={`Image of ${props.name}`} />
          </div>
          <div className="productIntro flex-col">
            <h1>{props.name}</h1>
            <h2>{props.description}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {}

export async function getStaticProps({ params }) {}
