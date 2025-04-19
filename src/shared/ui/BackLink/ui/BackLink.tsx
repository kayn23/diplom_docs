import { memo, type FC } from 'react';
import { useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';
import { Link } from '@mui/joy';

interface BackLinkProps {
  className?: string;
}

export const BackLink: FC<BackLinkProps> = memo(() => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // переход на предыдущую страницу
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
