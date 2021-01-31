import Cookies from 'js-cookie';
import faker from 'faker';

const getUserName = () => {
  const savedUserName = Cookies.get('userName');

  if (savedUserName === undefined) {
    const newUserName = faker.internet.userName();
    Cookies.set('userName', newUserName, { expires: 1 });
    return newUserName;
  }

  return savedUserName;
};

const userName = getUserName();

export default userName;
