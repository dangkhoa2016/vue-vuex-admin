
import TokenHelper from '../helpers/token.helper';

export default function authHeader() {
    let user = TokenHelper.getCacheUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
        // return { 'x-access-token': user.token };       // for Node.js Express back-end
    } else {
        return {};
    }
}
