// store.js
import { page } from "$app/stores"; // Values: https://developer.mozilla.org/en-US/docs/Web/API/URL

// Personal
export const name       = 'Jona Ebert';
export const pronouns   = 'they/them';
export const job        = 'Systemadministrator';
export const address = {
    street: 'Postfach 5835',
    zipcode: '38049',
    city: 'Braunschweig',
    country: 'Deutschland'
};
export const contact = {
    fax: '+49 3222 5002 428',
    mail: 'kontakt@jonaebert.de',
    web: '/contact'
}

// URI
export const uri = page;

// API
export const apiDomain = 'api.jonasebert.de';
// export const apiSecret = process.env.JONA_EBERT_API_SECRET === '' ? '1234' : '';

// Pictures
// Logo
export const logo = '/logo/logo_310x100.svg';
export const logo_clear = '/logo/logo_310x100_clear.svg';
export const logo_small = '/logo/logo_500x500.svg';
export const logo_small_clear = '/logo/logo_500x500_clear.svg';

// Block image copy and context menu
export function contextMenuAction(node) {
    node.oncontextmenu = event => {
        event.preventDefault();
    };
    node.draggable = false;

    return {
        destroy() {
            node.oncontextmenu = null;
        }
    };
}