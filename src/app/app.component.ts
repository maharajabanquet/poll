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
      name: 'Adam Francis',
      goals: 30,
      assists: 12,
      shortName: 'Adam Francis',
      image:
        '../assets/team/Adam Francis.jpg',
    },
    {
      name: 'Alaina Adonis',
      goals: 8,
      assists: 13,
      shortName: 'Alaina Adonis',
      image:
        '../assets/team/Alaina Adonis.jpg',
    },
    {
      name: 'Andy North',
      goals: 26,
      assists: 5,
      shortName: 'Andy North',
      image:
        '../assets/team/Andy North.jpg',
    },
    {
      name: "Armin Masoudie",
      goals: 10,
      assists: 17,
      shortName: 'Armin Masoudi',
      image:
        '../assets/team/Armin Masoudi.jpg',
    },
    {
      name: "Bayanda Mthembu",
      goals: 10,
      assists: 17,
      shortName: 'Bayanda Mthembu',
      image:
        '../assets/team/Bayanda Mthembu.jpg',
    },
    {
      name: "EDUARDO DEL CAMPO MATIAS",
      goals: 10,
      assists: 17,
      shortName: 'EDUARDO DEL CAMPO MATIAS',
      image:
        '../assets/team/EDUARDO DEL CAMPO MATIAS.jpg',
    },
    {
      name: "Hassanain Moosa",
      goals: 10,
      assists: 17,
      shortName: 'Hassanain Moosa',
      image:
        '../assets/team/Hassanain Moosa.jpg',
    },
    {
      name: "Maria Garcia Navarro",
      goals: 10,
      assists: 17,
      shortName: 'Maria Garcia Navarro',
      image:
        '../assets/team/Maria Garcia Navarro.jpg',
    },
    {
      name: "Marouane El Moubarik Alaoui",
      goals: 10,
      assists: 17,
      shortName: 'Marouane El Moubarik Alaoui',
      image:
        '../assets/team/Marouane El Moubarik Alaoui.jpg',
    },
    {
      name: "Neelima Divakaran",
      goals: 10,
      assists: 17,
      shortName: 'Neelima Divakaran',
      image:
        '../assets/team/Neelima Divakaran.jpg',
    },
    {
      name: "Ragheb Salah",
      goals: 10,
      assists: 17,
      shortName: 'Ragheb Salah',
      image:
        '../assets/team/Ragheb Salah.jpg',
    },
    {
      name: "Reuben Gower",
      goals: 10,
      assists: 17,
      shortName: 'Reuben Gower',
      image:
        '../assets/team/Reuben Gower.png',
    },
    {
      name: "Sanchay Kumar",
      goals: 10,
      assists: 17,
      shortName: 'Sanchay Kumar',
      image:
        '../assets/team/Sanchay Kumar.jpg',
    },
    {
      name: "Sooraj Manohar",
      goals: 10,
      assists: 17,
      shortName: 'Sooraj Manohar',
      image:
        '../assets/team/Sooraj Manohar.jpg',
    },
    {
      name: "Tong Zhao",
      goals: 10,
      assists: 17,
      shortName: 'Tong Zhao',
      image:
        '../assets/team/Tong Zhao.jpg',
    },
    {
      name: "Vibha Jain",
      goals: 10,
      assists: 17,
      shortName: 'Vibha Jain',
      image:
        '../assets/team/Vibha Jain.jpg',
    },
    {
      name: "Daffa Ardana",
      goals: 10,
      assists: 17,
      shortName: 'Daffa Ardana',
      image:
        '../assets/team/unknown.png',
    },
    {
      name: "Bayanda Mthembu",
      goals: 10,
      assists: 17,
      shortName: 'Bayanda Mthembu',
      image:
        '../assets/team/unknown.png',
    },
    {
      name: "Rahil Desai",
      goals: 10,
      assists: 17,
      shortName: 'Rahil Desai',
      image:
        '../assets/team/unknown.png',
    },
    {
      name: "Selin Aydogan",
      goals: 10,
      assists: 17,
      shortName: 'Selin Aydogan',
      image:
        '../assets/team/unknown.png',
    },
    {
      name: "Yasmin Khatun",
      goals: 10,
      assists: 17,
      shortName: 'Yasmin Khatun',
      image:
        '../assets/team/unknown.png',
    },
  ];
  voteCount = {
    'Adam Francis': 0,
    'Alaina Adonis': 0,
    'Andy North': 0,
    'Armin Masoudie': 0,
    'Bayanda Mthembu': 0,
    'EDUARDO DEL CAMPO MATIAS': 0,
    'Hassanain Moosa': 0,
    'Maria Garcia Navarro': 0,
    'Marouane El Moubarik Alaoui': 0,
    'Neelima Divakaran': 0,
    'Ragheb Salah': 0,
    'Reuben Gower': 0,
    'Sanchay Kumar': 0,
    'Sooraj Manohar': 0,
    'Tong Zhao': 0,
    'Vibha Jain': 0,
    'Vishal Shah': 0
  };
  votedArray: any = [];
  chartLabels: string[] = Object.keys(this.voteCount);
  chartData: number[] = Object.values(this.voteCount);
  chartType = 'doughnut';

  castVote(player) {
    if(localStorage.getItem('voted')) {
      alert("You have already voted !!!");
      return;
    }
    this.http
      .post('http://13.233.106.34:4000/vote', { player })
      .subscribe((res: any) => {
        this.vote = res.player;
        this.voted = true;
        localStorage.setItem('voted', 'true');
      });
  }

  getVoteClasses(player) {
    return {
      elect: this.voted && this.vote === player,
      lost: this.voted && this.vote !== player,
    };
  }

  ngOnInit() {
   
    console.log("HERE", this.voteCount)
    const channel = this.pusher.init();
    channel.bind('vote', ({ player }) => {
      this.voteCount[player] += 1;
      localStorage.setItem('vote', JSON.stringify(this.voteCount))
    //  console.log(this.voteCount);
    this.showResult();
    
      // this.chartData = Object.values(this.voteCount);
    });

    const stopchannel = this.pusher.stop();
    stopchannel.bind('stop', ({ player }) => {
    this.votedArray = [];
    window.location.reload();
    localStorage.clear();
    });
  }

  showResult() {
    let sortable = [];
    this.votedArray = [];
    for (var votedPerson in this.voteCount) {
        sortable.push({person: votedPerson, vote: this.voteCount[votedPerson], percent: `${this.voteCount[votedPerson]}%`});
    }
      sortable.sort(function(a, b) {
          return b['vote'] - a['vote'];
      });
      this.votedArray = sortable;
      console.log(this.votedArray);
      
      // console.log(this.votedArray);
      

  }

  clear() {

    this.http
      .post('http://13.233.106.34:4000/stop', '')
      .subscribe((res: any) => {
     
      });
   
    
    // window.location.reload();
  }

  getColor(i) {
    switch (i) {
      case 0:
        return '#D4AF37';
      case 1:
        return '#C0C0C0';
      case 2:
        return '#CD7F32';
    }
  }
}
