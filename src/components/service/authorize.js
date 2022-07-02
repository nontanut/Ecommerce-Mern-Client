// token keep in local storage
export const authenticate = (response, next) => {
    if(window !== "undefined") {
        // เก็บข้อมูลลง local storage และแปลง json obj => string
        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken))
    }
    next();
} 

// fetch data token
export const getToken = () => {
    if (window !== "undefined") {
        // check token
        if (localStorage.getItem("accessToken")) {
            // change string to json
            return JSON.parse(localStorage.getItem("accessToken"))
        }else{
            return false;
        }
    }
}

// logout
export const logout = (next) => {
    if (window !== "undefined") {
        localStorage.removeItem("accessToken");
    }
    // force reload
    // window.location.reload()
    next();
}