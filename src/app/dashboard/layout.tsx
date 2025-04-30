import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Layout from '@/components/Layout';

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
    const cookieStore = await cookies();
    const auth = cookieStore.get('auth');

    if (!auth || auth.value !== 'true') {
        redirect('/login');
    }

    return <Layout>{children}</Layout>;
}