import { AppDispatch } from 'app/providers/ReduxProvider';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
