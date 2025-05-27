'use client';

import { useState } from 'react';
import { Button, Form, Input, Typography, message, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { Lock, EnvelopeSimple } from '@phosphor-icons/react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  async function handleSubmit(values: any) {
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        api.open({
          type: "error",
          message: "Ocorreu um erro ao tentar efetuar o login.",
        });

        return;
      } else {
        const data = await res.json();

        localStorage.setItem("@social-video-manager-user-1.0.0", JSON.stringify(data));
        api.open({
          type: "success",
          message: "Login bem-sucedido! Redirecionando..."
        });

        router.push("/dashboard/videos");
      }
    } catch (err) {
      api.open({
        type: "error",
        message: "Ocorreu um erro ao tentar efetuar o login."
      });

      console.error('Erro inesperado durante login:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {contextHolder}
      <div className="p-8 max-w-md w-full bg-white rounded shadow-md">
        <Typography.Title level={3} className="text-center">Social Video Manager</Typography.Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Informe o e-mail' }]}>
            <Input prefix={<EnvelopeSimple size={20} />} placeholder="Digite seu e-mail" />
          </Form.Item>
          <Form.Item name="senha" label="Senha" rules={[{ required: true, message: 'Informe a senha' }]}>
            <Input.Password prefix={<Lock size={20} />} placeholder="Digite sua senha" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}