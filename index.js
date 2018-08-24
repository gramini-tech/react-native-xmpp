//@flow
/* global __DEV__ */
'use strict';
import React from 'react-native';
const { NativeAppEventEmitter, NativeModules } = React;
const {RNXMPP} = NativeModules;

const map = {
    'message': 'RNXMPPMessage',
    'iq': 'RNXMPPIQ',
    'presence': 'RNXMPPPresence',
    'connect': 'RNXMPPConnect',
    'disconnect': 'RNXMPPDisconnect',
    'error': 'RNXMPPError',
    'loginError': 'RNXMPPLoginError',
    'login': 'RNXMPPLogin',
    'roster': 'RNXMPPRoster'
}

export type Events = $Keys<typeof map>;

const LOG = (...message: Array<{} | string | Array<any>>) => {
    if (__DEV__) {
        //eslint-disable-next-line
        console.log('rnxmpp: ', message);
    }
}

class XMPPWrapper {
    +xmppObj: any = RNXMPP;
    PLAIN: any = this.xmppObj.PLAIN;
    SCRAM: any = this.xmppObj.SCRAMSHA1;
    MD5: any = this.xmppObj.DigestMD5;
    isConnected: boolean = false;
    isLogged: boolean = false;
    defaultListeners: Array<any> = []; //fix types
    listeners: Array<any> = []; //fix types


    constructor(enableDefaultListeners: boolean = true) {
        this.isConnected = false;
        this.isLogged = false;
        if (enableDefaultListeners)
            this.bindDefaultListeners();
    }

    bindDefaultListeners(): void {
        this.defaultListeners = [
            NativeAppEventEmitter.addListener(map.connect, this.onConnected.bind(this)),
            NativeAppEventEmitter.addListener(map.disconnect, this.onDisconnected.bind(this)),
            NativeAppEventEmitter.addListener(map.error, XMPPWrapper.onError.bind(this)),
            NativeAppEventEmitter.addListener(map.loginError, this.onLoginError.bind(this)),
            NativeAppEventEmitter.addListener(map.login, this.onLogin.bind(this)),
        ];
    }

    onConnected(): void {
        LOG("Connected");
        this.isConnected = true;
    }

    onLogin(): void {
        LOG("Login");
        this.isLogged = true;
    }

    onDisconnected(error: {}): void {
        LOG("Disconnected, error: ", error);
        this.isConnected = false;
        this.isLogged = false;
    }

    static onError(text: string): void {
        LOG("Error: ", text);
    }

    onLoginError(text: string): void {
        this.isLogged = false;
        LOG("LoginError: ", text);
    }

    on(type: Events, callback: (any) => void): any {
        if (map[type]) {
            const listener: any = NativeAppEventEmitter.addListener(map[type], callback);
            this.listeners.push(listener);
            return listener;
        } 
        throw new Error("No registered type: " + type);
    }

    removeListener(type: Events): void {
        if (map[type]) {
            this.listeners = this.listeners.filter(listener => listener.eventType !== map[type]);
                    LOG(`Event listener of type "${type}" removed`);
            }
    }

    removeListeners(): void {
        this.listeners.map(listener => listener.remove());
        LOG('All event listeners removed');
    }

    trustHosts(hosts: Array<string>) {
        this.xmppObj.trustHosts(hosts);
    }

    connect(username: string, password: string, auth: any = RNXMPP.SCRAMSHA1, hostname: ?string = null, port: number = 5222): void {
        if (!hostname) {
            hostname = (username + '@/').split('@')[1].split('/')[0];
        }
        this.xmppObj.connect(username, password, auth, hostname, port);
    }

    message(text: string | {}, user: string, thread: ?string = null) {
        LOG(`Message:being sent to user: ${user}`, text);
        this.xmppObj.message(text, user, thread);
    }

    sendStanza(stanza: any): void {
        this.xmppObj.sendStanza(stanza);
    }

    fetchRoster(): void {
        this.xmppObj.fetchRoster();
    }

    presence(to: string, type: any): void {
        this.xmppObj.presence(to, type);
    }

    removeFromRoster(to: any): void {
        this.xmppObj.removeRoster(to);
    }

    disconnect(): void {
        if (this.isConnected) {
            this.xmppObj.disconnect();
        }
    }
    disconnectAfterSending(): void {
        if (this.isConnected) {
            this.xmppObj.disconnectAfterSending();
        }
    }

    joinRoom(roomJID: string, nickname: string): void {
        this.xmppObj.joinRoom(roomJID, nickname);
    }
    sendRoomMessage(message: any, roomJID: string): void {
        this.xmppObj.sendRoomMessage(message, roomJID);
    }
    leaveRoom(roomJID: string): void {
        this.xmppObj.leaveRoom(roomJID);
    }
}

const XMPP = new XMPPWrapper();
export default XMPP;
