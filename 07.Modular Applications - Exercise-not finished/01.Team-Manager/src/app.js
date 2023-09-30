
import page from '../node_modules/page/page.mjs'
import { logout } from './api/auth.js';
import { renderMiddleware, updateNav } from './api/utils.js';
import { browsePage } from './views/browse.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myTeamsPage } from './views/myTeams.js';
import { registerPage } from './views/register.js';


page(renderMiddleware);
page('/',homePage);
page('/index.html',homePage);
page('/browse',browsePage);
page('/myTeams',myTeamsPage);
page('/login',loginPage);
page('/register',registerPage);
page('/create',createPage);
page('/details/:id',detailsPage);
page('/edit/:id',editPage);
page.start();
updateNav();

document.getElementById('logoutBtn').addEventListener('click',logoutPage);
async function logoutPage(){

    await logout();
    updateNav();
    page.redirect('/');
}

