import type { APIRoute } from 'astro';

export const prerender = false; // Force complete Server-Side Rendering (SSR)

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    // 1. Extract environment variables directly from active shell process memory
    const secureAdminUser = import.meta.env.ADMIN_USERNAME || "admin@vaqih.dev";
    const secureAdminPass = import.meta.env.ADMIN_PASSWORD || "password123";

    // 2. Sanitize and trim inputs
    const inputUser = username ? username.trim() : "";
    const inputPass = password ? password.trim() : "";

    // 3. Perform explicit secure string verification match
    if (inputUser === secureAdminUser && inputPass === secureAdminPass) {
      
      // Inject the authorization session token into an HttpOnly cookie container
      cookies.set('admin_session', 'authorized_cloud_plane_token', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // Valid for 24 Hours continuous uptime session
      });

      return new Response(JSON.stringify({ 
        success: true, 
        message: "AUTHENTICATION_SUCCESSFUL" 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Explicit rejection response payload for mismatched security keys
    return new Response(JSON.stringify({ 
      success: false, 
      message: "INVALID_CREDENTIALS" 
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Critical identity pipeline verification crash:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: "INTERNAL_SERVER_ERROR" 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
