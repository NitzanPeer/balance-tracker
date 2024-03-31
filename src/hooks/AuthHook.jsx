import { useContext } from 'react';
import { UserContext } from '../contexts/AuthContext';

// This is a custom hook which lets me get auth information all around the app
export function useAuth() {
  const auth = useContext(UserContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return auth;
}