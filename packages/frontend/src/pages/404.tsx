import { ErrorTemplate } from '@micro/templates/ErrorTemplate';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
  return (
    <ErrorTemplate
      code="404"
      message="Sorry, the page you are looking for does not exist."
      action="Go back home"
    />
  );
};

export default NotFoundPage;
