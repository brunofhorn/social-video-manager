"use client"
import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import { Button, Input, Table, Tag } from "antd";
import { useState } from "react";

type Video = {
    id: string;
    description: string;
    platforms: {
        name: string;
        url: string;
        publishDate: string;
        promoted: number;
        viral: boolean;
    }[];
};

// Dados mockados para exemplo
const mockVideos: Video[] = [
    {
        id: "1",
        description: "Como fazer um bolo de chocolate",
        platforms: [
            {
                name: "YouTube",
                url: "https://youtube.com/video1",
                publishDate: "2024-03-15",
                promoted: 2,
                viral: true,
            },
            {
                name: "TikTok",
                url: "https://tiktok.com/video1",
                publishDate: "2024-03-16",
                promoted: 1,
                viral: false,
            },
        ],
    },
    {
        id: "2",
        description: "Dicas de produtividade",
        platforms: [
            {
                name: "Instagram",
                url: "https://instagram.com/video2",
                publishDate: "2024-03-14",
                promoted: 0,
                viral: false,
            },
        ],
    },
];

export default function VideoList() {
    const [search, setSearch] = useState("");
    const [videos] = useState<Video[]>(mockVideos);

    const handleEdit = (videoId: string) => {
        console.log("Editar vídeo:", videoId);
    };

    const handleDelete = (videoId: string) => {
        console.log("Excluir vídeo:", videoId);
    };

    const filteredVideos = videos.filter((video) =>
        video.description.toLowerCase().includes(search.toLowerCase())
    );

    const dataSource = filteredVideos.flatMap((video) =>
        video.platforms.map((platform, platformIndex) => ({
            key: `${video.id}-${platformIndex}`,
            videoId: video.id,
            description: video.description,
            platforms: video.platforms, // para referência do rowSpan
            platform,
            platformIndex,
        }))
    );

    const columns = [
        {
            title: 'Descrição',
            dataIndex: 'description',
            render: (_: any, record: any, index: number) => {
                const { platforms, platformIndex } = record;
                if (platformIndex === 0) {
                    return {
                        children: record.description,
                        props: { rowSpan: platforms.length },
                    };
                }
                return { props: { rowSpan: 0 } };
            },
        },
        {
            title: 'Plataforma',
            dataIndex: 'platform',
            render: (text: any) => text.name,
        },
        {
            title: 'Link',
            dataIndex: 'platform',
            render: (platform: any) => (
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    Ver vídeo
                </a>
            ),
        },
        {
            title: 'Data de Publicação',
            dataIndex: 'platform',
            render: (platform: any) =>
                new Date(platform.publishDate).toLocaleDateString('pt-BR'),
        },
        {
            title: 'Promoções',
            dataIndex: 'platform',
            render: (platform: any) => platform.promoted || '—',
        },
        {
            title: 'Viral',
            dataIndex: 'platform',
            render: (platform: any) =>
                platform.viral ? (
                    <Tag color="green">Sim</Tag>
                ) : (
                    <Tag color="gray">Não</Tag>
                ),
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            render: (_: any, record: any) => {
                const { platforms, platformIndex } = record;
                if (platformIndex === 0) {
                    return {
                        children: (
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Button
                                    type="text"
                                    icon={<Pencil />}
                                    onClick={() => handleEdit(record.videoId)}
                                />
                                <Button
                                    type="text"
                                    icon={<Trash />}
                                    onClick={() => handleDelete(record.videoId)}
                                />
                            </div>
                        ),
                        props: { rowSpan: platforms.length },
                    };
                }
                return { props: { rowSpan: 0 } };
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Vídeos</h1>
                <div className="relative w-72">
                    <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Buscar vídeos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className={"rounded-lg border bg-card text-card-foreground shadow-sm"}>
                <div className="overflow-x-auto">
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </div>
            </div>
        </div>
    );
}