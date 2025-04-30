export function isAuthenticated(cookieHeader: string | undefined) {
    return cookieHeader?.includes('auth=true');
}