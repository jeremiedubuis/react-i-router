export const pathPartsParse = (pathParts, route) => {
    const routeParts = route.split('/');
    let params = {};
    let matches = true;

    for (let i = 0, iLength = pathParts.length; i < iLength; i++) {
        if (pathParts[i] === routeParts[i]) continue;

        // if mandatory parameter
        if (/^:/.test(routeParts[i])) {
            if (!pathParts[i]) {
                matches = false;
                break;
            } else {
                params[routeParts[i].replace(':', '')] = pathParts[i];
            }
            //if optional parameter
        } else if (/^\?/.test(routeParts[i])) {
            if (pathParts[i]) params[routeParts[i].replace('?', '')] = pathParts[i];
            else {
                matches = false;
                break;
            }
        } else {
            matches = false;
            break;
        }
    }

    return {
        route,
        params,
        matches
    };
}
