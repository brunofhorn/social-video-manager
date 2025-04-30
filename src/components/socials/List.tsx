import { ISocial } from "@/interfaces/social";
import { Button, Card, Popconfirm, Space, Table } from "antd";
import * as PhosphorIcons from '@phosphor-icons/react';
import Link from "next/link";

interface ListSocialsProps {
    loadingSocials: boolean;
    socials: ISocial[];
    handleEdit: (social: ISocial) => void;
    handleDelete: (id: string) => void;
}

export function ListSocials({ loadingSocials, socials, handleEdit, handleDelete }: ListSocialsProps) {
    return (
        <Card>
            <Table
                rowKey="id"
                dataSource={socials}
                loading={loadingSocials}
                columns={[
                    {
                        title: 'Ícone',
                        dataIndex: 'icon',
                        render: (icon: string) => {
                            const IconComponent = PhosphorIcons[icon as keyof typeof PhosphorIcons] as React.ElementType;

                            return IconComponent ? <IconComponent size={20} /> : icon;
                        },
                        width: 30
                    },
                    { title: 'Nome', dataIndex: 'name' },
                    {
                        title: 'URL',
                        dataIndex: 'url',
                        render: (_: any, record: any) => (
                            <Link href={record.url} className="flex flex-row gap-1 items-center">
                                <PhosphorIcons.Link />
                                {record.url}
                            </Link>
                        )
                    },
                    {
                        title: 'Ações',
                        render: (_: any, record: any) => (
                            <Space>
                                <Button size="small" onClick={() => handleEdit(record)}>
                                    <PhosphorIcons.Pencil size={20} />
                                </Button>
                                <Popconfirm 
                                    title="Tem certeza que deseja remover esta rede social?"
                                    okText="Sim"
                                    cancelText="Cancelar" 
                                    onConfirm={() => handleDelete(record.id)}>
                                    <Button size="small" danger>
                                        <PhosphorIcons.Trash size={20} />
                                    </Button>
                                </Popconfirm>
                            </Space>
                        )
                    },
                ]}
            />
        </Card>
    );
}