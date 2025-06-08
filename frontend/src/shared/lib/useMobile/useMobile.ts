import { useMediaQuery } from 'usehooks-ts';

export const useMobile = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return isMobile;
};
