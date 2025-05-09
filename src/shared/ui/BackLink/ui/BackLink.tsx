import { memo, type FC } from 'react';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'shared/ui/Link/Link';

interface BackLinkProps {
  className?: string;
  href?: string;
}

export const BackLink: FC<BackLinkProps> = memo((props) => {
  const { href } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (href) {
      navigate(href);
    } else navigate(-1); // переход на предыдущую страницу
  };

  return (
    <Link
      color="neutral"
      level="h3"
      onClick={handleClick}
      startDecorator={<ArrowBack />}
    />
  );
});
