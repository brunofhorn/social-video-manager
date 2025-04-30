import { socialIcons } from "@/data/social-icons";
import { Button, Card, Col, Form, FormInstance, Input, Row, Select, Space } from "antd";
import * as PhosphorIcons from '@phosphor-icons/react';

interface FormSocialsProps {
    form: FormInstance<any>;
    onFinish: (values: any) => void;
    loadingRegister: boolean;
}

interface FieldType {
    name?: string;
    url?: string;
    icon?: string;
};

export default function FormSocials({ form, onFinish, loadingRegister }: FormSocialsProps) {

    return (
        <Card className="mb-8">
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row gutter={16}>
                    <Col xs={24} md={8}>
                        <Form.Item<FieldType>
                            label="Nome"
                            name="name"
                            rules={[{ required: true, message: 'Digite o nome da rede social' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item<FieldType>
                            label="URL"
                            name="url"
                            rules={[{ required: true, message: 'Digite a url da rede social' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="icon" label="Ícone" rules={[{ required: true }]}>
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
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loadingRegister}>Cadastrar Rede Social</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}