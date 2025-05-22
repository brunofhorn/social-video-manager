'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Typography, message, Modal, Select, Space, notification } from 'antd';
import FormSocials from '@/components/socials/Form';
import { socialIcons } from '@/data/social-icons';
import { ListSocials } from '@/components/socials/List';
import * as PhosphorIcons from '@phosphor-icons/react';

export default function ConfiguracoesPage() {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [socials, setSocials] = useState([]);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingSocials, setLoadingSocials] = useState(true);
  const [editing, setEditing] = useState<any>(null);
  const [app, context] = notification.useNotification();

  const fetchSocials = async () => {
    try {
      const res = await fetch('/api/socials');
      const data = await res.json();
      setSocials(data);
    } catch (error) {
      console.error("❌ [api/socials] Erro ao buscar redes sociais.");
    } finally {
      setLoadingSocials(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const onFinish = async (values: any) => {
    setLoadingRegister(true);

    try {
      const res = await fetch('/api/socials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        app.open({
          message: "Ocorreu um erro ao tentar listar as redes sociais.",
          type: 'error'
        });

        throw new Error();
      }

      app.open({
        message: "A rede social foi cadastrada com sucesso!",
        type: 'success'
      });

      form.resetFields();
      fetchSocials();
    } catch (err) {
      console.error(err);
      app.open({
        message: "Erro ao cadastrar rede social.",
        type: 'error'
      });
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/socials?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        app.open({
          message: "Ocorreu um erro ao tentar deletar a rede social.",
          type: 'error'
        });

        throw new Error(data.error);
      }

      app.open({
        message: "A rede social foi removida com sucesso!",
        type: 'success'
      });

      fetchSocials();
    } catch (err: any) {
      console.error(err);
      app.open({
        message: "Erro ao remover rede social.",
        type: 'error'
      });
    }
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    editForm.setFieldsValue({ url: record.url, icon: record.icon });
  };

  const handleUpdate = async () => {
    try {
      const values = await editForm.validateFields();
      const res = await fetch('/api/socials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, ...values }),
      });

      const data = await res.json();

      if (!res.ok) {
        app.open({
          message: "Ocorreu um erro ao tentar atualizar a rede social.",
          type: 'error'
        });

        throw new Error(data.error);
      }

      app.open({
        message: "A rede social foi atualizada com sucesso!",
        type: 'success'
      });

      setEditing(null);
      fetchSocials();
    } catch (err: any) {
      console.error(err);
      app.open({
        message: "Erro ao atualizar rede social.",
        type: 'error'
      });
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      {context}
      <Typography.Title level={2} className="mb-6">Redes Sociais</Typography.Title>
      <FormSocials form={form} onFinish={onFinish} loadingRegister={loadingRegister} />
      <ListSocials loadingSocials={loadingSocials} socials={socials} handleEdit={handleEdit} handleDelete={handleDelete} />
      <Modal
        open={!!editing}
        title={`Editar ${editing?.name}`}
        onCancel={() => setEditing(null)}
        onOk={handleUpdate}
        okText="Salvar"
        cancelText="Cancelar"
      >
        <Form layout="vertical" form={editForm}>
          <Form.Item name="url" label="URL">
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="Ícone">
            <Select placeholder="Selecione um ícone">
              {socialIcons.map(opt => {
                const IconComponent = PhosphorIcons[opt.value as keyof typeof PhosphorIcons] as React.ElementType;

                return (
                  <Select.Option key={opt.value} value={opt.value}>
                    <Space>{IconComponent ? <IconComponent size={20} /> : null} {opt.label}</Space>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
