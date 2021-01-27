import Cookies from 'js-cookie';
import faker from 'faker';

let userName = Cookies.get('userName');

if (userName === undefined) {
  userName = faker.internet.userName();
  Cookies.set('userName', userName, { expires: 1 });
}

export default userName;
