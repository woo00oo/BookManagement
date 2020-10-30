const { default: Axios } = require("axios");

function getToken(){
    return localStorage.getItem('token');
}

async function login(event){
    event.preventDefault();
    event.stopPropagation();

    const emailElement = document.querySelector('#email');
    const passwordElement = document.querySelector('#password');

    const email = emailElement.Value;
    const password = passwordElement.Value;

    console.log(email, password);

    try {
        const res = await axios.post('https://api.marktube.tv/v1/me', {
        email: email,
        password: password
        });
        const { token } = res.data; //const token = res.data.token;
        if (token === undefined) {
        return;
        }
        localStorage.setItem('token', token);
        location.assign('/');
    } catch (error) {
        const data = error.response.data;
        if (data) {
        const state = data.error;
        if (state === 'USER_NOT_EXIST') {
            alert('사용자가 존재하지 않습니다.');
        } else if (state === 'PASSWORD_NOT_MATCH') {
            alert('비밀번호가 틀렸습니다.');
        }
        }
    }
}
function bindLoginButton(){
    const form = document.querySelector('#form-login');
    form.addEventListener('sumit',login);
}

function main(){
    //버튼에 이벤트 연결
    bindLoginButton();
    //토큰체크
    const token = getToken();
    if(token !== null){
        location.assign('/');
        return;
    }
}




document.addEventListener('DOMContentLoaded',main);