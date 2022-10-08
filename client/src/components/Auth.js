module.exports = {
    isAuthenticated() {
        const lsUser = JSON.parse(localStorage.getItem('user'));

        if (!lsUser || !lsUser.token) {
            return false
        }
        return true;
    },
    logout() {
        localStorage.removeItem('user');
    }
}