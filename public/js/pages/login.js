const signUpForm = document.getElementById('sign-up-form');
const signUpUsername = document.getElementById('sign-up-username');
const signUpPassword = document.getElementById('sign-up-password');
const signUpConfirmPassword = document.getElementById('sign-up-confirm-password');

const signUpBtn = document.getElementById('submit-sign-up');
const switchLoginBtn = document.getElementById('switch-login');

// Login form HTML elements
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const loginBtn = document.getElementById('submit-login');
const switchSignUpBtn = document.getElementById('switch-sign-up');



// Login form events
loginBtn.addEventListener('click', async (event) => {
    // store inputted values as variables
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if(username && password){
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Login failed!');
        }
    }else{
        alert('Please fill in all fields');
    }

    loginUsername.value = '';
    loginPassword.value = '';
});
switchSignUpBtn.addEventListener('click', (event) => {
    // display sign up form and hide login form
    loginForm.setAttribute('style', 'display: none');
    signUpForm.setAttribute('style', 'display: block');
});


// Sign up form events
signUpBtn.addEventListener('click', async(event) => {
    // store inputted values as variables
    const username = signUpUsername.value.trim();
    const password = signUpPassword.value.trim();
    const confirmPassword = signUpConfirmPassword.value.trim();

    if(password !== confirmPassword){
        alert('Passwords do not match!');
        return;
    }
    if(password.length < 8){
        alert('Password is too short');
        return;
    }
    if(username && password && confirmPassword){
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        }else{
            alert('Sign up failed');
        }
    }else{
        alert('Please fill in all fields')
    }

    signUpUsername = '';
    signUpPassword = '';
    signUpConfirmPassword = '';
});
switchLoginBtn.addEventListener('click', (event) => {
    // display sign up form and hide login form
    signUpForm.setAttribute('style', 'display: none');
    loginForm.setAttribute('style', 'display: block');
});