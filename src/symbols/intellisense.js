/* eslint-disable unicorn/no-empty-file */

// aurelia
/** @typedef { import('aurelia-router').RouterConfiguration } RouterConfiguration */
/** @typedef { import('aurelia-router').RouteConfig } RouteConfig */
/** @typedef { import('aurelia-framework').Aurelia } Aurelia */
/** @typedef { import('aurelia-framework').TemplatingEngine } TemplatingEngine */
/** @typedef { import('aurelia-framework').Controller } Controller */
/** @typedef { import('aurelia-framework').CompositionContext } CompositionContext */
/** @typedef { import('aurelia-framework').ViewStrategy } ViewStrategy */
/** @typedef { import('aurelia-fetch-client').HttpClient } HttpClient */
/** @typedef { import('aurelia-fetch-client').HttpClientConfiguration } HttpClientConfiguration */
/** @typedef { import('aurelia-fetch-client').Interceptor } Interceptor */

// aurelia-kis-oidc
/** @typedef { import('aurelia-kis-oidc').PluginConfiguration } PluginConfiguration */

// custom
/** @typedef { { errorMessage: string} } ValidationError */
/** @typedef { { status: number, title: string, detail: string | any, errors?: ValidationError[] } } ProblemDetail */
/** @typedef { { viewModel: any, view?: string | ViewStrategy, model?: any, locked?: boolean } } DialogServiceParameter */
/** @typedef { () => HttpClient } HttpClientFactory */
