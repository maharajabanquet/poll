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
    
    
    this.stopchannel = pusher.subscribe('stop-channel');
    
  }
  channel
  stopchannel

  public init() {
    return this.channel;
  }

  public stop() {
    return this.stopchannel;
  }
}
