import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PusherService } from './pusher.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private pusher: PusherService, private http: HttpClient) {}

  event = 'vote';
  vote = '';
  voted = false;
  playerData = [
    {
      name: 'Mo. Salah',
      goals: 30,
      assists: 12,
      shortName: 'salah',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p118748.png',
    },
    {
      name: 'Christian Eriksen',
      goals: 8,
      assists: 13,
      shortName: 'eriksen',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p80607.png',
    },
    {
      name: 'Harry Kane',
      goals: 26,
      assists: 5,
      shortName: 'kane',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p78830.png',
    },
    {
      name: "Kevin De'bruyne",
      goals: 10,
      assists: 17,
      shortName: 'kevin',
      image:
        'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/40x40/p61366.png',
    },
  ];
  voteCount = {
    salah: 0,
    kane: 0,
    eriksen: 0,
    kevin: 0,
  };

  chartLabels: string[] = Object.keys(this.voteCount);
  chartData: number[] = Object.values(this.voteCount);
  chartType = 'doughnut';

  castVote(player) {
    this.http
      .post('http://localhost:4000/vote', { player })
      .subscribe((res: any) => {
        this.vote = res.player;
        this.voted = true;
      });
  }

  getVoteClasses(player) {
    return {
      elect: this.voted && this.vote === player,
      lost: this.voted && this.vote !== player,
    };
  }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('vote', ({ player }) => {
      this.voteCount[player] += 1;
      this.chartData = Object.values(this.voteCount);
    });
  }
}
