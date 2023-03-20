import { Button } from "@chatscope/chat-ui-kit-react";
import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

class ErrorPage extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: any, info: any) {
        this.setState({ hasError: true });
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="500"
                    title="很抱歉，有一些异常，请尝试刷新页面"
                    extra={
                        <Link
                            to="/"
                            onClick={() => {
                                window.location.href = '/';
                            }}
                        >
                            <Button type="primary" key="console">
                                返回首页
                            </Button>
                        </Link>
                    }
                />
            );
        }
        return this.props.children;
    }
}

export default ErrorPage;
