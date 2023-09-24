import page from '../node_modules/page/page.mjs';

import { logout } from './api/data.js';
import { catalogView } from "./view/catalog.js";
import { createView } from "./view/create.js";
import { detailsView } from "./view/details.js";
import { editView } from "./view/edit.js";
import { loginView } from "./view/login.js";
import { registerView } from "./view/register.js";
import { myFurnitureView } from './view/myFurniture.js';
import { renderMiddleware, updateNav } from './app/utils.js';

page(renderMiddleware)
page('/',catalogView);
page('/catalog',catalogView);
page('/create',createView);
page('/details/:id',detailsView);
page('/edit/:id',editView);
page('/login',loginView);
page('/register',registerView);
page('/my-furniture',myFurnitureView);
page('*',catalogView);

page.start();
updateNav();

document.getElementById('logoutBtn').addEventListener('click',async()=>{
    await logout();
    updateNav();
    page.redirect('/');
})


