import React from 'react';
import ReactDOM from 'react-dom';
import { WebSocketLink }   from "apollo-link-ws";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
const link = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true,
    },
});
const client = new ApolloClient({
    link,
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
