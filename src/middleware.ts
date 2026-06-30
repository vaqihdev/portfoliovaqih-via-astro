import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ url, cookies, redirect }, next) => {
  // Intercept any request going to /admin
  if (url.pathname.startsWith('/admin')) {
    const hasSession = cookies.has('admin_session');
    
    // If no valid session, strictly redirect to home
    if (!hasSession) {
      return redirect('/', 302);
    }
  }

  // Continue to the requested route
  return next();
};
