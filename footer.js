function generateFooter() {
    let footer = document.querySelector(".footer");
    footer.innerHTML = `
        <div class="footer-line"></div>
        <div class="footer-wrapper">
        <section class="footer-top">
            <div class="footer-headline">
            <h2>Subscribe to our newsletter</h2>
            <p>Stay up to date with our news and articles</p>
            </div>
            <div class="footer-subscribe">
            <input class="input__field" id="email" type="email" required />
            <label for="email" class="input__label">Email</label>
            <button>Sign Up</button>
            </div>
        </section>
        <div class="footer-columns">
            <section class="footer-logo">
            LOGO
            </section>
            <section>
            <h3>Product</h3>
            <ul>
                <li>
                <a href="#" title="API">API</a>
                </li>
                <li>
                <a href="#" title="Pricing">Pricing</a>
                </li>
                <li>
                <a href="#" title="Documentation">Documentation</a>
                </li>
                <li>
                <a href="#" title="Release Notes">Release Notes</a>
                </li>
                <li>
                <a href="#" title="Status">Status</a>
                </li>
            </ul>
            </section>
            <section>
                <h3>Resources</h3>
                <ul>
                <li>
                    <a href="#" title="Support">Support</a>
                </li>
                <li>
                    <a href="#" title="Sitemap">Sitemap</a>
                </li>
                <li>
                    <a href="#" title="Newsletter">Newsletter</a>
                </li>
                <li>
                    <a href="#" title="Help Centre">Help Centre</a>
                </li>
                <li>
                    <a href="#" title="Investor">Investor</a>
                </li>
                </ul>
            </section>
            <section>
                <h3>Company</h3>
                <ul>
                <li>
                    <a href="#" title="About Us">About Us</a>
                </li>
                <li>
                    <a href="#" title="Blog">Blog</a>
                </li>
                <li>
                    <a href="#" title="Careers">Careers</a>
                </li>
                <li>
                    <a href="#" title="Press">Press</a>
                </li>
                <li>
                    <a href="#" title="Contact">Contact</a>
                </li>
                </ul>
            </section>
            <section>
                <h3>Legal</h3>
            <ul>
                <li>
                <a href="#" title="Terms and services">
                    Terms
                </a>
                </li>
                <li>
                <a href="#" title="Privacy Policy">
                    Privacy
                </a>
                </li>
                <li>
                <a href="#" title="Cookies">
                    Cookies
                </a>
                </li>
                <li>
                <a href="#" title="Licenses">
                    Licenses
                </a>
                </li>
                <li>
                <a href="#" title="Cookies">
                    Contact
                </a>
                </li>
                </ul>
            </section>
            </div>
            <div class="footer-bottom">
            <div class='social-links'>
                <ul>
                <li>
                    <a href="https://www.instagram.com/mattia.guggi/" title="Instagram">
                    <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png" alt='Instagram'>                       
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/paandavfx" title="Twitter">
                    <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Twitter3_colored_svg-512.png" alt='Twitter'>
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/channel/UCUT8fF3IMccI1jmWONZq2gw" title="Youtube">
                    <img src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-512.png" alt='YouTube'>
                    </a>
                </li>
                </ul>
            </div>
            <small>© Made By Guggi Mattia. All rights reserved</small>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    generateFooter();
});