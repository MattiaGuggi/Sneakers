import { toggleBar, filterResults } from './script.js';

function generateHeader() {
    let header = document.querySelector('.header');
    header.innerHTML = `
        <a href="index.html" class="logo">LOGO</a>
        <form class="search">
        <button type="button" class="search__button">
            <i  class="ri-search-2-line"></i>
        </button>
        <div class="search__input-container">
            <input id="search-input" type="text" placeholder="Search" class="search__input hidden"/>
        </div>
        </form>

        <input class="menu-btn" id="menu-btn" type="checkbox">
        <label for="menu-btn" class="menu-icon">
        <div class="plates">
            <div class="plate" onclick="this.classList.toggle('active')">
            <svg class="burger" version="1.1" height="100" width="100" viewBox="0 0 100 100">
                <path class="line line1" d="M 50,35 H 30" />
                <path class="line line2" d="M 50,35 H 70" />
                <path class="line line3" d="M 50,50 H 30" />
                <path class="line line4" d="M 50,50 H 70" />
                <path class="line line5" d="M 50,65 H 30" />
                <path class="line line6" d="M 50,65 H 70" />
            </svg>
            <svg class="x" version="1.1" height="100" width="100" viewBox="0 0 100 100">
                <path class="line" d="M 34,32 L 66,68" />
                <path class="line" d="M 66,32 L 34,68" />
            </svg>
            </div>
        </div>
        </label>
        <ul class="menu">
        <li id="login-option">
            <a href="login.html">Login</a>
        </li>
        <li id="nike-option">
            <a href="nike.html">Nike</a>
            <div class="dropdown">
            <ul class="list-items-with-description">
                <li>
                <div class="item-title">
                    <a href="dunk low.html">Dunk Low</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="dunk high.html">Dunk High</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="air max.html">Air Max</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="sb dunk.html">SB Dunk</a>
                </div>
                </li>
            </ul>          
            </div>
        </li>
        <li id="adidas-option">
            <a href="adidas.html">Adidas</a>
            <div class="dropdown">
            <ul class="list-items-with-description">
                <li>
                <div class="item-title">
                    <a href="campus.html">Campus</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="samba.html">Samba</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="stsmith.html">Stan Smith</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="superstar.html">Superstar</a>
                </div>
                </li>
            </ul>          
            </div>
        </li>
        <li id="jordan-option">
            <a href="jordan.html">Jordan</a>
            <div class="dropdown">
            <ul class="list-items-with-description">
                <li>
                <div class="item-title">
                    <a href="jordan 1.html">Jordan 1</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="jordan 2.html">Jordan 2</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="jordan 3.html">Jordan 3</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="jordan 4.html">Jordan 4</a>
                </div>
                </li>
            </ul>          
            </div>
        </li>
        <li id="yeezy-option">
            <a href="yeezy.html">Yeezy</a>
            <div class="dropdown">
            <ul class="list-items-with-description">
                <li>
                <div class="item-title">
                    <a href="yeezy 350.html">Yeezy 350</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="yeezy 500.html">Yeezy 500</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="yeezy 700.html">Yeezy 700</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="yeezy slide.html">Slide</a>
                </div>
                </li>
                <li>
                <div class="item-title">
                    <a href="yeezy foam.html">Foam Runner</a>
                </div>
                </li>
            </ul>          
            </div>
        </li>
        <li id="cart-option">
            <a href="cart.html"><i class="fas fa-shopping-cart"></i></a>
        </li>
        </ul>
    `;
}

function updateSelectedOption(selectedOption) {
    let headerOptions = document.querySelectorAll('.menu li');

    headerOptions.forEach(option => {
        option.classList.remove('page-selected');
    });

    selectedOption.classList.add('page-selected');
}

export function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.length;
    
    let menu = document.querySelectorAll(".menu li a");
    let circle = document.createElement("div");
    let menuOption;
    
    circle.classList.add("circle");
    
    menu.forEach(li => {
        menuOption = li.parentElement;
    });
    
    let existingCircle = menuOption.querySelector('.circle');
    if (existingCircle)
        existingCircle.remove();

    if (cartCount > 0) {
        circle.innerText = cartCount;
        menuOption.append(circle);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generateHeader();
    updateCartCounter();
    
    let headerOptions = document.querySelectorAll('.menu li');

    headerOptions.forEach(option => {
        option.addEventListener('click', () => {
            localStorage.setItem('selectedPage', option.id); // Saves to localStorage the name of the page the user is in
        });
    });

    let selectedPage = localStorage.getItem('selectedPage');

    if (selectedPage) {
        let selectedOption = document.getElementById(selectedPage);
        if (selectedOption)
            updateSelectedOption(selectedOption); // Adds the blue line on the header's menu
    }
    
    document.querySelector(".search__button").addEventListener("click", toggleBar);
    document.getElementById('search-input').addEventListener("input", filterResults);
});