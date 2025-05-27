'use client';

import { useState } from 'react';
import { Button, Form, Input, Typography, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { EnvelopeSimple, Lock, User } from '@phosphor-icons/react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    async function handleRegister(values: any) {
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                api.open({
                    type: "error",
                    message: "Ocorreu um erro ao cadastrar-se.",
                    placement: "bottom"
                });
            } else {
                api.open({
                    type: "success",
                    message: "Cadastro realizado com sucesso. Efetue o login.",
                    placement: "bottom"
                });
            }
        } catch (err) {
            api.open({
                type: "error",
                message: "Ocorreu um erro ao cadastrar usuário.",
                placement: "bottom"
            });

            console.error('Erro ao cadastrar:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            {contextHolder}
            <div className="p-8 max-w-md w-full rounded shadow-md bg-gray-800">
                <Typography.Title level={3} className="text-center">Cadastro</Typography.Title>
                <Form layout="vertical" onFinish={handleRegister}>
                    <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Informe seu nome' }]}>
                        <Input prefix={<User size={20} />} placeholder="Digite seu nome" className='h-11' />
                    </Form.Item>
                    <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Informe o e-mail' }]}>
                        <Input prefix={<EnvelopeSimple size={20} />} placeholder="Digite seu e-mail" className='h-11' />
                    </Form.Item>
                    <Form.Item name="password" label="Senha" rules={[{ required: true, message: 'Informe a senha' }]}>
                        <Input.Password prefix={<Lock size={20} />} placeholder="Digite sua senha" className='h-11' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={loading} block type='primary' style={{ height: 50, textTransform: 'uppercase' }}>
                            Cadastrar
                        </Button>
                    </Form.Item>
                    <Typography.Link className='flex w-full text-center' href='/'>Voltar ao Login</Typography.Link>
                </Form>
            </div>
        </div>
    );
}
