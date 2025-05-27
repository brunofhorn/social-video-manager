'use client';

import { useState } from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import { EnvelopeSimple, Lock, User } from '@phosphor-icons/react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleRegister(values: any) {
        setLoading(true);
        
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erro desconhecido');
            }

            message.success('Cadastro realizado com sucesso!');
            router.push('/login');
        } catch (err) {
            console.error('Erro ao cadastrar:', err);
            message.error('Erro ao cadastrar usuário.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-8 max-w-md w-full bg-white rounded shadow-md">
                <Typography.Title level={3} className="text-center">Cadastro</Typography.Title>
                <Form layout="vertical" onFinish={handleRegister}>
                    <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Informe seu nome' }]}>
                        <Input prefix={<User size={20} />} placeholder="Digite seu nome" />
                    </Form.Item>
                    <Form.Item name="email" label="E-mail" rules={[{ required: true, message: 'Informe o e-mail' }]}>
                        <Input prefix={<EnvelopeSimple size={20} />} placeholder="Digite seu e-mail" />
                    </Form.Item>
                    <Form.Item name="password" label="Senha" rules={[{ required: true, message: 'Informe a senha' }]}>
                        <Input.Password prefix={<Lock size={20} />} placeholder="Digite sua senha" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
