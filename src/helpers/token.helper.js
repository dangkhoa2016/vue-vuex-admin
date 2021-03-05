
class TokenHelper {
    getCacheUser() {
        var data = localStorage.getItem('user');
        if (data) {
            var user = null;
            try {
                user = JSON.parse(data);
            } catch (ex) { }

            return user;
        }

        return null;
    }
}

export default new TokenHelper();
