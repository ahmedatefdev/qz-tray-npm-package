import { __assign } from "tslib";
/* tslint:disable no-console */
import axios from 'axios';
var dev = process.env.NODE_ENV !== 'production';
/**
 * Creates and configures axios instance
 */
/* Create axios instance */
var api = axios.create({
    /** Requests are sent using a reverse proxy, check /server.js */
    baseURL: '/',
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'X-Platform': 'web'
    }
});
/** In dev, intercepts request and logs it into console for dev */
api.interceptors.request.use(function (config) {
    if (dev)
        console.info('✉️ ', config);
    config.headers['X-Warehouse'] = localStorage.getItem('whCode');
    config.headers['X-Station'] = localStorage.getItem('whStation');
    return config;
}, function (error) {
    if (dev)
        console.error('✉️ ', error);
    return Promise.reject(error);
});
/**
 * Passes response.data to services.
 * In dev, intercepts response and logs it into console for dev
 */
api.interceptors.response.use(function (response) {
    if (dev)
        console.info('📩 ', response);
    if (response.headers['x-sudoer']) {
        return __assign(__assign({}, response.data), { xSudoer: response.headers['x-sudoer'] });
    }
    return response.data;
}, function (error) {
    if (error.response && error.response.status === 403) {
        if (dev)
            console.error('UNAUTHORISED');
        // Reload page so user can re-auth.
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
        throw new axios.Cancel('Unauthorized');
    }
    else if (error.response && error.response.status === 500) {
        // eslint-disable-next-line no-console
        if (dev)
            console.error('500! Check API');
        throw new axios.Cancel('Server Error');
    }
    /**
     * API sends an error message in the format
     * { error: error_message }
     */
    if (error.response && error.response.data) {
        if (dev)
            console.error('Error: ', error.response.data.error);
        return Promise.reject(error.response.data);
    }
    if (dev)
        console.error('📩 ', error);
    return Promise.reject(error.message);
});
export default api;
//# sourceMappingURL=api.js.map