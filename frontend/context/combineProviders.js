export default function Compose(props) {
  const { components = [], children, ...rest } = props;
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp {...rest}>{acc}</Comp>;
      }, children)}
    </>
  );
}
