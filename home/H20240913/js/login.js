let usernameReg = /^[A-Za-z]+$/;
let register = document.querySelector('.register');
let userInfo = [{
    "username": "admin",
    "password": "admin"
},
{
    "username": "user",
    "password": "user"
}];

register.addEventListener('click', function () {
    Swal.fire({
        title: '注册',
        html: `
            <input id="username1" class="swal2-input" placeholder="用户名">
            <input id="password1" class="swal2-input" placeholder="密码" type="password">
            <input id="repassword" class="swal2-input" placeholder="确认密码" type="password">
        `,
        confirmButtonText: '注册',
        preConfirm: () => {
            let username = document.getElementById('username1').value;
            let password = document.getElementById('password1').value;
            let repassword = document.getElementById('repassword').value;
            if (username === '' || password === '' || repassword === '') {
                console.log(username);
                console.log(password);
                console.log(repassword);
                Swal.showValidationMessage('请填写完整信息');
                return false;
            } else if (!usernameReg.test(username)) {
                Swal.showValidationMessage('用户名只能为字母');
                return false;
            } else if (password.length < 6) {
                Swal.showValidationMessage('密码长度不能小于6位');
                return false;
            } else if (password !== repassword) {
                Swal.showValidationMessage('两次密码输入不一致');
                return false;
            } else {
                let user = {
                    "username": username,
                    "password": password,
                }
                userInfo.push(user);
                Swal.fire('注册成功', '', 'success');
            }
        }
    })
})

let login = document.querySelector('.account-login');
console.log(login);

login.addEventListener('submit', function (e) {
    console.log(e);
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let user = userInfo.find(item => item.username === username && item.password === password);
    if (user) {
        Swal.fire({
            title: '登录成功',
            text: '',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    } else {
        Swal.fire('登录失败', '用户名或密码错误', 'error');
    }
})

document.getElementById('username').addEventListener('input', function () {
    let username = document.getElementById('username').value;
    if (!usernameReg.test(username)) {
        document.getElementById('username').style.borderColor = 'red';
    } else {
        document.getElementById('username').style.borderColor = 'green';
    }
})

document.getElementById('password').addEventListener('input', function () {
    let password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('password').style.borderColor = 'red';
    } else {
        document.getElementById('password').style.borderColor = 'green';
    }
})

let boo = document.getElementById('show-password');
let hide = document.getElementById('hide-password');
let password = document.getElementById('password');
boo.addEventListener('click', function () {
    password.type = 'text';
    boo.style.display = 'none';
    hide.style.display = 'block';
});

hide.addEventListener('click', function () {
    password.type = 'password';
    hide.style.display = 'none';
    boo.style.display = 'block';
});