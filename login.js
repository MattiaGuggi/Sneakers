function loadLoginForm() {
    let group = document.querySelector(".form");

    group.innerHTML = `
        <div class="login-container">
            <h3 class="form-name">Login</h3>
            <div class="button-container">
                <button class="selection-form selected-form" id="login-btn">Login</button>
                <button class="selection-form" id="signup-btn">Sign Up</button>
            </div>
            <div class="login">
                <input type="text" placeholder="Email" class="email">
                <input type="password" placeholder="Password" class="password">
            </div>
            <div class="signup">
                <input type="text" placeholder="User" class="user">
                <input type="text" placeholder="New Email" class="email">
                <input type="password" placeholder="New Password" class="password">
            </div>
            <button class="final-btn">Login</button>
        </div>
    `;

    addEvents();
}

function addEvents() {
    let signupContainer = document.querySelector(".signup");
    let loginContainer = document.querySelector(".login");
    let signupBtn = document.querySelector("#signup-btn");
    let loginBtn = document.querySelector("#login-btn");
    let finalBtn = document.querySelector(".final-btn");
    let page = document.querySelector(".form-name");
    let emailDiv = document.querySelector(".login .email");
    let passwordDiv = document.querySelector(".login .password");
    let signupEmail = document.querySelector(".signup .email");
    let signupPassword = document.querySelector(".signup .password");
    let signupUser = document.querySelector(".signup .user");

    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';

    loginBtn.addEventListener("click", () => {
        loginBtn.classList.add("selected-form");
        signupBtn.classList.remove("selected-form");
        loginContainer.style.display = 'block';
        signupContainer.style.display = 'none';
        page.innerText = "Login";
        finalBtn.innerText = "Login";
    });

    signupBtn.addEventListener("click", () => {
        signupBtn.classList.add("selected-form");
        loginBtn.classList.remove("selected-form");
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
        page.innerText = "Sign Up";
        finalBtn.innerText = "Sign Up";
    });

    finalBtn.addEventListener("click", () => {
        if (page.innerText === "Login") {
            if (emailDiv.value !== "" && passwordDiv.value !== "")
                checkCredentials(emailDiv.value, passwordDiv.value);
        }
        else {
            if (signupEmail.value !== "" && signupPassword.value !== "" && signupUser !== "") {
                if(checkValidity(signupUser.value, signupEmail.value)) {
                    addUser(signupUser.value, signupEmail.value, signupPassword.value);
                }
            }
        }
    });
}

function checkValidity(userToCheck, emailToCheck) {
    let users = JSON.parse(localStorage.getItem("Users")) || [];

    for (let i=0 ; i<users.length ; i++) {
        let user = users[i];
        let name = user.user;
        let email = user.email;

        if (name === userToCheck) {
            alert("User already existent");
            return false;
        }

        if (email === emailToCheck) {
            alert("Email already used");
            return false;
        }
    }

    return true;
}

async function checkCredentials(email, password) {
    let nickname = await getId(email, password);
    if (nickname)
        confirmEntry(nickname);
    else 
        refuseEntry();
}

async function getId(email, password) {
    try {
        let response = await fetch('users.json');
        let data = await response.json();
        let names = data;
        let idx = -1;

        names.forEach((name, index) => {
            if (name.email === email && name.password === password)
                idx = index;
        });

        if (idx !== -1)
            return names[idx].user;
        else
            return null;
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

function addUser(user, email, password) {
    let users = JSON.parse(localStorage.getItem("Users")) || [];
    let newUser = {
        user: user,
        email: email,
        password: password
    };
    users.push(newUser); 
    localStorage.setItem("Users", JSON.stringify(users));
    saveNewUser();
}

function saveNewUser() {
    let users = JSON.parse(localStorage.getItem("Users"));

    fetch('/save-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success)
          console.log("User added successfully!");
        else
          console.error("Error adding user:", data.message);
    })
    .catch(error => console.error("Fetch error:", error));
}

function confirmEntry(nickname) {
    alert("Welcome Back " + nickname);
}

function refuseEntry() {
    alert("Email or password not valid");
}

document.addEventListener("DOMContentLoaded", () => {
    loadLoginForm();
});