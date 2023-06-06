const userAuth = {
  isTokenAv() {
    if (!localStorage.getItem('token')) {
      return false
    } else {
      return true
    }
  }
}

export default userAuth
