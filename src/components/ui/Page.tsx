import { PageType } from '../../models';

const Page = ({ description, children }: PageType) => {
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
