'use client'

import { useEffect, useState } from 'react'
import { Button, Form, Input, Select, DatePicker, Space, message } from 'antd'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

export default function CadastroVideoPage() {
  const [form] = Form.useForm()
  const [socials, setSocials] = useState([])
  const [posts, setPosts] = useState([{ social_id: '', link: '', post_date: dayjs() }])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/socials')
      .then(res => res.json())
      .then(data => setSocials(data))
  }, [])

  const handleAddPost = () => {
    setPosts([...posts, { social_id: '', link: '', post_date: dayjs() }])
  }

  const handleChangePost = (
    index: number,
    field: 'social_id' | 'link' | 'post_date',
    value: any
  ) => {
    const updated = [...posts]
    updated[index][field] = value
    setPosts(updated)
  }
  

  const onFinish = async (values: any) => {
    try {
      await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          posts: posts.map(p => ({
            social_id: p.social_id,
            link: p.link,
            post_date: p.post_date.toISOString(),
          })),
        }),
      })

      message.success('Vídeo cadastrado com sucesso!')
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      message.error('Erro ao cadastrar vídeo.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Novo Vídeo</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Título" name="title" rules={[{ required: true, message: 'Informe o título' }]}> 
          <Input />
        </Form.Item>
        <Form.Item label="Descrição" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {posts.map((post, index) => (
          <Space direction="vertical" className="w-full" key={index}>
            <Select
              placeholder="Selecione a rede social"
              value={post.social_id}
              onChange={(value) => handleChangePost(index, 'social_id', value)}
              options={socials.map((s: any) => ({ label: s.name, value: s.id }))}
            />
            <Input
              placeholder="Link da postagem"
              value={post.link}
              onChange={(e) => handleChangePost(index, 'link', e.target.value)}
            />
            <DatePicker
              className="w-full"
              value={post.post_date}
              onChange={(date) => handleChangePost(index, 'post_date', date)}
            />
          </Space>
        ))}

        <Button type="dashed" onClick={handleAddPost} className="w-full my-4">
          Adicionar nova postagem
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Salvar Vídeo
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
