"use client";
import { Button, Card, Checkbox, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import * as PhosphorIcons from '@phosphor-icons/react';
import dayjs from "dayjs";
import { ISocial } from "@/interfaces/social";
import { IVideo } from "@/interfaces/video";

export default function VideoList() {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [socials, setSocials] = useState<ISocial[]>([]);
    const [editing, setEditing] = useState<any>(null);
    const [form] = Form.useForm();
    const [filterSocial, setFilterSocial] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            console.log('Vídeo removido com sucesso');
            loadData();
        } catch {
            console.error('Erro ao remover vídeo');
        }
    };

    const handleEdit = (record: any) => {
        setEditing(record);
        form.setFieldsValue({
            title: record.title,
            description: record.description,
            reposted: record.reposted,
            boosted: record.boosted,
        });
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            const res = await fetch('/api/videos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...editing, ...values }),
            });
            if (!res.ok) throw new Error();
            console.log('Vídeo atualizado com sucesso');
            setEditing(null);
            loadData();
        } catch {
            console.error('Erro ao atualizar vídeo');
        }
    };

    const loadData = async () => {
        try {
            const [videosRes, socialsRes] = await Promise.all([
                fetch('/api/videos'),
                fetch('/api/socials')
            ]);

            const [videosData, socialsData] = await Promise.all([
                videosRes.json(),
                socialsRes.json()
            ]);

            setVideos(videosData);
            setSocials(socialsData);
        } catch (err) {
            console.error('Erro ao carregar dados');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredVideos = filterSocial
        ? videos.filter((video: any) => video.posts.some((p: any) => p.social_id === filterSocial))
        : videos;

    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
            <Typography.Title level={2}>Vídeos Postados</Typography.Title>

            <Card className="mb-6">
                <Space direction="vertical" className="w-full">
                    <Select
                        allowClear
                        className="w-full max-w-xs"
                        placeholder="Filtrar por rede social"
                        value={filterSocial || undefined}
                        onChange={value => setFilterSocial(value || null)}
                        options={socials.map((s: any) => ({ label: s.name, value: s.id }))}
                    />
                </Space>
            </Card>

            <Card>
                <Table
                    rowKey="id"
                    dataSource={filteredVideos}
                    columns={[
                        {
                            title: 'Título',
                            dataIndex: 'title',
                            render: (_: any, record: any) => (
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold">{record.title}</span>
                                    <span>{record.description}</span>
                                </div>
                            )
                        },
                        {
                            title: 'Postagens',
                            render: (_: any, record: any) => (
                                <Space>
                                    {record.posts.map((p: any) => {
                                        const social: ISocial | undefined = socials.find((s: any) => s.id === p.social_id);
                                        const IconComponent = PhosphorIcons[social?.icon as keyof typeof PhosphorIcons] as React.ElementType;

                                        return (
                                            <Tooltip
                                                key={p.social_id}
                                                title={`${p.social.name} - Postado em ${dayjs(p.post_date).format('DD/MM/YYYY')}`}
                                            >
                                                <a href={p.link} target="_blank" rel="noreferrer">
                                                    {IconComponent && <IconComponent size={20} />}
                                                </a>
                                            </Tooltip>
                                        );
                                    })}
                                </Space>
                            )
                        },
                        {
                            title: 'Repostado',
                            dataIndex: 'reposted',
                            render: (val: boolean) => (val ? <Tag color="green">SIM</Tag> : <Tag color="red">NÃO</Tag>),
                        },
                        {
                            title: 'Turbinado',
                            dataIndex: 'boosted',
                            render: (val: boolean) => (val ? <Tag color="green">SIM</Tag> : <Tag color="red">NÃO</Tag>),
                        },
                        {
                            title: 'Viral',
                            render: () => '🔥'
                        },
                        {
                            title: 'Ações',
                            render: (_: any, record: any) => (
                                <Space>
                                    <Button size="small" onClick={() => handleEdit(record)}>
                                        <PhosphorIcons.Pencil size={20} />
                                    </Button>
                                    <Popconfirm
                                        title="Tem certeza que deseja remover este vídeo?"
                                        okText="Sim"
                                        cancelText="Cancelar"
                                        onConfirm={() => handleDelete(record.id)}
                                    >
                                        <Button size="small" danger>
                                            <PhosphorIcons.Trash />
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            )
                        }
                    ]}
                />
            </Card>

            <Modal
                open={!!editing}
                title="Editar vídeo"
                okText="Salvar"
                cancelText="Cancelar"
                onCancel={() => setEditing(null)}
                onOk={handleUpdate}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Título" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Descrição">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="was_reposted" valuePropName="checked">
                        <Checkbox>Já foi repostado</Checkbox>
                    </Form.Item>
                    <Form.Item name="was_boosted" valuePropName="checked">
                        <Checkbox>Já foi turbinado</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}