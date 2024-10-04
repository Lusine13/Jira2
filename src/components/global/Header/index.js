import './index.css';
import { Button, Flex } from 'antd';

const Header = () => {
    return (
        <div className="main_header">
            <Flex justify="space-between" align="center">
                <p>Logo</p>
        <div>
        <Button>
            Sign in
        </Button>
        </div>
        </Flex>
        </div>
    )
};

export default Header;