// src/app/chat/chat.component.ts
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket: any;
  messages: { user: string; message: string }[] = [];
  messageInput = '';

  ngOnInit() {
    this.socket = io('http://localhost:3000');

    // Load chat history from the server
    this.socket.on('chat history', (messages: { user: string; message: string }[]) => {
      this.messages = messages;
    });

    // Listen for new messages
    this.socket.on('new message', (data: { user: string; message: string }) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    const user = prompt('Enter your name:');
    if (user) {
      this.socket.emit('new message', { user, message: this.messageInput });
      this.messageInput = '';
    }
  }
}
