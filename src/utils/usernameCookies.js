import Cookies from 'js-cookie';
import faker from 'faker';

import { cookiesParams } from './appConstants';

const getUserName = () => {
  const savedUserName = Cookies.get(cookiesParams.userName);

  if (savedUserName === undefined) {
    const newUserName = faker.internet.userName();
    Cookies.set(cookiesParams.userName, newUserName, { expires: 1 });
    return newUserName;
  }

  return savedUserName;
};

export default getUserName;
