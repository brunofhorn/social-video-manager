import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Layout from '@/components/Layout';
import { App as AntdApp } from 'antd';

export default async function DashboardLayout({ children }: { children: React.ReactNode; }) {
    const cookieStore = await cookies();
    const auth = cookieStore.get('auth');

    if (!auth || auth.value !== 'true') {
        redirect('/login');
    }
        
    return <AntdApp><Layout>{children}</Layout></AntdApp>;
}