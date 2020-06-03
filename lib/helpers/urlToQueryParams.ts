export const urlToQueryParams = (url: string) : object => {
    const queryParams = {};
    if (url.indexOf('?') > -1) {
        const query = url.split('?').pop();
        const _queryParams = query.split('&');
        _queryParams.forEach(q => {
            const v = q.split('=');
            queryParams[v[0]] = v[1] || null;
        });
    }
    return queryParams;
};
