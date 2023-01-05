import { Injectable } from '@angular/core';
declare const Pusher: any;
declare const promisify: any;

@Injectable()
export class PusherService {
  constructor() {
    var pusher = new Pusher('adbc79a96fd70e8c634d', {
      cluster: "ap2",
      useTLS: true
    });
    this.channel = pusher.subscribe('vote-channel');
    console.log("CHANNEL ", this.channel);
    
  }
  channel

  public init() {
    return this.channel;
  }
}
