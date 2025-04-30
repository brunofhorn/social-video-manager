'use client'

import { useState } from 'react'
import { Button, Form, Input, Typography, message } from 'antd'
import { useRouter } from 'next/navigation'
import { Lock, EnvelopeSimple } from '@phosphor-icons/react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      console.log('Tentando logar com:', values)
  
      if (values.email === 'bruno@email.com' && values.senha === '123456') {
        document.cookie = `auth=true; path=/; max-age=86400`
        message.success('Login bem-sucedido!')
        router.push('/dashboard/video-list')
      } else {
        message.error('Credenciais inválidas')
      }
    } catch (err) {
      console.error('Erro inesperado durante login:', err)
      message.error('Erro ao tentar fazer login.')
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 max-w-md w-full bg-white rounded shadow-md">
        <Typography.Title level={3} className="text-center">Login</Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
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
  )
}