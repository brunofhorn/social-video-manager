'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Table, Typography, message } from 'antd'

export default function ConfiguracoesPage() {
  const [form] = Form.useForm()
  const [socials, setSocials] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSocials = async () => {
    const res = await fetch('/api/socials')
    const data = await res.json()
    setSocials(data)
  }

  useEffect(() => {
    fetchSocials()
  }, [])

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const res = await fetch('/api/socials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error()

      message.success('Rede social cadastrada com sucesso')
      form.resetFields()
      fetchSocials()
    } catch (err) {
      message.error('Erro ao cadastrar rede social')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <Typography.Title level={3}>Redes Sociais</Typography.Title>

      <Form layout="vertical" form={form} onFinish={onFinish} className="mb-8">
        <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Informe o nome da rede social' }]}> 
          <Input placeholder="Instagram, YouTube, TikTok..." />
        </Form.Item>
        <Form.Item name="url" label="URL">
          <Input placeholder="https://instagram.com/usuario" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cadastrar Rede Social
          </Button>
        </Form.Item>
      </Form>

      <Table
        dataSource={socials}
        rowKey="id"
        columns={[
          { title: 'Nome', dataIndex: 'name' },
          { title: 'URL', dataIndex: 'url' },
        ]}
      />
    </div>
  )
}