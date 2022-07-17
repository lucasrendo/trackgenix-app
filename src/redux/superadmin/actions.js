import { RESET_SUPER_ADMIN, RESET_MESSAGE } from './constants';

export const resetSuperAdmin = () => ({
  type: RESET_SUPER_ADMIN
});
export const resetMessage = () => ({
  type: RESET_MESSAGE
});
