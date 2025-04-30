'use client';

import { Menu, Button } from 'antd';
import { useState } from 'react';
import {
  Video,
  CalendarBlank,
  ChartBar,
  GearSix,
  X,
  List,
  MonitorArrowUp,
  FediverseLogo,
} from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode; }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      key: '/dashboard/videos',
      icon: <Video size={20} />,
      label: 'Vídeos Postados',
    },
    {
      key: '/dashboard/add-video',
      icon: <MonitorArrowUp size={20} />,
      label: 'Cadastrar Vídeo',
    },
    {
      key: '/dashboard/socials',
      icon: <FediverseLogo size={20} />,
      label: 'Redes Sociais',
    },
    {
      key: '/dashboard/calendario',
      icon: <CalendarBlank size={20} />,
      label: 'Calendário',
    },
    {
      key: '/dashboard/relatorios',
      icon: <ChartBar size={20} />,
      label: 'Relatórios',
    },
    {
      key: '/dashboard/configuracoes',
      icon: <GearSix size={20} />,
      label: 'Configurações',
    },
  ];

  const onClick = ({ key }: { key: string; }) => {
    router.push(key);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`bg-white shadow-lg ${collapsed ? 'px-0' : 'px-4'
          } pt-4 transition-all duration-300`}
      >
        <div className="flex flex-row justify-between items-center mb-3 px-2">
          <img
            src={collapsed ? '/logo-icon.png' : '/logo.png'}
            alt="Social Video Manager"
            className={`h-12 ${collapsed ? 'mx-auto' : ''}`}
          />
          <Button type="link" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <X size={20} color="#153E62" /> : <List size={20} color="#153E62" />}
          </Button>
        </div>
        <Menu
          mode="inline"
          items={menuItems}
          onClick={onClick}
          inlineCollapsed={collapsed}
          style={{ borderRight: 0 }}
        />
      </div>
      <div className="flex-1 p-8 bg-gray-50">{children}</div>
    </div>
  );
}
