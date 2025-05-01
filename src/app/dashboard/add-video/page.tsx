'use client';

import { useEffect, useState } from 'react';
import { Button, Form, Input, Select, DatePicker, Typography, message, Card, Row, Col, Popconfirm, notification } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

type PostFormItem = {
  social_id: string;
  link: string;
  post_date: Dayjs;
};

export default function CadastroVideoPage() {
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [form] = Form.useForm();
  const [socials, setSocials] = useState([]);
  const [posts, setPosts] = useState<PostFormItem[]>([
    { social_id: '', link: '', post_date: dayjs() },
  ]);
  const [api, context] = notification.useNotification();

  useEffect(() => {
    fetch('/api/socials')
      .then(res => res.json())
      .then(data => setSocials(data));
  }, []);

  const handleAddPost = () => {
    setPosts([...posts, { social_id: '', link: '', post_date: dayjs() }]);
  };

  const handleRemovePost = (index: number) => {
    const updated = posts.filter((_, i) => i !== index);
    setPosts(updated);
  };

  const handleChangePost = <K extends keyof PostFormItem>(
    index: number,
    field: K,
    value: PostFormItem[K]
  ) => {
    const updated = [...posts];
    updated[index] = { ...updated[index], [field]: value };
    setPosts(updated);
  };

  const onFinish = async (values: any) => {
    setLoadingRegister(true);

    try {
      const res = await fetch('/api/videos', {
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
      });

      if (!res.ok) {
        throw new Error("Ocorreu um erro ao tentar cadastrar o vídeo.");
      }

      form.resetFields();
      api.open({
        message: "Vídeo cadastrado com sucesso!",
        type: "success"
      });
    } catch (err) {
      console.error(err);
      api.open({
        message: "Erro ao cadastrar o vídeo.",
        type: "error"
      });
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      {context}
      <Typography.Title level={2} className="mb-6">Cadastrar Vídeo</Typography.Title>

      <Card>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Título" name="title" rules={[{ required: true, message: 'Informe o título' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Descrição" name="description">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Typography.Title level={4}>Postagens</Typography.Title>

          {posts.map((post, index) => (
            <Card
              key={index}
              className="!mb-4"
              type="inner"
              title={`Postagem #${index + 1}`}
              extra={posts.length > 1 && (
                <Popconfirm
                  title="Remover esta postagem?"
                  onConfirm={() => handleRemovePost(index)}
                  okText="Sim"
                  cancelText="Cancelar"
                >
                  <Button type="link" danger size="small">Remover</Button>
                </Popconfirm>
              )}
            >
              <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item label="Rede Social">
                    <Select
                      placeholder="Selecione a rede social"
                      value={post.social_id}
                      onChange={(value) => handleChangePost(index, 'social_id', value)}
                      options={socials.map((s: any) => ({ label: s.name, value: s.id }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Link da Postagem">
                    <Input
                      placeholder="URL da postagem"
                      value={post.link}
                      onChange={(e) => handleChangePost(index, 'link', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item label="Data da Postagem">
                    <DatePicker
                      className="w-full"
                      format="DD/MM/YYYY"
                      value={post.post_date}
                      onChange={(date) => handleChangePost(index, 'post_date', date!)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={handleAddPost} block className="my-4">
              Adicionar nova postagem
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingRegister}
              className='w-full'
            >
              {loadingRegister ? 'Cadastrando...' : 'Cadastrar Vídeo'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}