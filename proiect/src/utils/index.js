
export const logout = () => {
    localStorage.removeItem('user token');
}

export const isLogin = () => {
    if (localStorage.getItem(localStorage.key(1))) {
        console.log('am gasit token',localStorage.getItem(localStorage.key(1)))
        return true;
    }
    console.log('nu a luat tokenul bine')
    return false;
}