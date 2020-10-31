const { default: Axios } = require("axios");

document.addEventListener('DOMContentLoaded',main);

async function main(){
    //로그아웃 버튼에 이벤트 연결
    bindLogoutButton();

    //토큰 체크
    const token = getToken();
    if (token === null){
        location.assign('/login');
        return;
    }

    //토큰으로 서버에서 나의 정보 받아오기
    

    //나의 책을 서버에서 받아오기

    //받아온 책을 그리기
}

function bindLogoutButton(){
    const btnLogout = document.querySelector('#btn_logout');
    btnLogout.addEventListener('click',logout);
}

async function logout(){
    const token = getToken();
    if (token === null){
        location.assign('/login');
        return;
    }
    try{
        await axios.delete('https://api.marktube.tv/v1/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    }catch(error){
        console.log('logout error',error);
    }finally{
        localStorage.clear();
        location.assign('/login');
    }
}

function getToken(){
    return localStorage.getItem('token');
}
