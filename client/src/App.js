import React, {useState} from 'react';
import Messages from "./Messages";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import {Button, Col, Container, FormInput, Row} from 'shards-react';
import {gql, useMutation} from "@apollo/client";
const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;
function App() {
    const [state, setState] = useState({
        user: 'Jack',
        content: ""
    });

    const [postMessage] = useMutation(POST_MESSAGE);
    const handlerOnChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const onSendMessage = () =>{
        if(state.content.length > 0){
            postMessage({
                variables: state,
            })
        }
        setState({
            ...state,
            content: ""
        });
    }

    return (
        <Container>
            <Messages user={state.user}/>
            <Row>
                <Col xs={2} style={{padding: 0}}>
                    <FormInput
                        label="User"
                        name="user"
                        value={state.user}
                        onChange={handlerOnChange}
                    />
                </Col>
                <Col xs={8} style={{padding: 0}}>
                    <FormInput
                        label="Content"
                        name="content"
                        value={state.content}
                        onChange={handlerOnChange}
                        onKeyUp={ e =>  {
                            if(e.keyCode === 13){
                                onSendMessage();
                            }
                        }}
                    />
                </Col>
                <Col xs={2} style={{ padding: 0 }}>
                    <Button onClick={() => onSendMessage()} style={{ width: "100%" }}>
                        Send
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default App;
