const Page = ({
  description,
  children,
}: {
  children?: any;
  description: string | React.ReactElement;
}) => {
  const descriptionContent =
    typeof description === 'string' ? (
      <p className="page-description">{description}</p>
    ) : (
      description
    );

  return (
    <section className="page">
      {descriptionContent}
      {children ? children : null}
    </section>
  );
};

export default Page;
